import { Directive, HostListener, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { TuiDestroyService, TuiMonth } from '@taiga-ui/cdk';
import { TuiAlertService } from '@taiga-ui/core';
import { TssSelector, TssState } from '@tss/store';
import { ScheduleHelper } from '@utconnect/helpers';
import {
  finalize,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CalendarState } from '../../store';
import { TssCalendarPageAction } from '../../store/calendar.page.actions';
import { TssCalendarSelector } from '../../store/calendar.selectors';

@Directive({
  selector: '[tssNavigate]',
  providers: [TuiDestroyService],
  standalone: true,
})
export class TssCalendarHeaderNavigateDirective {
  // INJECTIONS
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(Store<CalendarState>);
  private readonly appStore = inject(Store<TssState>);
  private readonly destroy$ = inject(TuiDestroyService);

  // INPUT
  @Input('tssNavigate') type!: 'prev' | 'next' | 'today';
  @Input() scheduleComponent!: ScheduleComponent;

  // PRIVATE PROPERTIES
  private readonly today$ = new Subject<void>();
  private readonly displayNotification$ = new Subject<void>();
  private canDisplayNotification = true;

  // CONSTRUCTOR
  constructor() {
    this.handleToday();
    this.handleDisplayNotification();
  }

  // HOST LISTENER
  @HostListener('click') onClick(): void {
    switch (this.type) {
      case 'prev':
        this.onPrev();
        break;
      case 'next':
        this.onNext();
        break;
      default:
        this.onToday();
        break;
    }
  }

  // PRIVATE METHODS
  private onPrev(): void {
    this.store.dispatch(
      TssCalendarPageAction.prev({
        oldSelectedDate: this.scheduleComponent.selectedDate,
      }),
    );
  }

  private onNext(): void {
    this.store.dispatch(
      TssCalendarPageAction.next({
        oldSelectedDate: this.scheduleComponent.selectedDate,
      }),
    );
  }

  private onToday(): void {
    this.today$.next();
  }

  private handleToday(): void {
    this.today$
      .pipe(
        withLatestFrom(
          this.store.select(TssCalendarSelector.view),
          this.store.select(TssCalendarSelector.filter),
        ),
        tap(({ 1: view, 2: filter }) => {
          const today = new Date();

          if (
            !ScheduleHelper.dayInCurrentView(
              this.scheduleComponent,
              view,
              today,
            )
          ) {
            this.scheduleComponent.selectedDate = today;
            this.store.dispatch(
              TssCalendarPageAction.changeMonth({
                month: new TuiMonth(today.getFullYear(), today.getMonth()),
              }),
            );
          }

          if (this.canDisplayNotification && !filter.showDepartmentSchedule) {
            this.displayNotification$.next();
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleDisplayNotification(): void {
    this.displayNotification$
      .pipe(
        withLatestFrom(this.appStore.select(TssSelector.nameTitle)),
        switchMap(({ 1: nameTitle }) => {
          this.canDisplayNotification = false;
          const schedule = this.scheduleComponent;
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth();
          const date = now.getDate();
          const eventsCount = schedule.getEvents(
            new Date(year, month, date),
            new Date(year, month, date, 23, 59, 59, 999),
          ).length;
          const content =
            eventsCount === 0
              ? `${nameTitle} hãy tận hưởng thời gian nghỉ ngơi!`
              : `Chúc ${nameTitle.toLowerCase()} có ngày làm việc hiệu quả!`;
          const label =
            eventsCount === 0
              ? `${nameTitle} không có sự kiện nào trong hôm nay`
              : `${nameTitle} có ${eventsCount} sự kiện vào hôm nay`;

          return this.alertService
            .open(content, { label, autoClose: 6000 })
            .pipe(finalize(() => (this.canDisplayNotification = true)));
        }),
      )
      .subscribe();
  }
}
