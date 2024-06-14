import { Injectable, TemplateRef } from '@angular/core';
import { Nullable } from '@utconnect/types';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TopBarService {
  // PROPERTIES
  private readonly _rightMenu$ = new BehaviorSubject<
    Nullable<TemplateRef<never>>
  >(null);
  readonly rightMenu$ = this._rightMenu$.asObservable();

  // PUBLIC METHODS
  addRightMenu(data: TemplateRef<never>): void {
    this._rightMenu$.next(data);
  }

  removeRightMenu(): void {
    this._rightMenu$.next(null);
  }
}
