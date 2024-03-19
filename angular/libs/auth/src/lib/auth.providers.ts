import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { Provider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LocalStorageService,
  SessionStorageService,
} from '@utconnect/services';
import { Observable } from 'rxjs';
import {
  AUTH_SERVICE_TOKEN,
  PERMISSION_GUARD_ROLE_TOKEN,
  TOKEN_STORAGE_SERVICE_TOKEN,
} from './auth.tokens';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthService, TokenService } from './services';

export type AuthConfigOptions<
  S extends AuthService,
  I extends HttpInterceptor,
  T extends Store,
> = {
  authService: Type<S>;
  storage: 'localStorage' | 'sessionStorage';
  authInterceptor?: Type<I>;
  guard: {
    role: (store: T) => Observable<string[]>;
    store: Type<T>;
  };
};

export const authServiceProviders = <
  S extends AuthService,
  I extends HttpInterceptor,
  T extends Store,
>({
  authService,
  storage,
  authInterceptor,
  guard,
}: AuthConfigOptions<S, I, T>): Provider => [
  TokenService,
  {
    provide: TOKEN_STORAGE_SERVICE_TOKEN,
    useClass:
      storage === 'localStorage' ? LocalStorageService : SessionStorageService,
  },
  {
    provide: AUTH_SERVICE_TOKEN,
    useClass: authService,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: authInterceptor ?? JwtInterceptor,
    multi: true,
  },
  {
    provide: PERMISSION_GUARD_ROLE_TOKEN,
    useFactory: guard.role,
    deps: [guard.store],
  },
];
