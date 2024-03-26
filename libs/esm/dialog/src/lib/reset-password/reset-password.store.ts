import { inject, Injectable } from '@angular/core';
import { EsmAuthService } from '@esm/api';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Status } from '@utconnect/types';
import { switchMap, tap } from 'rxjs';

type ResetPasswordDialogState = {
  status: Status;
  errors: string | null;
};

@Injectable()
export class ResetPasswordDialogStore extends ComponentStore<ResetPasswordDialogState> {
  // INJECT PROPERTIES
  private readonly authService = inject(EsmAuthService);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  // EFFECTS
  readonly resetPassword = this.effect<string>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap((userId) =>
        this.authService.resetPassword({ userId }).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
            },
            (errors) =>
              this.patchState({
                status: 'error',
                errors: errors as string,
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
