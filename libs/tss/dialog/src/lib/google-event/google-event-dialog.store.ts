import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { GoogleService } from '@tss/api';
import { TssSelector, TssState } from '@tss/store';
import { GoogleCalendarHelper } from '@utconnect/helpers';
import { DefaultGoogleCalendarEvent, GenericState } from '@utconnect/types';
import { map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExportDialogState = GenericState<void>;

@Injectable()
export class GoogleEventDialogStore extends ComponentStore<ExportDialogState> {
  // INJECTIONS
  private readonly googleService = inject(GoogleService);
  private readonly appStore = inject(Store<TssState>);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.dataStatus);
  readonly teacher$ = this.appStore.pipe(
    TssSelector.notNullTeacher,
    takeUntil(this.destroy$),
  );
  readonly nameTitle$ = this.appStore.select(TssSelector.nameTitle);
  readonly googleCalendars$ = this.appStore
    .select(TssSelector.googleCalendars)
    .pipe(
      map((calendars) =>
        calendars.filter((c) => !GoogleCalendarHelper.isReadonly(c)),
      ),
    );

  // EFFECTS
  readonly submitCreate = this.effect<{
    calendarId: string;
    body: DefaultGoogleCalendarEvent;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
      withLatestFrom(this.teacher$),
      switchMap(([{ calendarId, body }, teacher]) =>
        this.googleService.create(teacher.id, calendarId, body).pipe(
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

  readonly submitEdit = this.effect<{
    calendarId: string;
    eventId: string;
    body: DefaultGoogleCalendarEvent;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
      withLatestFrom(this.teacher$),
      switchMap(([{ calendarId, eventId, body }, teacher]) =>
        this.googleService.update(teacher.id, calendarId, eventId, body).pipe(
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
    super(<ExportDialogState>{});
  }
}
