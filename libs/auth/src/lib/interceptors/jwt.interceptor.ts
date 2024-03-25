import { Location } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RedirectService } from '@utconnect/services';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // INJECT PROPERTIES
  private readonly location = inject(Location);
  private readonly tokenService = inject(TokenService);
  private readonly redirectService = inject(RedirectService);

  // IMPLEMENTATIONS
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.get() ?? '';
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      tap({
        error: (error) => {
          if (!(error instanceof HttpErrorResponse)) return;

          if (error.status === 401) {
            this.handleUnauthorized(error);
          }
        },
      }),
    );
  }

  private handleUnauthorized(error: HttpErrorResponse): void {
    const token = error.headers.get('Authorization');
    const currentUrl = this.location.path();

    if (token) {
      this.tokenService.save(token);
    } else if (!currentUrl.includes('login')) {
      this.tokenService.clear();
      this.redirectService.login(currentUrl);
    }
  }
}
