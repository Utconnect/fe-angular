import { inject, Injectable } from '@angular/core';
import { ExaminationService, GetRelatedData } from '@esm/api';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Status } from '@utconnect/types';
import { combineLatest, map, switchMap, takeUntil, tap } from 'rxjs';

type HomeState = {
  closedExaminations: GetRelatedData['data'];
  closedExaminationsStatus: Status;
  closedExaminationsError: string | null;
};

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);
  private readonly examinationService = inject(ExaminationService);

  // STATE SELECTORS
  private readonly closedExaminations$ = this.select(s => s.closedExaminations);
  private readonly closedExaminationsStatus$ = this.select(
    s => s.closedExaminationsStatus
  );

  // GLOBAL SELECTORS
  private readonly relatedStatus$ = this.appStore
    .select(EsmSelector.relatedExaminationsStatus)
    .pipe(takeUntil(this.destroy$));
  private readonly relatedExaminations$ = this.appStore
    .select(EsmSelector.relatedExaminations)
    .pipe(takeUntil(this.destroy$));

  // EXPOSE
  readonly obs$ = combineLatest([
    this.closedExaminations$,
    this.closedExaminationsStatus$,
    this.relatedExaminations$,
    this.relatedStatus$,
  ]).pipe(
    map(
      ([
        closedExaminations,
        closedExaminationsStatus,
        relatedExaminations,
        relatedStatus,
      ]) => ({
        closedExaminations,
        closedExaminationsStatus,
        relatedExaminations,
        relatedStatus,
      })
    )
  );

  // EFFECTS
  readonly getClosedExaminations = this.effect<void>(params$ =>
    params$.pipe(
      tap(() =>
        this.patchState({
          closedExaminationsStatus: 'loading',
          closedExaminationsError: null,
        })
      ),
      switchMap(() =>
        this.examinationService.getRelated({ IsActive: false }).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                closedExaminations: data,
                closedExaminationsStatus: 'success',
                closedExaminationsError: null,
              }),
            error =>
              this.patchState({
                closedExaminationsStatus: 'error',
                closedExaminationsError: error as string,
              })
          )
        )
      )
    )
  );

  // CONSTRUCTOR
  constructor() {
    super({
      closedExaminations: [],
      closedExaminationsStatus: 'idle',
      closedExaminationsError: null,
    });
  }
}
