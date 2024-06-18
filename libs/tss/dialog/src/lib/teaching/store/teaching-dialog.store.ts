import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  Note,
  RequestChangeSchedulePayload,
  RequestIntendChangeSchedulePayload,
  ScheduleService,
  SearchSchedule,
  StudyScheduleModel,
} from '@tss/api';
import { TssSelector, TssState } from '@tss/store';
import { Nullable, SimpleFixedScheduleModel, Status } from '@utconnect/types';
import { Observable, switchMap, takeUntil, tap } from 'rxjs';

type TeachingDialogStatus = {
  change: Status;
  request: Status;
  update: Status;
  search: Status;
  cancel: Status;
};
export type TssTeachingDialogChange = {
  note: string;
};
type TeachingDialogState = {
  status: TeachingDialogStatus;
  requestingChangeSchedule: boolean;
  justRequestedSchedule: Nullable<SimpleFixedScheduleModel>;
  change: TssTeachingDialogChange;
  searchSchedule: Nullable<StudyScheduleModel[]>;
};
const initialState: TeachingDialogState = {
  status: {
    change: 'idle',
    request: 'idle',
    update: 'idle',
    search: 'idle',
    cancel: 'idle',
  },
  requestingChangeSchedule: false,
  justRequestedSchedule: null,
  change: {
    note: '',
  },
  searchSchedule: null,
};

@Injectable()
export class TssTeachingDialogStore extends ComponentStore<TeachingDialogState> {
  // PRIVATE PROPERTIES
  private readonly _status$ = this.select((s) => s.status);

  // PUBLIC PROPERTIES
  readonly change$ = this.select((s) => s.change);
  readonly searchSchedule$ = this.select((s) => s.searchSchedule);
  readonly justRequestedSchedule$ = this.select((s) => s.justRequestedSchedule);
  readonly requestingChangeSchedule$ = this.select(
    (s) => s.requestingChangeSchedule,
  );
  readonly teacher$ = this.appStore
    .select(TssSelector.teacher)
    .pipe(takeUntil(this.destroy$));
  readonly rooms$ = this.appStore
    .select(TssSelector.rooms)
    .pipe(takeUntil(this.destroy$));
  readonly nameTitle$ = this.appStore
    .select(TssSelector.nameTitle)
    .pipe(takeUntil(this.destroy$));

  // EFFECTS
  readonly request = this.effect<RequestChangeSchedulePayload>((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState(({ status }) => ({
          status: { ...status, request: 'loading' },
        })),
      ),
      switchMap((payload) =>
        this.scheduleService.requestChangeSchedule(payload).pipe(
          tapResponse(
            ({ data }) => {
              const { newDate, newShift, newIdRoom } = payload;
              this.patchState(({ status }) => ({
                justRequestedSchedule: {
                  id: data,
                  newDate,
                  newShift,
                  newIdRoom,
                  status: 200,
                  intendTime: null,
                  createdAt: new Date(),
                },
                status: {
                  ...status,
                  request: 'success',
                },
                requestingChangeSchedule: false,
              }));
            },
            () =>
              this.patchState(({ status }) => ({
                requestingChangeSchedule: false,
                status: { ...status, request: 'error' },
              })),
          ),
        ),
      ),
    ),
  );

  readonly requestIntend = this.effect<RequestIntendChangeSchedulePayload>(
    (params$) =>
      params$.pipe(
        tap(() =>
          this.patchState(({ status }) => ({
            status: { ...status, request: 'loading' },
          })),
        ),
        switchMap((payload) =>
          this.scheduleService.requestIntendChangeSchedule(payload).pipe(
            tapResponse(
              ({ data }) => {
                const { intendTime } = payload;
                this.patchState(({ status }) => ({
                  justRequestedSchedule: {
                    id: data,
                    createdAt: new Date(),
                    intendTime,
                    status: 201,
                    newDate: null,
                    newShift: null,
                    newIdRoom: null,
                  },
                  status: {
                    ...status,
                    request: 'success',
                  },
                  requestingChangeSchedule: false,
                }));
              },
              () =>
                this.patchState(({ status }) => ({
                  requestingChangeSchedule: false,
                  status: { ...status, request: 'error' },
                })),
            ),
          ),
        ),
      ),
  );

  readonly change = this.effect<RequestChangeSchedulePayload>((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState(({ status }) => ({
          status: { ...status, change: 'loading' },
        })),
      ),
      switchMap((payload) =>
        this.scheduleService.changeSchedule(payload).pipe(
          tapResponse(
            () => {
              this.patchState(({ status }) => ({
                status: {
                  ...status,
                  change: 'success',
                },
                requestingChangeSchedule: false,
              }));
            },
            () =>
              this.patchState(({ status }) => ({
                requestingChangeSchedule: false,
                status: { ...status, request: 'error' },
              })),
          ),
        ),
      ),
    ),
  );

  readonly update = this.effect<{ id: number; payload: Note }>((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState(({ status }) => ({
          status: { ...status, update: 'loading' },
        })),
      ),
      switchMap(({ id, payload }) =>
        this.scheduleService.updateStudyNote(id, payload).pipe(
          tapResponse(
            () => {
              this.patchState(({ status }) => ({
                change: { note: payload.note },
                status: {
                  ...status,
                  update: 'success',
                },
              }));
            },
            () =>
              this.patchState(({ status }) => ({
                status: { ...status, update: 'error' },
              })),
          ),
        ),
      ),
    ),
  );

  readonly search = this.effect<{ teacherId: string; payload: SearchSchedule }>(
    (params$) =>
      params$.pipe(
        tap(() =>
          this.patchState(({ status }) => ({
            status: { ...status, search: 'loading' },
          })),
        ),
        switchMap(({ teacherId, payload }) =>
          this.scheduleService.getSchedule(teacherId, payload).pipe(
            tapResponse(
              ({ data }) => {
                this.patchState(({ status }) => ({
                  searchSchedule: data,
                  status: {
                    ...status,
                    search: 'success',
                  },
                }));
              },
              () =>
                this.patchState(({ status }) => ({
                  status: { ...status, search: 'error' },
                })),
            ),
          ),
        ),
      ),
  );

  readonly cancel = this.effect<number>((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState(({ status }) => ({
          status: { ...status, search: 'loading' },
        })),
      ),
      switchMap((id) =>
        this.scheduleService.cancelChangeScheduleRequests(id).pipe(
          tapResponse(
            () => {
              this.patchState(({ status }) => ({
                justRequestedSchedule: null,
                status: {
                  ...status,
                  cancel: 'success',
                },
              }));
            },
            () =>
              this.patchState(({ status }) => ({
                status: { ...status, cancel: 'error' },
              })),
          ),
        ),
      ),
    ),
  );

  readonly status$ = (prop: keyof TeachingDialogStatus): Observable<string> =>
    this.select(this._status$, (s) => s[prop]);

  // CONSTRUCTOR
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly appStore: Store<TssState>,
  ) {
    super(initialState);
  }

  // PUBLIC METHODS
  init(change: TssTeachingDialogChange): void {
    this.patchState({ ...initialState, change });
  }

  toggleRequest(open: boolean): void {
    this.patchState({ requestingChangeSchedule: open });
  }
}
