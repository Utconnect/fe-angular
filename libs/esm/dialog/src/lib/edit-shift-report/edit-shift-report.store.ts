import { inject, Injectable } from '@angular/core';
import { ExaminationService } from '@esm/api';
import { EsmHttpErrorResponse } from '@esm/model';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ObservableHelper } from '@utconnect/helpers';
import { ErrorResult, Status } from '@utconnect/types';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type EsmEditShiftReportDialogState = {
  status: Status;
  errors: ErrorResult[] | null;
};

@Injectable()
export class EsmEditShiftReportDialogStore extends ComponentStore<EsmEditShiftReportDialogState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);
  private readonly examinationService = inject(ExaminationService);

  // PUBLIC PROPERTIES
  readonly examinationId$ = this.appStore
    .select(EsmSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  // EFFECTS
  readonly update = this.effect<{
    shiftId: string;
    report: string;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      withLatestFrom(this.examinationId$),
      switchMap(([{ shiftId, report }, examinationId]) =>
        this.examinationService
          .updateShiftExamination(examinationId, shiftId, { report })
          .pipe(
            tapResponse(
              () => this.patchState({ status: 'success' }),
              (res: EsmHttpErrorResponse) =>
                this.patchState({
                  status: 'error',
                  errors: res.error.errors,
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
      errors: null,
    });
  }
}
