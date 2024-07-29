import { inject, Injectable } from '@angular/core';
import {
  STORAGE_ACCESS_TOKEN_KEY,
  STORAGE_EXPIRES_IN_KEY,
  STORAGE_REFRESH_TOKEN_KEY,
  STORAGE_TOKEN_TYPE_KEY,
} from '../auth.constants';
import { AUTH_TOKEN_STORAGE_SERVICE_TOKEN } from '../auth.tokens';

@Injectable()
export class JwtService {
  private readonly storage = inject(AUTH_TOKEN_STORAGE_SERVICE_TOKEN);

  setJwt({
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
  }: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
  }): void {
    this.storage.setItem(STORAGE_ACCESS_TOKEN_KEY, accessToken);
    this.storage.setItem(STORAGE_TOKEN_TYPE_KEY, tokenType);
    this.storage.setItem(STORAGE_REFRESH_TOKEN_KEY, expiresIn.toString());
    this.storage.setItem(STORAGE_EXPIRES_IN_KEY, refreshToken);
  }

  clear(): void {
    this.storage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
    this.storage.removeItem(STORAGE_TOKEN_TYPE_KEY);
    this.storage.removeItem(STORAGE_REFRESH_TOKEN_KEY);
    this.storage.removeItem(STORAGE_EXPIRES_IN_KEY);
  }
}
