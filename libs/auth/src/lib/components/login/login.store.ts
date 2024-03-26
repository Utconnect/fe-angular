import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { RedirectService } from '@utconnect/services';
import { Status } from '@utconnect/types';
import { switchMap, tap } from 'rxjs';
import {
  AUTH_ON_LOGIN_SUCCESS_TOKEN,
  AUTH_SERVICE_TOKEN,
} from '../../auth.tokens';
import { LoginRequest } from '../../auth.types';
import { TokenService } from '../../services/token.service';

type LoginState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  // INJECT PROPERTIES
  private readonly authService = inject(AUTH_SERVICE_TOKEN);
  private readonly tokenService = inject(TokenService);
  private readonly onLoginSuccess = inject(AUTH_ON_LOGIN_SUCCESS_TOKEN);
  private readonly redirectService = inject(RedirectService);

  // PROPERTIES
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly login = this.effect<LoginRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((request) =>
        this.authService.login(request).pipe(
          tapResponse(
            ({ data }) => {
              this.tokenService.save(data.token);
              this.redirectService.app();
              this.onLoginSuccess();
            },
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
    super({ status: 'idle', error: null });
  }
}
