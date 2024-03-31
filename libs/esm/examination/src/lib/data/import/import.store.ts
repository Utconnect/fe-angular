import { inject, Injectable } from '@angular/core';
import { ExaminationService, ImportExaminationPayload } from '@esm/api';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ObservableHelper } from '@utconnect/helpers';
import { Status } from '@utconnect/types';
import { Subject, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationDataImportState = {
  status: Status;
};

@Injectable()
export class ExaminationDataImportStore extends ComponentStore<ExaminationDataImportState> {
  // INJECT PROPERTIES
  private readonly examinationService = inject(ExaminationService);
  private readonly appStore = inject(Store<EsmState>);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);
  readonly reload$ = new Subject<void>();

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(EsmSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly import = this.effect<ImportExaminationPayload>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(([payload, id]) =>
        this.examinationService.importExamination(id, payload).pipe(
          tapResponse(
            ({ data: success }) => {
              if (!success) {
                throw new Error();
              }
              this.patchState({ status: 'success' });
            },
            () => this.patchState({ status: 'error' }),
          ),
        ),
      ),
    ),
  );

  readonly clearRejected = this.effect<void>((params$) =>
    params$.pipe(tap(() => this.patchState({ status: 'idle' }))),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      status: 'idle',
    });

    this.handleImportSuccess();
  }

  // PUBLIC METHODS
  reloadExamination(): void {
    this.reload$.next();
  }

  // PRIVATE METHODS
  private handleImportSuccess(): void {
    this.reload$
      .pipe(
        withLatestFrom(this.examinationId$),
        tap(({ 1: id }) => {
          this.appStore.dispatch(EsmPageAction.getExaminationSummary({ id }));
        }),
      )
      .subscribe();
  }
}
