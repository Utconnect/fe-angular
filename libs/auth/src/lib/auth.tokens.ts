import { InjectionToken } from '@angular/core';
import { StorageService } from '@utconnect/services';
import { Observable } from 'rxjs';
import { IAuthService } from './services/auth.service';

export const AUTH_TOKEN_STORAGE_SERVICE_TOKEN =
  new InjectionToken<StorageService>('[Auth] Token storage service');

export const AUTH_ON_LOGIN_SUCCESS_TOKEN = new InjectionToken<() => void>(
  '[Auth] On success',
);

export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>(
  '[Auth] Service',
);

export const AUTH_ROLE_TOKEN = new InjectionToken<Observable<string[]>>(
  '[Auth] Role',
);

export const AUTH_TITLE_TOKEN = new InjectionToken<Observable<string | null>>(
  '[Auth] title',
);
