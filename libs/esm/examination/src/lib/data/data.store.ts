import { inject, Injectable } from '@angular/core';
import { EsmSelector, EsmState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ObservableHelper } from '@utconnect/helpers';
import { takeUntil } from 'rxjs';

@Injectable()
export class ExaminationDataStore extends ComponentStore<
  Record<string, never>
> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);

  // PUBLIC PROPERTIES
  readonly examination$ = this.appStore
    .select(EsmSelector.examination)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CONSTRUCTOR
  constructor() {
    super({});
  }
}
