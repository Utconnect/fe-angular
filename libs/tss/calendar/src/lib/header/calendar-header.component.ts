import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
import { CalendarFilter } from '@tss/api';
import { fadeIn } from '@utconnect/animations';
import { DateHelper, ScheduleHelper } from '@utconnect/helpers';
import { ShortenNamePipe } from '@utconnect/pipes';
import { SimpleModel } from '@utconnect/types';
import { combineLatest, delay, map, Observable, takeUntil } from 'rxjs';
import { TssCalendarFilterComponent } from '../filter';
import { CalendarState } from '../store';
import { TssCalendarPageAction } from './../store/calendar.page.actions';
import { TssCalendarSelector } from './../store/calendar.selectors';
import { TssCalendarHeaderNavigateDirective } from './navigate/calendar-header-navigate.directive';

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
  styleUrls: ['./calendar-header.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ShortenNamePipe,
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
  // INPUT
  @Input() scheduleComponent!: ScheduleComponent;

  // VIEWCHILD
  @ViewChild(TssCalendarFilterComponent, { static: false })
  filter!: TssCalendarFilterComponent;

  // PUBLIC PROPERTIES
  readonly viewsButton: ViewButton[] = [
    { view: 'Month', label: 'Tháng' },
    { view: 'Week', label: 'Tuần' },
    { view: 'Day', label: 'Ngày' },
    // { view: 'Agenda', label: 'Lịch biểu' },
  ];
  openSelectMonth = false;
  openFilter = false;
  view$: Observable<View>;
  filter$: Observable<CalendarFilter>;
  month$: Observable<TuiMonth>;
  dateRange$!: Observable<string>;
  activeToday$!: Observable<boolean>;
  activeTeachers$!: Observable<SimpleModel[]>;

  // PRIVATE PROPERTIES
  private selectedDate$: Observable<Date>;

  // CONSTRUCTOR
  constructor(
    private readonly store: Store<CalendarState>,
    private readonly destroy$: TuiDestroyService,
  ) {
    this.selectedDate$ = store
      .select(TssCalendarSelector.selectedDate)
      .pipe(takeUntil(this.destroy$));
    this.filter$ = store
      .select(TssCalendarSelector.filter)
      .pipe(takeUntil(this.destroy$));
    this.month$ = store
      .select(TssCalendarSelector.month)
      .pipe(takeUntil(this.destroy$));
    this.view$ = store
      .select(TssCalendarSelector.view)
      .pipe(takeUntil(this.destroy$));
    this.activeTeachers$ = store
      .select(TssCalendarSelector.activeTeachers)
      .pipe(takeUntil(this.destroy$));
  }

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
