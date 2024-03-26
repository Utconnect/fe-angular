import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Status } from '@utconnect/types';
import { switchMap, tap } from 'rxjs';
import { AUTH_SERVICE_TOKEN } from '../../auth.tokens';
import { ChangePasswordRequest } from '../../auth.types';

type SettingsChangePasswordState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class SettingsChangePasswordStore extends ComponentStore<SettingsChangePasswordState> {
  // INJECT PROPERTIES
  private readonly authService = inject(AUTH_SERVICE_TOKEN);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly change = this.effect<ChangePasswordRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((params) =>
        this.authService.changePassword(params).pipe(
          tapResponse(
            () =>
              this.patchState({
                status: 'success',
                error: '',
              }),
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
