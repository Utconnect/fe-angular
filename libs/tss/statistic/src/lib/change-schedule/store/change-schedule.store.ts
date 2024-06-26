import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TuiDayRange } from '@taiga-ui/cdk';
import { ChangeSchedule, StatisticService } from '@tss/api';
import { TssSelector, TssState } from '@tss/store';
import { DateHelper, ObservableHelper } from '@utconnect/helpers';
import { GenericState } from '@utconnect/types';
import {
  map,
  mergeMap,
  Observable,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type ChangeScheduleState = GenericState<ChangeSchedule[]>;

@Injectable()
export class TssStatisticChangeScheduleStore extends ComponentStore<ChangeScheduleState> {
  // INJECTIONS
  private readonly appStore = inject(Store<TssState>);
  private readonly statisticService = inject(StatisticService);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.dataStatus);
  readonly department$ = this.appStore
    .select(TssSelector.department)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));
  readonly teachersInDepartment$ = this.appStore
    .select(TssSelector.teachersInDepartment)
    .pipe(takeUntil(this.destroy$));
  readonly teacher$ = this.appStore.pipe(
    TssSelector.notNullTeacher,
    takeUntil(this.destroy$),
  );

  // EFFECTS
  readonly statisticize = this.effect<{ range: TuiDayRange }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
      withLatestFrom(this.department$),
      mergeMap(([{ range }, department]) =>
        this.getStatistic(department.id, range).pipe(
          tapResponse(
            (data) =>
              this.patchState({
                data,
                dataStatus: 'success',
                dataError: null,
              }),
            (error) =>
              this.patchState({
                dataStatus: 'error',
                dataError: error as string,
              }),
          ),
        ),
      ),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super(<ChangeScheduleState>{});
  }

  // PUBLIC METHODS
  private getStatistic(
    departmentId: string,
    range: TuiDayRange,
  ): Observable<ChangeSchedule[]> {
    const date = [
      DateHelper.format(range.from),
      DateHelper.format(range.to),
    ].join();

    return this.statisticService
      .getDepartment(departmentId, date)
      .pipe(map(({ data }) => data));
  }
}
