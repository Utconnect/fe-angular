import { InjectionToken, Provider } from '@angular/core';
import { AuthService, StorageService } from './abstracts';
import { TokenService } from './core';
import { LocalStorageService, SessionStorageService } from './implementations';
import { AuthConfigOptions } from './types';

export const TOKEN_STORAGE_SERVICE_TOKEN = new InjectionToken<StorageService>(
  'Token storage service'
);

export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>(
  'Auth service'
);

export const authServiceProvider = <T extends AuthService>({
  authService,
  storage,
}: AuthConfigOptions<T>): Provider => [
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
];
