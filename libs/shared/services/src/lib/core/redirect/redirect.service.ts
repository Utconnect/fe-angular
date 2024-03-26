import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  // INJECT PROPERTIES
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly navigateAppRequest$ = new Subject<void>();

  constructor() {
    this.navigateAppRequest$
      .pipe(withLatestFrom(this.route.queryParams))
      .subscribe(({ 1: params }) => this.handleNavigateApp(params['redirect']));
  }

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

  app(): void {
    this.navigateAppRequest$.next();
  }

  private handleNavigateApp(redirect?: string): void {
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
