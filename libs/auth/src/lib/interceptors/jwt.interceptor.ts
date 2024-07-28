import { DOCUMENT } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CallbackService } from '@utconnect/services';
import { Observable, tap } from 'rxjs';
import { AUTH_LOGIN_URL } from '../auth.tokens';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // INJECT PROPERTIES
  private readonly document = inject(DOCUMENT);
  private readonly loginUrl = inject(AUTH_LOGIN_URL);
  private readonly callbackService = inject(CallbackService);

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
    const location = this.document.location;
    this.callbackService.setReturnUrl(location.href);
    location.href = this.loginUrl;
  }
}
