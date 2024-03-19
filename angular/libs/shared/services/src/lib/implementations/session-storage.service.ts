import { Injectable } from '@angular/core';
import { StorageService } from '../abstracts';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService extends StorageService {
  constructor() {
    super(window.sessionStorage);
  }
}
