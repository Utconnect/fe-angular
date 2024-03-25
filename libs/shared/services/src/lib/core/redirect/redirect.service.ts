import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  // INJECT PROPERTIES
  private readonly router = inject(Router);

  login(redirect?: string): void {
    if (redirect?.includes('/login')) {
      redirect = '';
    }

    this.router
      .navigate(['/login'], {
        queryParams: { redirect: redirect ?? null },
      })
      .catch(() => null);
  }

  app(redirect?: string | null): void {
    if (redirect) {
      this.router.navigate([redirect]).catch(() => null);
      return;
    }

    this.router.navigate(['/']).catch(() => null);
  }

  permissionDenied(): void {
    this.router.navigate(['/403']).catch(() => null);
  }

  notFound(): void {
    this.router.navigate(['/404']).catch(() => null);
  }
}
