import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ExamService } from '@tss/api';
import { TssSelector, TssState } from '@tss/store';
import { GenericState } from '@utconnect/types';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExportDialogState = GenericState<void>;

@Injectable()
export class ExamDialogStore extends ComponentStore<ExportDialogState> {
  // INJECTIONS
  private readonly examService = inject(ExamService);
  private readonly appStore = inject(Store<TssState>);

  // PRIVATE PROPERTIES
  private teacher$ = this.appStore.pipe(
    TssSelector.notNullTeacher,
    takeUntil(this.destroy$),
  );

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.dataStatus);

  // EFFECTS
  readonly submit = this.effect<{ id: number; note: string }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
      withLatestFrom(this.teacher$),
      switchMap(([{ id, note }, teacher]) =>
        this.examService.updateExamNote(teacher.id, id, { note }).pipe(
          tapResponse(
            () =>
              this.patchState({
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
  constructor() {
    super(<ExportDialogState>{});
  }
}
