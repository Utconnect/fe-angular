import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LocalStorageService,
  SessionStorageService,
} from '@utconnect/services';
import { Observable, of } from 'rxjs';
import {
  AUTH_ON_LOGIN_SUCCESS_TOKEN,
  AUTH_ROLE_TOKEN,
  AUTH_SERVICE_TOKEN,
  AUTH_TITLE_TOKEN,
  AUTH_TOKEN_STORAGE_SERVICE_TOKEN,
} from './auth.tokens';
import { JwtInterceptor } from './interceptors';
import { IAuthService } from './services';

export type AuthConfigOptions<
  S extends IAuthService,
  I extends HttpInterceptor,
  T extends Store,
> = {
  authService?: Type<S>;
  authInterceptor?: Type<I>;
  onLoginSuccess: (store: T) => () => void;
  role: (store: T) => Observable<string[]>;
  storage: 'localStorage' | 'sessionStorage';
  store: Type<T>;
  title?: (store: T) => Observable<string | null>;
};

export const authProviders = <
  S extends IAuthService,
  I extends HttpInterceptor,
  T extends Store,
>({
  authService,
  authInterceptor,
  onLoginSuccess,
  role,
  storage,
  store,
  title,
}: AuthConfigOptions<S, I, T>): Provider => [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: authInterceptor ?? JwtInterceptor,
    multi: true,
  },
  {
    provide: AUTH_TOKEN_STORAGE_SERVICE_TOKEN,
    useClass:
      storage === 'localStorage' ? LocalStorageService : SessionStorageService,
  },
  {
    provide: AUTH_ON_LOGIN_SUCCESS_TOKEN,
    useFactory: onLoginSuccess,
    deps: [store],
  },
  {
    provide: AUTH_SERVICE_TOKEN,
    useClass: authService,
  },
  {
    provide: AUTH_ROLE_TOKEN,
    useFactory: role,
    deps: [store],
  },
  {
    provide: AUTH_TITLE_TOKEN,
    useFactory: title ?? ((): Observable<null> => of(null)),
    deps: [store],
  },
];
