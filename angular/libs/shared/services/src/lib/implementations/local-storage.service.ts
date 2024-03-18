import { Injectable } from '@angular/core';
import { StorageService } from '../abstracts/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {
  constructor() {
    super(window.localStorage);
  }
}
