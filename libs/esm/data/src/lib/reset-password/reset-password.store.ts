import { inject, Injectable } from '@angular/core';
import { GetUserData } from '@esm/api';
import { Status } from '@esm/cdk';
import { UserService } from '@esm/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';

type DataResetPasswordState = {
  data: GetUserData['data'];
  status: Status;
};

@Injectable()
export class DataResetPasswordStore extends ComponentStore<DataResetPasswordState> {
  // INJECT PROPERTIES
  private readonly userService = inject(UserService);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      switchMap(() =>
        this.userService.getAllInvigilators('isFaculty').pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data: data,
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
