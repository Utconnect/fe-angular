import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // INJECT PROPERTIES
  private readonly router = inject(Router);

  // IMPLEMENTATIONS
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap({
        error: (error) => {
          if (!(error instanceof HttpErrorResponse)) return;

          if (error.status === 401) {
            this.handleUnauthorized();
          }
        },
      }),
    );
  }

  private handleUnauthorized(): void {
    this.router.navigate(['https://localhost:7167/Identity/Account/Login']);
  }
}
