import { Component, inject, OnInit } from '@angular/core';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { concatMap, delayWhen, interval, of, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'tss-root',
  templateUrl: './app.component.html',
  providers: [TuiDestroyService],
})
export class AppComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly esmStore = inject(Store<EsmState>);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly user$ = this.esmStore.pipe(
    EsmSelector.notNullUser,
    takeUntil(this.destroy$),
  );

  // PUBLIC PROPERTIES
  showLoader$ = this.esmStore
    .select(EsmSelector.showLoader)
    .pipe(
      concatMap((x) =>
        of(x).pipe(delayWhen((x) => (x ? of(null) : interval(500)))),
      ),
    );

  // LIFECYCLE
  ngOnInit(): void {
    this.triggerGetRelatedExaminations();
    this.esmStore.dispatch(EsmPageAction.getUserInfo());
  }

  // PRIVATE METHODS
  private triggerGetRelatedExaminations(): void {
    this.user$
      .pipe(
        tap(() => {
          this.esmStore.dispatch(EsmPageAction.getRelatedExaminations());
          this.esmStore.dispatch(EsmPageAction.getDepartments());
        }),
      )
      .subscribe();
  }
}
