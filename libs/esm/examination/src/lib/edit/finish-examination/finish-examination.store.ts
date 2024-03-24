import { inject, Injectable } from '@angular/core';
import { ESMDomainEnumsExaminationStatus, ExaminationService } from '@esm/api';
import { EsmApiAction, EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ObservableHelper } from '@utconnect/helpers';
import { Status } from '@utconnect/types';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationEditFinishExaminationState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class ExaminationEditFinishExaminationStore extends ComponentStore<ExaminationEditFinishExaminationState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);
  private readonly examinationService = inject(ExaminationService);

  // STATE SELECTORS
  readonly status$ = this.select((s) => s.status);

  // GLOBAL SELECTORS
  readonly examination$ = this.appStore
    .select(EsmSelector.examination)
    .pipe(takeUntil(this.destroy$));

  // EFFECTS
  readonly finish = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      withLatestFrom(this.examination$.pipe(ObservableHelper.filterNullish())),
      switchMap(({ 1: examination }) =>
        this.examinationService
          .changeStatus(examination.id, {
            status: ESMDomainEnumsExaminationStatus.Closed,
            createdAt: new Date(),
          })
          .pipe(
            tapResponse(
              () => {
                this.patchState({ status: 'success' });
                this.appStore.dispatch(EsmApiAction.closeSuccessful());
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
