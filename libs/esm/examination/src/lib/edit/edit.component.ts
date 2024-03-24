import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ESMDomainDtosExaminationExaminationSummary,
  ESMDomainEnumsExaminationStatus,
} from '@esm/api';
import { LetModule } from '@ngrx/component';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiErrorModule,
  TuiLabelModule,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { combineLatest, filter, map, switchMap, tap } from 'rxjs';
import { ExaminationEditStore } from './edit.store';
import { ExaminationEditFinishExaminationComponent } from './finish-examination/finish-examination.component';

export const TAIGA_UI = [
  TuiButtonModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
];

type FormType = {
  name: FormControl<string>;
  displayId: FormControl<string>;
  description: FormControl<string>;
  expectedDateRange: FormControl<TuiDayRange | null>;
};

@Component({
  selector: 'esm-examination-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    tuiButtonOptionsProvider({
      size: 'm',
    }),
    ExaminationEditStore,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    ExaminationEditFinishExaminationComponent,
    TAIGA_UI,
  ],
})
export class ExaminationEditComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(ExaminationEditStore);
  private readonly route = inject(ActivatedRoute);
  private readonly alertService = inject(TuiAlertService);

  // PUBLIC PROPERTIES
  form?: FormGroup<FormType>;

  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly obs$ = this.store.obs$;
  readonly status$ = this.store.status$;
  readonly examination$ = this.store.examination$;
  readonly isCreateMode$ = this.route.data.pipe(
    map((data) => data['isCreateMode'] ?? false),
  );

  // LIFECYCLE
  ngOnInit(): void {
    this.handleStatusChanges();
    this.handleBuildCreateForm();
    this.handleBuildEditForm();
  }

  // PUBLIC METHODS
  onCreate(): void {
    if (!this.form) return;

    const { expectedDateRange, ...rest } = this.form.getRawValue();
    this.store.create({
      ...rest,
      expectStartAt: expectedDateRange?.from.toUtcNativeDate() ?? null,
      expectEndAt: expectedDateRange?.to.toUtcNativeDate() ?? null,
      createdAt: new Date(),
    });
  }

  onUpdate(): void {
    if (!this.form) return;

    const { expectedDateRange, ...rest } = this.form.getRawValue();
    this.store.update({
      ...rest,
      expectStartAt: expectedDateRange?.from.toUtcNativeDate() ?? null,
      expectEndAt: expectedDateRange?.to.toUtcNativeDate() ?? null,
      updatedAt: new Date(),
    });
  }

  // PRIVATE METHODS
  private handleStatusChanges(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        switchMap(() =>
          this.alertService.open('Chỉnh sửa thông tin thành công!', {
            status: TuiNotification.Success,
          }),
        ),
      )
      .subscribe();
  }

  private handleBuildCreateForm(): void {
    this.isCreateMode$
      .pipe(
        filter((isCreateMode) => isCreateMode),
        tap(() => this.buildCreateForm()),
      )
      .subscribe();
  }

  private handleBuildEditForm(): void {
    combineLatest([this.isCreateMode$, this.examination$])
      .pipe(
        filter(
          (
            props,
          ): props is [boolean, ESMDomainDtosExaminationExaminationSummary] =>
            !props[0] && !!props[1],
        ),
        tap(({ 1: examination }) => this.buildEditForm(examination)),
      )
      .subscribe();
  }

  private buildCreateForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      displayId: [''],
      description: [''],
      expectedDateRange: [null as TuiDayRange | null],
    });
  }

  private buildEditForm(
    examination: ESMDomainDtosExaminationExaminationSummary,
  ): void {
    let expectedDateRange: TuiDayRange | null = null;
    if (examination.expectStartAt && examination.expectEndAt) {
      expectedDateRange = new TuiDayRange(
        TuiDay.fromUtcNativeDate(new Date(examination.expectStartAt)),
        TuiDay.fromUtcNativeDate(new Date(examination.expectEndAt)),
      );
    }

    this.form = this.fb.group({
      name: [examination.name, Validators.required],
      displayId: [examination.displayId],
      description: [examination.description ?? ''],
      expectedDateRange: [expectedDateRange],
    });

    this.cdr.markForCheck();
  }
}
