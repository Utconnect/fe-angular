import { inject, Injectable } from '@angular/core';
import { ExaminationService, GetEventsData } from '@esm/api';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ObservableHelper } from '@utconnect/helpers';
import { Status } from '@utconnect/types';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationProcessState = {
  data: GetEventsData['data'] | null;
  status: Status;
};

@Injectable()
export class ExaminationProcessStore extends ComponentStore<ExaminationProcessState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);
  private readonly examinationService = inject(ExaminationService);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(EsmSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly getEvents = this.effect((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getEvents(id).pipe(
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
      data: null,
      status: 'idle',
    });
  }
}
