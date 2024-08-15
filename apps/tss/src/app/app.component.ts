import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TssPageAction, TssSelector, TssState } from '@tss/store';
import { concatMap, delayWhen, interval, of, takeUntil } from 'rxjs';

@Component({
  selector: 'tss-root',
  templateUrl: './app.component.html',
  providers: [TuiDestroyService],
})
export class AppComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly tssStore = inject(Store<TssState>);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly user$ = this.tssStore.pipe(
    TssSelector.notNullTeacher,
    takeUntil(this.destroy$),
  );

  // PUBLIC PROPERTIES
  showLoader$ = this.tssStore
    .select(TssSelector.showLoader)
    .pipe(
      concatMap((x) =>
        of(x).pipe(delayWhen((x) => (x ? of(null) : interval(500)))),
      ),
    );

  // LIFECYCLE
  ngOnInit(): void {
    this.tssStore.dispatch(TssPageAction.getUserInfo());
  }
}
