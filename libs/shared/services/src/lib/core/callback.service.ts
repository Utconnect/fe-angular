import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { AUTH_TOKEN_STORAGE_SERVICE_TOKEN } from '@auth';

@Injectable()
export class CallbackService {
  // INJECTIONS
  private readonly document = inject(DOCUMENT);
  private readonly storageService = inject(AUTH_TOKEN_STORAGE_SERVICE_TOKEN);

  // PRIVATE PROPERTIES
  private readonly CALLBACK_URL_KEY = 'callback-url';

  setReturnUrl(url: string): void {
    this.storageService.setItem(this.CALLBACK_URL_KEY, url);
  }

  navigate(): void {
    const callbackUrl =
      this.storageService.getItem(this.CALLBACK_URL_KEY) ?? '/';
    this.clear();
    this.document.location.href = callbackUrl;
  }

  private clear(): void {
    this.storageService.removeItem(this.CALLBACK_URL_KEY);
  }
}
