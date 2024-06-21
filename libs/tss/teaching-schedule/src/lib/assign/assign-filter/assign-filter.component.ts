import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { LetModule } from '@ngrx/component';
import {
  TuiContextWithImplicit,
  TuiDestroyService,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiExpandModule,
} from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { ScheduleConstant } from '@tss/constants';
import { ObservableHelper, ScheduleHelper } from '@utconnect/helpers';
import { SimpleMapModel, SimpleModel } from '@utconnect/types';
import { last } from 'lodash';
import {
  filter,
  map,
  Observable,
  Subject,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { TssTeachingScheduleAssignStore } from '../store';

const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiExpandModule,
  TuiSelectModule,
];

@Component({
  selector: 'tss-teaching-schedule-assign-filter',
  templateUrl: './assign-filter.component.html',
  styleUrls: ['./assign-filter.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, LetModule, ...TAIGA_UI],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'primary',
      size: 's',
    }),
  ],
})
export class TssTeachingScheduleAssignFilterComponent implements OnInit {
  // INJECTIONS
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(TssTeachingScheduleAssignStore);
  private readonly destroy$ = inject(TuiDestroyService);

  // PUBLIC PROPERTIES
  expanded = true;
  openImportDialog = false;
  form!: FormGroup;
  schoolYears$!: Observable<string[]>;

  readonly currentTerm$ = this.store.currentTerm$;
  readonly academicData$ = this.store.academicData$;
  readonly trainingTypes$ = this.store.trainingTypes$;
  readonly departments$ = this.store.departments$;
  readonly filterStatus$ = this.store.status$('filter');

  readonly termsInYear = ScheduleConstant.TERMS_IN_YEAR;
  readonly batchesInTerm = ScheduleConstant.BATCHES_IN_TERM;
  readonly filter$ = new Subject<void>();
  readonly trainingTypeChange$ = new Subject<number>();

  // PRIVATE PROPERTIES
  private myDepartment$ = this.store.myDepartment$;

  // GETTERS
  get termInYear(): FormControl {
    return this.form.controls['termInYear'] as FormControl;
  }

  get trainingType(): FormControl {
    return this.form.controls['trainingType'] as FormControl;
  }

  private get schoolYear(): FormControl {
    return this.form.controls['schoolYear'] as FormControl;
  }

  private get batchInTerm(): FormControl {
    return this.form.controls['batchInTerm'] as FormControl;
  }

  private get academicYear(): FormControl {
    return this.form.controls['academicYear'] as FormControl;
  }

  private get department(): FormControl {
    return this.form.controls['department'] as FormControl;
  }

  // CONSTRUCTOR
  constructor() {
    this.initForm();
    this.triggerSchoolYearChange();
    this.handleTrainingTypeChange();
    this.handleFilter();

    this.bindCurrentTerm();
    this.bindTrainingType();
    this.bindAcademicYear();
    this.bindDepartment();
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.store.loadDepartment();
    this.myDepartment$
      .pipe(
        ObservableHelper.filterNullish(),
        tap(() => this.filter$.next()),
        take(1),
      )
      .subscribe();
  }

  // PUBLIC METHODS
  onTermInYearChange(termInYear: number): void {
    const selectedBatchInTerm = this.batchInTerm.value as number;
    if (!this.batchesInTerm[termInYear].includes(selectedBatchInTerm)) {
      this.batchInTerm.setValue(1);
    }
  }

  onToggle(): void {
    this.expanded = !this.expanded;
  }

  onOpenImportDialog(): void {
    this.openImportDialog = true;
  }

  @tuiPure
  stringifyTrainingType(
    items: SimpleModel<number>[],
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [number, string]),
    );

    return ({ $implicit }) => map.get($implicit) || '';
  }

  @tuiPure
  stringifyAcademicYear(
    items: SimpleModel<number>[],
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [number, string]),
    );

    return ({ $implicit }) => map.get($implicit) || '';
  }

  @tuiPure
  stringifyDepartment(
    items: SimpleMapModel<string, SimpleModel[]>[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const departmentList = items.reduce<SimpleModel[]>(
      (acc, curr) => [...acc, ...curr.value],
      [],
    );
    const map = new Map(
      departmentList.map(({ id, name }) => [id, name] as [string, string]),
    );

    return ({ $implicit }) => map.get($implicit) || '';
  }

  // PRIVATE METHODS
  private initForm(): void {
    this.form = this.fb.group({
      schoolYear: '',
      termInYear: '',
      batchInTerm: 1,
      trainingType: 'Chính quy',
      academicYear: '',
      department: '',
    });
  }

  private triggerSchoolYearChange(): void {
    this.schoolYears$ = this.currentTerm$.pipe(
      map((currentTerm) => ScheduleHelper.generateSchoolYears(currentTerm)),
    );
  }

  private handleTrainingTypeChange(): void {
    this.trainingTypeChange$
      .pipe(
        withLatestFrom(this.academicData$),
        tap(([trainingTypeId, academicData]) => {
          this.academicYear.setValue(
            last(academicData[trainingTypeId].academicYears),
          );
        }),
      )
      .subscribe();
  }

  private handleFilter(): void {
    this.filter$
      .pipe(
        tap(() => {
          const dep = this.department.value as string;
          const schoolYear = (this.schoolYear.value as string)
            .split('-')
            .join('_');
          const term = this.termInYear.value as string;
          const params = {
            study_sessions: `${schoolYear}_${term}_${
              this.batchInTerm.value as number
            }`,
          };

          this.store.filter({ dep, params });
          this.store.loadTeacher(dep);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private bindCurrentTerm(): void {
    this.currentTerm$
      .pipe(
        tap((currentTerm) => {
          this.schoolYear.setValue(
            currentTerm.substring(0, currentTerm.length - 2),
          );
          this.termInYear.setValue(currentTerm.slice(-1));
        }),
      )
      .subscribe();
  }

  private bindTrainingType(): void {
    this.trainingTypes$
      .pipe(
        filter((trainingTypes) => trainingTypes.length > 0),
        tap((trainingTypes) => {
          this.trainingType.setValue(trainingTypes[0].id);
        }),
      )
      .subscribe();
  }

  private bindAcademicYear(): void {
    this.academicData$
      .pipe(
        withLatestFrom(this.trainingTypes$),
        filter(({ 1: trainingTypes }) => trainingTypes.length > 0),
        tap(([academicData, trainingTypes]) => {
          this.academicYear.setValue(
            last(academicData[trainingTypes[0].id].academicYears) ?? [],
          );
        }),
      )
      .subscribe();
  }

  private bindDepartment(): void {
    this.myDepartment$
      .pipe(
        ObservableHelper.filterNullish(),
        tap(({ id }) => {
          this.department.setValue(id);
        }),
      )
      .subscribe();
  }
}
