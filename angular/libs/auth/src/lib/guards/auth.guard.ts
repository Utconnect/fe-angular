import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RedirectService, } from '@utconnect/services';
import { TokenService } from '../services';

export const authGuard: CanActivateFn = (_, state) => {
  const tokenService = inject(TokenService);
  const redirectService = inject(RedirectService);

  const path = state.url;
  const isLoginPath = path.includes('login');
  const hasAccessToken = !!tokenService.get();

  if (!hasAccessToken) {
    if (isLoginPath) {
      return true;
    }

    redirectService.login(path);
    return false;
  }

  // If we have access token
  if (!isLoginPath) {
    return true;
  }

  redirectService.app();
  return false;
};
