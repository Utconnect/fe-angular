import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ScheduleComponent, View } from '@syncfusion/ej2-angular-schedule';
import { TuiDestroyService, TuiMonth } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { TuiCalendarMonthModule } from '@taiga-ui/kit';
import { fadeIn } from '@utconnect/animations';
import { TouchScreenDirective } from '@utconnect/directives';
import { DateHelper, ScheduleHelper } from '@utconnect/helpers';
import { ShortenNamePipe } from '@utconnect/pipes';
import { combineLatest, delay, map, Observable, takeUntil } from 'rxjs';
import { TssCalendarFilterComponent } from '../filter';
import { CalendarState } from '../store';
import { TssCalendarPageAction } from '../store';
import { TssCalendarSelector } from '../store';
import { TssCalendarHeaderNavigateDirective } from './navigate';

const NGRX = [LetModule];
const TAIGA_UI = [
  TuiButtonModule,
  TuiCalendarMonthModule,
  TuiHostedDropdownModule,
];

type ViewButton = {
  view: View;
  label: string;
};

@Component({
  selector: 'tss-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ShortenNamePipe,
    TouchScreenDirective,
    TssCalendarHeaderNavigateDirective,
    TssCalendarFilterComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  animations: [fadeIn],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'flat',
      size: 'xs',
    }),
  ],
})
export class TssCalendarHeaderComponent implements AfterViewInit {
  // INJECTIONS
  private readonly store = inject(Store<CalendarState>);
  private readonly destroy$ = inject(TuiDestroyService);

  // INPUT
  @Input() scheduleComponent!: ScheduleComponent;

  // VIEW CHILD
  @ViewChild(TssCalendarFilterComponent, { static: false })
  filter!: TssCalendarFilterComponent;

  // PUBLIC PROPERTIES
  readonly viewsButton: ViewButton[] = [
    { view: 'Month', label: 'Tháng' },
    { view: 'Week', label: 'Tuần' },
    { view: 'Day', label: 'Ngày' },
  ];
  openSelectMonth = false;
  openFilter = false;

  view$ = this.store
    .select(TssCalendarSelector.view)
    .pipe(takeUntil(this.destroy$));
  filter$ = this.store
    .select(TssCalendarSelector.filter)
    .pipe(takeUntil(this.destroy$));
  month$ = this.store
    .select(TssCalendarSelector.month)
    .pipe(takeUntil(this.destroy$));
  activeTeachers$ = this.store
    .select(TssCalendarSelector.activeTeachers)
    .pipe(takeUntil(this.destroy$));

  dateRange$!: Observable<string>;
  activeToday$!: Observable<boolean>;

  // PRIVATE PROPERTIES
  private selectedDate$ = this.store
    .select(TssCalendarSelector.selectedDate)
    .pipe(takeUntil(this.destroy$));

  // LIFECYCLE
  ngAfterViewInit(): void {
    this.triggerDateRange();
    this.triggerActiveToday();
  }

  // PUBLIC METHODS
  onSelectMonth(month: TuiMonth): void {
    this.openSelectMonth = false;
    this.store.dispatch(TssCalendarPageAction.changeMonth({ month }));
  }

  onFilterOpenChange(open: boolean): void {
    if (!open) {
      this.store.dispatch(TssCalendarPageAction.resetFilter());
    }
  }

  onClickViewButton(view: View): void {
    this.store.dispatch(TssCalendarPageAction.changeView({ view }));
  }

  onFilter(): void {
    this.openFilter = false;
  }

  // PRIVATE METHODS
  private triggerDateRange(): void {
    this.dateRange$ = combineLatest([this.view$, this.selectedDate$]).pipe(
      map(([view]) => view),
      delay(0),
      map((view) => {
        switch (view) {
          case 'Month':
            return this.monthDateRange();
          case 'Week':
            return this.weekDateRange();
          case 'Day':
            return this.dayDateRange();
        }
        return '';
      }),
      takeUntil(this.destroy$),
    );
  }

  private triggerActiveToday(): void {
    this.activeToday$ = combineLatest([this.selectedDate$, this.view$]).pipe(
      delay(0),
      map(({ 1: view }) =>
        ScheduleHelper.dayInCurrentView(this.scheduleComponent, view),
      ),
    );
  }

  private monthDateRange(): string {
    const date = this.scheduleComponent.selectedDate;
    return `Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
  }

  private weekDateRange(): string {
    const currentViewDates = this.scheduleComponent.getCurrentViewDates();
    const first = currentViewDates[0];
    const last = currentViewDates[6];
    const beautify = DateHelper.beautifyDay;

    const beautifyFirst = beautify(first.getDate());
    const beautifyLast = beautify(last.getDate());
    const firstMonth = first.getMonth() + 1;
    const lastMonth = last.getMonth() + 1;
    const firstYear = first.getFullYear();
    const lastYear = last.getFullYear();

    if (firstMonth == lastMonth) {
      return `${beautifyFirst} - ${beautifyLast}
      Tháng ${firstMonth}, ${firstYear}`;
    } else if (firstYear == lastYear) {
      return `${beautifyFirst} Tháng ${firstMonth} -
      ${beautifyLast} Tháng ${lastMonth}, ${firstYear}`;
    } else {
      return `${beautifyFirst} Tháng ${firstMonth}, ${firstYear} -
      ${beautifyLast} Tháng ${lastMonth}, ${lastYear}`;
    }
  }

  private dayDateRange(): string {
    const date = this.scheduleComponent.selectedDate;
    return `${date.getDate()} Tháng ${
      date.getMonth() + 1
    }, ${date.getFullYear()}`;
  }
}
