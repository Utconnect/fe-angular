import { inject, Injectable } from '@angular/core';
import { ExaminationService, GetAllShiftsData } from '@esm/api';
import { EsmObservableHelper } from '@esm/helpers';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TuiDayRange } from '@taiga-ui/cdk';
import { ObservableHelper } from '@utconnect/helpers';
import { Status } from '@utconnect/types';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationDataFinalState = {
  data: GetAllShiftsData['data'];
  status: Status;
  filter: {
    methods: number[];
    date: TuiDayRange | null;
    shifts: number[];
  };
};

@Injectable()
export class ExaminationDataFinalStore extends ComponentStore<ExaminationDataFinalState> {
  // INJECT PROPERTIES
  private readonly examinationService = inject(ExaminationService);
  private readonly appStore = inject(Store<EsmState>);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);
  private readonly filter$ = this.select((s) => s.filter);

  // GLOBAL PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(EsmSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  readonly displayData$ = EsmObservableHelper.shiftFilterObservable(
    this.data$,
    this.filter$,
  );

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getAllShifts(id).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                status: 'success',
              }),
            () => this.patchState({ status: 'error' }),
          ),
        ),
      ),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      status: 'loading',
      filter: {
        methods: [],
        date: null,
        shifts: [],
      },
    });
  }
}
