import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TuiDayRange } from '@taiga-ui/cdk';
import { ChangeSchedule, StatisticService } from '@tss/api';
import { TssSelector, TssState } from '@tss/store';
import { GenericState } from '@utconnect/types';
import { switchMap, takeUntil, tap } from 'rxjs';

type ExportDialogState = GenericState<ChangeSchedule[]>;

@Injectable()
export class TssChangeReportDialogStore extends ComponentStore<ExportDialogState> {
  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.dataStatus);
  readonly teacher$ = this.appShellStore.pipe(
    TssSelector.notNullTeacher,
    takeUntil(this.destroy$),
  );

  // EFFECTS
  readonly getPersonalChangeScheduleRequests = this.effect<{
    range: TuiDayRange;
    teacherId: string;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
      switchMap((params) =>
        this.statisticService.getPersonal(params.range, params.teacherId).pipe(
          tapResponse(
            (r) =>
              this.patchState({
                data: r.data,
                dataStatus: 'success',
                dataError: '',
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
  constructor(
    private readonly statisticService: StatisticService,
    private readonly appShellStore: Store<TssState>,
  ) {
    super(<ExportDialogState>{});
  }
}
