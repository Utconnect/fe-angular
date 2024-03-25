import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LetModule } from '@ngrx/component';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogContext,
  TuiErrorModule,
  TuiLabelModule,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ObservableHelper, StringifyHelper } from '@utconnect/helpers';
import { loggerProvider, LoggerService } from '@utconnect/services';
import { filter, tap } from 'rxjs';
import { EditDepartmentDialogStore } from './edit-department.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiLabelModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

const selector = 'esm-dialog-edit-department';

@Component({
  selector,
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  providers: [EditDepartmentDialogStore, loggerProvider({ tag: selector })],
})
export class EditDepartmentDialogComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly loggerService = inject(LoggerService);
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(EditDepartmentDialogStore);
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    boolean,
    DepartmentSummary | undefined
  >;

  // PUBLIC PROPERTIES
  form = this.fb.group({
    displayId: [this.context.data?.displayId ?? '', Validators.required],
    name: [this.context.data?.name ?? '', Validators.required],
    facultyId: [this.context.data?.faculty?.id ?? '', Validators.required],
  });
  readonly isEditDialog = this.context.data !== undefined;
  readonly faculties$ = this.store.faculties$;
  readonly status$ = this.store.status$;
  readonly errors$ = this.store.errors$;
  readonly facultyStringify = StringifyHelper.idName;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleCreateSuccess();
    this.handleCreateFailed();
  }

  // PUBLIC METHODS
  onFinish(): void {
    this.form.markAllAsTouched();
    const formValue = this.form.getRawValue();
    if (this.isEditDialog) {
      const data = this.loggerService.errorNullOrEmpty({
        value: this.context.data,
        valueType: 'Context data',
      });
      this.store.update({ id: data.id, request: formValue });
    } else {
      this.store.create(formValue);
    }
  }

  // PRIVATE METHODS
  private handleCreateSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => {
          const message = this.isEditDialog
            ? 'Cập nhật thông tin thành công!'
            : 'Thêm khoa thành công!';
          this.alertService
            .open(message, { status: TuiNotification.Success })
            .subscribe();
          this.context.completeWith(true);
        }),
      )
      .subscribe();
  }

  private handleCreateFailed(): void {
    this.errors$
      .pipe(
        ObservableHelper.filterNullish(),
        tap((errors) => {
          errors.forEach((e) => {
            if (!e.property) {
              return;
            }

            this.form.get(e.property)?.setErrors({ duplicated: e.message });
          });
        }),
      )
      .subscribe();
  }
}
