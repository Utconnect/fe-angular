import { inject, Injectable } from '@angular/core';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Injectable()
export class EsmTopBarCreateButtonStore extends ComponentStore<
  Record<string, never>
> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);

  // GLOBAL SELECTORS
  private readonly roles$ = this.appStore.select(EsmSelector.roles);

  // CUSTOM SELECTORS
  readonly isInvigilator$ = this.roles$.pipe(
    map((r) => r.includes('ExaminationDepartmentHead')),
  );

  // CONSTRUCTOR
  constructor() {
    super({});
  }
}
