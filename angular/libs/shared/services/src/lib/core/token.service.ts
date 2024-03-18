import { Inject, Injectable } from '@angular/core';
import { STORAGE_ACCESS_TOKEN_KEY } from '../constants';
import { StorageService } from '../abstracts/storage.service';
import { TOKEN_STORAGE_SERVICE_TOKEN } from '../tokens';

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_STORAGE_SERVICE_TOKEN)
    private readonly storageService: StorageService
  ) {}

  // PUBLIC METHODS
  get(): string | null {
    return this.storageService.getItem(STORAGE_ACCESS_TOKEN_KEY);
  }

  save(token: string): void {
    this.storageService.setItem(STORAGE_ACCESS_TOKEN_KEY, token);
  }

  clear(): void {
    this.storageService.removeItem(STORAGE_ACCESS_TOKEN_KEY);
  }
}
