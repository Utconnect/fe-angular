import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TssSelector, TssState } from '@tss/store';
import { concatMap, delayWhen, interval, of } from 'rxjs';

@Component({
  selector: 'tss-root',
  templateUrl: './app.component.html',
  providers: [TuiDestroyService],
})
export class AppComponent {
  // INJECT PROPERTIES
  private readonly esmStore = inject(Store<TssState>);

// PUBLIC PROPERTIES
  showLoader$ = this.esmStore
    .select(TssSelector.showLoader)
    .pipe(
      concatMap((x) =>
        of(x).pipe(delayWhen((x) => (x ? of(null) : interval(500)))),
      ),
    );
}
