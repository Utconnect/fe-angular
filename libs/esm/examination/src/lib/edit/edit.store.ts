import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ESMApplicationExaminationsCommandsCreateCreateCommand,
  ESMApplicationExaminationsCommandsUpdateUpdateParams,
  ExaminationService,
} from '@esm/api';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ObservableHelper } from '@utconnect/helpers';
import { Status } from '@utconnect/types';
import {
  combineLatest,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type ExaminationEditState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class ExaminationEditStore extends ComponentStore<ExaminationEditState> {
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly appStore = inject(Store<EsmState>);
  private readonly examinationService = inject(ExaminationService);

  // STATE SELECTORS
  readonly status$ = this.select((s) => s.status);

  // GLOBAL SELECTORS
  readonly examination$ = this.appStore
    .select(EsmSelector.examination)
    .pipe(takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  readonly obs$ = combineLatest([this.examination$, this.status$]).pipe(
    map(([examination, status]) => ({ examination, status })),
  );

  // EFFECTS
  readonly create =
    this.effect<ESMApplicationExaminationsCommandsCreateCreateCommand>(
      (params$) =>
        params$.pipe(
          tap(() => this.patchState({ status: 'loading', error: null })),
          switchMap((param) =>
            this.examinationService.createExamination(param).pipe(
              tapResponse(
                ({ data }) => {
                  this.router
                    .navigateByUrl(`${data}/exam/data`)
                    .catch((error) =>
                      this.patchState({
                        status: 'error',
                        error: error as string,
                      }),
                    );
                },
                (error) =>
                  this.patchState({
                    status: 'error',
                    error: error as string,
                  }),
              ),
            ),
          ),
        ),
    );

  readonly update =
    this.effect<ESMApplicationExaminationsCommandsUpdateUpdateParams>(
      (params$) =>
        params$.pipe(
          tap(() => this.patchState({ status: 'loading', error: null })),
          withLatestFrom(
            this.examination$.pipe(ObservableHelper.filterNullish()),
          ),
          switchMap(([param, { id }]) =>
            this.examinationService.updateExamination(id, param).pipe(
              tapResponse(
                () => {
                  this.patchState({ status: 'success' });
                  this.appStore.dispatch(
                    EsmPageAction.updateExamination({ id, data: param }),
                  );
                },
                (error) =>
                  this.patchState({
                    status: 'error',
                    error: error as string,
                  }),
              ),
            ),
          ),
        ),
    );

  // CONSTRUCTOR
  constructor() {
    super({
      status: 'idle',
      error: null,
    });
  }
}
