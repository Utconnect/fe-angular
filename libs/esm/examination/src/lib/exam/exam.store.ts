import { inject, Injectable } from '@angular/core';
import { ExaminationService, GetAllShiftsData } from '@esm/api';
import { EsmObservableHelper } from '@esm/helpers';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  TUI_FIRST_DAY,
  TUI_LAST_DAY,
  TuiDay,
  TuiDayRange,
} from '@taiga-ui/cdk';
import { ObservableHelper } from '@utconnect/helpers';
import { Status } from '@utconnect/types';
import {
  combineLatest,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type ExaminationExamState = {
  data: GetAllShiftsData['data'];
  dataStatus: Status;
  updateStatus: Status;
  tableFormIsPristine: boolean;
  filter: {
    methods: number[];
    date: TuiDayRange | null;
    shifts: number[];
  };
};

@Injectable()
export class ExaminationExamStore extends ComponentStore<ExaminationExamState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);
  private readonly examinationService = inject(ExaminationService);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly updateStatus$ = this.select((s) => s.updateStatus);
  readonly tableFormIsPristine$ = this.select((s) => s.tableFormIsPristine);

  private readonly filter$ = this.select((s) => s.filter);

  // GLOBAL SELECTORS
  private readonly examinationId$ = this.appStore
    .select(EsmSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  private readonly examination$ = this.appStore
    .select(EsmSelector.examination)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  readonly displayData$ = EsmObservableHelper.shiftFilterObservable(
    this.data$,
    this.filter$,
  );

  readonly showLoader$ = combineLatest([
    this.dataStatus$,
    this.updateStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));

  private readonly minMaxDate$ = this.data$.pipe(
    map((data) =>
      data.length
        ? {
            min: TuiDay.fromUtcNativeDate(new Date(data[0].shiftGroup.startAt)),
            max: TuiDay.fromUtcNativeDate(
              new Date(data[data.length - 1].shiftGroup.startAt),
            ),
          }
        : { min: TUI_FIRST_DAY, max: TUI_LAST_DAY },
    ),
  );

  readonly headerObs$ = combineLatest([
    this.examination$,
    this.showLoader$,
    this.tableFormIsPristine$,
    this.minMaxDate$,
  ]).pipe(
    map(([examination, showLoader, tableFormIsPristine, minMaxDate]) => ({
      examination,
      showLoader,
      tableFormIsPristine,
      minMaxDate,
    })),
  );

  readonly tableObs$ = combineLatest([
    this.examination$,
    this.displayData$,
  ]).pipe(map(([examination, displayData]) => ({ examination, displayData })));

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading' })),
      withLatestFrom(this.examination$, this.examinationId$),
      filter(([_, examination, id]) => examination.id === id),
      switchMap(({ 2: id }) =>
        this.examinationService.getAllShifts(id).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                dataStatus: 'success',
              }),
            () => this.patchState({ data: [], dataStatus: 'error' }),
          ),
        ),
      ),
    ),
  );

  readonly save = this.effect<number[]>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ updateStatus: 'loading' })),
      withLatestFrom(this.displayData$, this.examinationId$),
      switchMap(([values, data, id]) => {
        const params = values.reduce((acc, curr, i) => {
          const shiftId = data[i].id;
          acc[shiftId] = curr;
          return acc;
        }, {} as Record<string, number>);

        return this.examinationService.updateExamsCount(id, params).pipe(
          tapResponse(
            () => {
              this.patchState({ updateStatus: 'success' });
              this.getData();
            },
            () => this.patchState({ updateStatus: 'error' }),
          ),
        );
      }),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      dataStatus: 'loading',
      updateStatus: 'idle',
      tableFormIsPristine: true,
      filter: {
        methods: [],
        date: null,
        shifts: [],
      },
    });
  }
}
