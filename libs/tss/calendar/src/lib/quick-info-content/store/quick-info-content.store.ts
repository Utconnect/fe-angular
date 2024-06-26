import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ExamService, Note, ScheduleService } from '@tss/api';
import { TssSelector, TssState } from '@tss/store';
import { EjsScheduleModelType, GenericState } from '@utconnect/types';
import { iif, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type QuickInfoContentState = GenericState<void>;

@Injectable()
export class TssCalendarQuickInfoContentEventStore extends ComponentStore<QuickInfoContentState> {
  // INJECTIONS
  private readonly examService = inject(ExamService);
  private readonly scheduleService = inject(ScheduleService);
  private readonly appStore = inject(Store<TssState>);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.dataStatus);
  private readonly teacherId$ = this.appStore.pipe(
    TssSelector.notNullTeacher,
    map(({ id }) => id),
    takeUntil(this.destroy$),
  );

  // EFFECTS
  readonly updateNote = this.effect<{
    id: number;
    type: EjsScheduleModelType;
    payload: Note;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
      withLatestFrom(this.teacherId$),
      switchMap(([{ id, type, payload }, teacherId]) =>
        iif(
          () => type === 'study',
          this.scheduleService.updateStudyNote(id, payload),
          this.examService.updateExamNote(teacherId, id, payload),
        ).pipe(
          tapResponse(
            () =>
              this.patchState({
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
    super(<QuickInfoContentState>{});
  }
}
