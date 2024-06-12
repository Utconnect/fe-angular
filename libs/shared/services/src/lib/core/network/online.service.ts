import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  // PRIVATE PROPERTIES
  private _online = false;
  private _online$!: Observable<boolean>;

  get online(): boolean {
    return this._online;
  }

  get online$(): Observable<boolean> {
    return this._online$;
  }

  // CONSTRUCTOR
  constructor() {
    this.checkNetworkStatus();
  }

  checkNetworkStatus(): void {
    this._online = navigator.onLine;
    this._online$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline'),
    ).pipe(map(() => navigator.onLine));
  }
}
