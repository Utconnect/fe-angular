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
import { ESMDomainEntitiesExaminationData, ModuleService } from '@esm/api';
import { LetModule } from '@ngrx/component';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiDialogContext,
  TuiLabelModule,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { StringifyHelper } from '@utconnect/helpers';
import { filter, take, tap } from 'rxjs';
import {
  EsmEditModuleDialogDepartment,
  EsmEditModuleDialogStore,
} from './edit-module.store';

const NGRX = [LetModule];
const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiInputModule,
  TuiLabelModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-dialog-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  providers: [
    EsmEditModuleDialogStore,
    ModuleService,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class EsmEditModuleDialogComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(EsmEditModuleDialogStore);
  private readonly alertService = inject(TuiAlertService);
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    boolean,
    ESMDomainEntitiesExaminationData | undefined
  >;

  // PUBLIC PROPERTIES
  form = this.fb.group({
    moduleId: [this.context.data?.moduleId ?? '', Validators.required],
    moduleName: [this.context.data?.moduleName ?? '', Validators.required],
    faculty: ['', Validators.required],
    department: [''],
  });

  readonly stringify = StringifyHelper.idName;
  readonly observables$ = this.store.observables$;

  // PRIVATE PROPERTIES
  private readonly status$ = this.store.status$;
  private readonly faculties$ = this.store.faculties$;
  private readonly departments$ = this.store.departments$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleGetFacultiesAndDepartmentsData();
    this.handleCreateSuccess();
  }

  // PUBLIC METHODS
  readonly departmentMatcher = (item: EsmEditModuleDialogDepartment): boolean =>
    item.facultyId === this.form.controls.faculty.value;

  onCreate(): void {
    const { moduleId, moduleName, faculty, department } =
      this.form.getRawValue();
    this.store.create({
      displayId: moduleId,
      name: moduleName,
      facultyId: faculty,
      departmentId: department ?? null,
    });
  }

  // PRIVATE METHODS
  private handleGetFacultiesAndDepartmentsData(): void {
    this.faculties$
      .pipe(
        tap((faculties) => {
          const currentFacultyId = faculties.find((f) =>
            this.context.data?.faculty
              ?.toUpperCase()
              .includes(f.name.toUpperCase()),
          )?.id;
          if (currentFacultyId) {
            this.form.controls.faculty.setValue(currentFacultyId);
          }
        }),
        take(1),
      )
      .subscribe();

    this.departments$
      .pipe(
        tap((departments) => {
          const currentDepartmentId = departments.find(
            (d) =>
              d.name.toUpperCase() ===
              this.context.data?.department?.toUpperCase(),
          )?.id;
          if (currentDepartmentId) {
            this.form.controls.department.setValue(currentDepartmentId);
          }
        }),
        take(1),
      )
      .subscribe();
  }

  private handleCreateSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => {
          this.alertService
            .open('Thêm học phần thành công!', {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.context.completeWith(true);
        }),
      )
      .subscribe();
  }
}
