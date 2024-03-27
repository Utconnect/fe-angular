import { inject, Injectable } from '@angular/core';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

@Injectable()
export class DataFacultyStore extends ComponentStore<Record<string, never>> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);

  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore
    .select(EsmSelector.faculties)
    .pipe(takeUntil(this.destroy$));
  readonly status$ = this.appStore
    .select(EsmSelector.departmentsStatus)
    .pipe(takeUntil(this.destroy$));

  // CONSTRUCTOR
  constructor() {
    super({});
  }

  // PUBLIC METHODS
  load(): void {
    this.appStore.dispatch(EsmPageAction.getDepartments());
  }
}
