import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ScheduleComponent, View } from '@syncfusion/ej2-angular-schedule';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import {
  TuiActiveZoneModule,
  TuiContextWithImplicit,
  TuiDestroyService,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { Observable, takeUntil } from 'rxjs';
import { TssCalendarFilterComponent } from '../filter';
import { TssCalendarHeaderNavigateDirective } from '../header/navigate';
import {
  CalendarState,
  TssCalendarPageAction,
  TssCalendarSelector,
} from '../store';

const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiDataListModule,
  TuiButtonModule,
  TuiSelectModule,
  TuiSidebarModule,
  TuiTextfieldControllerModule,
];

type ViewItem = {
  id: View;
  name: string;
};

@Component({
  selector: 'tss-calendar-mobile-menu',
  templateUrl: './calendar-menu.component.html',
  styleUrls: ['./calendar-menu.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    TssCalendarFilterComponent,
    TssCalendarHeaderNavigateDirective,
    ...TAIGA_UI,
  ],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'icon',
      size: 'm',
    }),
  ],
})
export class TssCalendarMobileMenuComponent {
  // INPUT
  @Input() scheduleComponent!: ScheduleComponent;

  // PUBLIC PROPERTIES
  readonly view$: Observable<View>;
  readonly viewList: ViewItem[] = [
    { id: 'Month', name: 'Tháng' },
    { id: 'Week', name: 'Tuần' },
    { id: 'Day', name: 'Ngày' },
  ];
  openRightMenu = false;

  // CONSTRUCTOR
  constructor(
    private readonly store: Store<CalendarState>,
    private readonly destroy$: TuiDestroyService,
  ) {
    this.view$ = store
      .select(TssCalendarSelector.view)
      .pipe(takeUntil(this.destroy$));
  }

  // PUBLIC METHODS
  @tuiPure
  stringifyView(): TuiStringHandler<TuiContextWithImplicit<View>> {
    const map = new Map(
      this.viewList.map(({ id, name }) => [id, name] as [View, string]),
    );

    return ({ $implicit }) => map.get($implicit) || '';
  }

  toggleRightMenu(open: boolean): void {
    this.openRightMenu = open;
  }

  onSelectView(view: View): void {
    this.store.dispatch(TssCalendarPageAction.changeView({ view }));
  }

  onFilter(): void {
    this.openRightMenu = false;
  }
}
