import { inject, Injectable } from '@angular/core';
import {
  ESMApplicationRoomsCommandsCreateCreateCommand,
  RoomService,
} from '@esm/api';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Status } from '@utconnect/types';
import { switchMap, tap } from 'rxjs';

type EsmEditRoomDialogState = {
  data: ESMApplicationRoomsCommandsCreateCreateCommand[];
  status: Status[];
  error: (string | null)[];
};

@Injectable()
export class EsmEditRoomDialogStore extends ComponentStore<EsmEditRoomDialogState> {
  // INJECT PROPERTIES
  private readonly roomService = inject(RoomService);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);
  readonly error$ = this.select((s) => s.error);

  // EFFECTS
  readonly init = this.effect<string[]>((params$) =>
    params$.pipe(
      tap((rooms) => {
        const roomsCount = rooms.length;
        this.patchState({
          data: rooms.map((r) => ({ displayId: r, capacity: null })),
          status: new Array(roomsCount).fill('idle'),
          error: new Array(roomsCount).fill(null),
        });
      }),
    ),
  );

  readonly create = this.effect<{
    rowId: number;
    params: ESMApplicationRoomsCommandsCreateCreateCommand;
  }>((params$) =>
    params$.pipe(
      tap(({ rowId }) =>
        this.patchState((state) => ({
          status: state.status.map((v, i) => (i === rowId ? 'loading' : v)),
          error: state.error.map((v, i) => (i === rowId ? null : v)),
        })),
      ),
      switchMap(({ rowId, params }) =>
        this.roomService.createRoom(params).pipe(
          tapResponse(
            () => this.onAddSuccess(rowId),
            (error) => this.onAddFail(rowId, error as string),
          ),
        ),
      ),
    ),
  );

  readonly remove = this.effect<number>((params$) =>
    params$.pipe(
      tap((index) =>
        this.patchState((state) => ({
          status: state.status.filter((_, i) => i !== index),
          error: state.error.filter((_, i) => i !== index),
        })),
      ),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      status: [],
      error: [],
    });
  }

  // PRIVATE METHODS
  private onAddSuccess(rowId: number): void {
    this.patchState((state) => ({
      status: state.status.map((v, i) => (i === rowId ? 'success' : v)),
      error: state.error.map((v, i) => (i === rowId ? null : v)),
    }));
  }

  private onAddFail(rowId: number, error: string): void {
    this.patchState((state) => ({
      status: state.status.map((v, i) => (i === rowId ? 'error' : v)),
      error: state.error.map((v, i) => (i === rowId ? error : v)),
    }));
  }
}
