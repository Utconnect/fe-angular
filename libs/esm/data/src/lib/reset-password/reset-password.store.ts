import { inject, Injectable } from '@angular/core';
import { GetTeachersData, TeacherService } from '@esm/api';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Status } from '@utconnect/types';
import { switchMap, tap } from 'rxjs';

type DataResetPasswordState = {
  data: GetTeachersData['data'];
  status: Status;
};

@Injectable()
export class DataResetPasswordStore extends ComponentStore<DataResetPasswordState> {
  // INJECT PROPERTIES
  private readonly teacherService = inject(TeacherService);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      switchMap(() =>
        this.teacherService.getTeachers({ IsFaculty: true }).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                status: 'success',
              }),
            () => this.patchState({ status: 'error' }),
          ),
        ),
      ),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      status: 'idle',
    });
  }
}
