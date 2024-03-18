import { Component, inject } from '@angular/core';
import { EsmSelector, EsmState } from '@esm/store';
import { Store } from '@ngrx/store';
import { concatMap, delayWhen, interval, of } from 'rxjs';

@Component({
  selector: 'angular-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);

  // PUBLIC PROPERTIES
  showLoader$ = this.appStore
    .select(EsmSelector.showLoader)
    .pipe(
      concatMap(x => of(x).pipe(delayWhen(x => (x ? of(null) : interval(500)))))
    );
}
