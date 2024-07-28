import { InjectionToken } from '@angular/core';
import { StorageService } from '@utconnect/services';
import { Observable } from 'rxjs';
import { IAuthService } from './services';

export const AUTH_TOKEN_STORAGE_SERVICE_TOKEN =
  new InjectionToken<StorageService>('[Auth] Token storage service');

export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>(
  '[Auth] Service',
);

export const AUTH_ROLE_TOKEN = new InjectionToken<Observable<string[]>>(
  '[Auth] Role',
);

export const AUTH_TITLE_TOKEN = new InjectionToken<Observable<string | null>>(
  '[Auth] Title',
);

export const AUTH_LOGIN_URL = new InjectionToken<string>(
  '[Auth] Login Url',
);

export const AUTH_LOGOUT_URL = new InjectionToken<string>(
  '[Auth] Logout Url',
);
