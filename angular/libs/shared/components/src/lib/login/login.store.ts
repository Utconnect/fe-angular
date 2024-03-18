import { Inject, inject, Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  AUTH_SERVICE_TOKEN,
  LoginRequest,
  TokenService,
} from '@utconnect/services';
import { Status } from '@utconnect/types';
import { switchMap, tap } from 'rxjs';
import { ON_LOGIN_SUCCESS_TOKEN } from './login.tokens';
import { OnLoginSuccessType } from './login.types';

type LoginState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly authService = inject(AUTH_SERVICE_TOKEN);
  private readonly tokenService = inject(TokenService);

  // PROPERTIES
  readonly status$ = this.select(s => s.status);

  // EFFECTS
  readonly login = this.effect<LoginRequest>(params$ =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap(request =>
        this.authService.login(request).pipe(
          tapResponse(
            ({ data }) => {
              this.tokenService.save(data.token);
              // TODO
              // this.appStore.dispatch(AppPageAction.getUserInfo());
              this.router
                .navigate([''])
                .then(() => this.onLoginSuccess?.())
                .catch(error =>
                  this.patchState({
                    status: 'error',
                    error: error as string,
                  })
                );
            },
            error =>
              this.patchState({
                status: 'error',
                error: error as string,
              })
          )
        )
      )
    )
  );

  // CONSTRUCTOR
  constructor(
    @Optional()
    @Inject(ON_LOGIN_SUCCESS_TOKEN)
    private readonly onLoginSuccess?: OnLoginSuccessType
  ) {
    super({ status: 'idle', error: null });
  }
}
