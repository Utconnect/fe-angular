import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { Provider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LocalStorageService,
  SessionStorageService,
} from '@utconnect/services';
import { Observable, of } from 'rxjs';
import {
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_ROLE_TOKEN,
  AUTH_SERVICE_TOKEN,
  AUTH_TITLE_TOKEN,
  AUTH_TOKEN_STORAGE_SERVICE_TOKEN,
} from './auth.tokens';
import { JwtInterceptor } from './interceptors';
import { IAuthService, JwtService } from './services';

export type AuthConfigOptions<
  S extends IAuthService,
  I extends HttpInterceptor,
  T extends Store,
> = {
  authService?: Type<S>;
  authInterceptor?: Type<I>;
  role: (store: T) => Observable<string[]>;
  storage: 'localStorage' | 'sessionStorage';
  store: Type<T>;
  title?: (store: T) => Observable<string | null>;
  loginUrl: () => string;
  logoutUrl: () => string;
};

export const authProviders = <
  S extends IAuthService,
  I extends HttpInterceptor,
  T extends Store,
>({
  authService,
  authInterceptor,
  role,
  storage,
  store,
  title,
  loginUrl,
  logoutUrl,
}: AuthConfigOptions<S, I, T>): Provider => [
  JwtService,
  LocalStorageService,
  SessionStorageService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: authInterceptor ?? JwtInterceptor,
    multi: true,
  },
  {
    provide: AUTH_TOKEN_STORAGE_SERVICE_TOKEN,
    useFactory: () =>
      storage === 'localStorage' ? LocalStorageService : SessionStorageService,
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
  {
    provide: AUTH_LOGIN_URL,
    useFactory: loginUrl,
  },
  {
    provide: AUTH_LOGOUT_URL,
    useFactory: logoutUrl,
  },
];
