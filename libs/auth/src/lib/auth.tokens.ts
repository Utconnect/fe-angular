import { InjectionToken } from '@angular/core';
import { StorageService } from '@utconnect/services';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

export const TOKEN_STORAGE_SERVICE_TOKEN = new InjectionToken<StorageService>(
  'Token storage service',
);

export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>(
  'Auth service',
);

export const PERMISSION_GUARD_ROLE_TOKEN = new InjectionToken<
  Observable<string[]>
>('Permission guard role');
