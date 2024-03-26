import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AUTH_ROLE_TOKEN } from '../auth.tokens';

export const permissionGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const roles$ = inject(AUTH_ROLE_TOKEN);
  const acceptRoles = route.data['roles'] as string[] | undefined;

  if (!acceptRoles || acceptRoles.length === 0) {
    return true;
  }

  return roles$.pipe(
    map((roles) => {
      if (roles.find((role) => acceptRoles.includes(role))) {
        return true;
      }

      const redirect = route.data['redirect'] as string;
      router.navigate([redirect ?? '/403']).catch(() => false);

      return false;
    }),
  );
};
