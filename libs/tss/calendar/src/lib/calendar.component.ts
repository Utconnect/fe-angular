import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import {
  AgendaService,
  DayService,
  EventRenderedArgs,
  EventSettingsModel,
  MonthService,
  NavigatingEventArgs,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  ScheduleComponent,
  ScheduleModule,
  WeekService,
} from '@syncfusion/ej2-angular-schedule';
import { Predicate, Query } from '@syncfusion/ej2-data';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiDialogService,
  TuiNotification,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { GoogleService } from '@tss/api';
import {
  TssExamDialogComponent,
  TssGoogleEventDialogComponent,
  TssTeachingDialogComponent,
} from '@tss/dialog';
import { ChangeStatusHelper } from '@tss/helpers';
import { TssSelector, TssState } from '@tss/store';
import { TopBarService } from '@utconnect/components';
import {
  DateHelper,
  DeviceHelper,
  ObservableHelper,
  ScheduleHelper,
} from '@utconnect/helpers';
import { DialogService } from '@utconnect/services';
import {
  EjsScheduleModel,
  FixedScheduleModel,
  GoogleCalendarEvent,
  GoogleCalendarModel,
} from '@utconnect/types';
import { last } from 'lodash';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  filter,
  map,
  skip,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { TssCalendarHeaderComponent } from './header';
import { TssCalendarMobileMenuComponent } from './mobile-menu';
import { TssCalendarQuickInfoContentComponent } from './quick-info-content';
import { TssCalendarQuickInfoHeaderComponent } from './quick-info-header';
import {
  CalendarState,
  TssCalendarPageAction,
  TssCalendarSelector,
} from './store';

@Component({
  selector: 'tss-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TuiDestroyService,
    WeekService,
    MonthService,
    DayService,
    AgendaService,
    TopBarService,
  ],
  imports: [
    CommonModule,
    ScheduleModule,
    TssCalendarHeaderComponent,
    TssCalendarQuickInfoHeaderComponent,
    TssCalendarQuickInfoContentComponent,
    TssCalendarMobileMenuComponent,
    LetModule,
  ],
})
export class TssCalendarComponent implements OnInit, AfterViewInit {
  // INJECTIONS
  private readonly injector = inject(Injector);
  private readonly tuiDialogService = inject(TuiDialogService);
  private readonly googleService = inject(GoogleService);
  private readonly tssDialogService = inject(DialogService);
  private readonly alertService = inject(TuiAlertService);
  private readonly topBarService = inject(TopBarService);
  private readonly store = inject(Store<CalendarState>);
  private readonly appStore = inject(Store<TssState>);
  // private readonly sidebarStore = inject(Store<SidebarState>);
  private readonly destroy$ = inject(TuiDestroyService);

  // VIEW CHILD
  @ViewChild('schedule') scheduleComponent!: ScheduleComponent;
  @ViewChild('rightMenu') rightMenuTemplate!: TemplateRef<never>;

  // PUBLIC PROPERTIES
  readonly eventSettings$ = new BehaviorSubject<EventSettingsModel>({});
  readonly dataSource$ = new BehaviorSubject<Record<string, any>[]>([]);
  readonly remove$ = new Subject<GoogleCalendarModel>();

  // PRIVATE PROPERTIES
  private readonly staticSettings: EventSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: false,
  };
  private readonly teacher$ = this.appStore.pipe(TssSelector.notNullTeacher);
  private readonly nameTitle$ = this.appStore.select(TssSelector.nameTitle);
  private calendars: Record<string, boolean> = {};

  // CONSTRUCTOR
  constructor() {
    this.store.dispatch(TssCalendarPageAction.reset());
    this.handleLoadSchedule();
    this.handleChangeData();
    this.handleSidebarAddItem();
    this.handleRemove();
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.store.dispatch(TssCalendarPageAction.load({ date: new Date() }));
  }

  ngAfterViewInit(): void {
    this.handleSelectedDateChanges();
    this.handleChangeView();
    this.handleChangeStatus();
    this.topBarService.addRightMenu(this.rightMenuTemplate);
  }

  // PUBLIC METHODS
  onRenderCell(args: RenderCellEventArgs): void {
    if (args.element.classList.contains('e-work-cells')) {
      if (args.date && DateHelper.sameDay(args.date, new Date())) {
        args.element.classList.add('today');
      }
    }
    // Disable date navigate when click date header in month view
    if (args.elementType === 'monthCells') {
      args.element.children[0].classList.remove('e-navigate');
    }
  }

  onEventRendered(args: EventRenderedArgs): void {
    switch (args.data['Type']) {
      case 'exam':
        args.element.style.backgroundColor = '#ff0000';
        break;
    }
    if (args.data['Color']) {
      args.element.style.backgroundColor = args.data['Color'] as string;
    }
    if ((args.data['FixedSchedules'] as FixedScheduleModel[])?.length > 0) {
      const lastFixedSchedule = last(
        args.data['FixedSchedules'],
      ) as FixedScheduleModel | null;
      if (lastFixedSchedule) {
        if (ChangeStatusHelper.isPending(lastFixedSchedule.status)) {
          args.element.classList.add('requesting-change');
        } else if (
          lastFixedSchedule.newDate !== null ||
          !lastFixedSchedule.intendTime
        ) {
          args.element.classList.add('changed');
        }
      }
    }
  }

  onCreated(): void {
    // const popup = document.querySelector(
    //   '.e-quick-popup-wrapper'
    // ) as EJ2Instance;
    // if (!popup) return;

    // const popupInstance = popup.ej2_instances[0] as Popup;
    // popupInstance.open = () => {
    //   popupInstance.refreshPosition();
    // };

    this.handleSidebarCheckboxChange();
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      args.cancel = true;
      this.onShowEditorDialog(args.data as EjsScheduleModel);
    }
  }

  onNavigating(args: NavigatingEventArgs): void {
    if (!DeviceHelper.isTouchDevice()) {
      return;
    }

    if (args.action === 'date') {
      const { currentDate, previousDate } = args;
      if (currentDate && previousDate) {
        if (currentDate < previousDate) {
          this.store.dispatch(
            TssCalendarPageAction.prev({
              oldSelectedDate: this.scheduleComponent.selectedDate,
            }),
          );
        } else if (currentDate > previousDate) {
          this.store.dispatch(
            TssCalendarPageAction.next({
              oldSelectedDate: this.scheduleComponent.selectedDate,
            }),
          );
        }
      }
    }
  }

  onShowEditorDialog(data: EjsScheduleModel): void {
    switch (data.Type) {
      case 'exam':
        this.showExamEditorDialog(data);
        break;
      case 'study':
        this.showStudyEditorDialog(data);
        break;
      case 'googleEvent':
        this.showGoogleEventEditorDialog(data);
        break;
    }
    this.onCloseEditorDialog();
  }

  onCloseEditorDialog(): void {
    this.scheduleComponent.closeQuickInfoPopup();
  }

  // PRIVATE METHODS
  private handleLoadSchedule(): void {
    this.store
      .select(TssCalendarSelector.filteredSchedule)
      .pipe(
        map((schedules) => schedules.map((x) => x.toEjsSchedule())),
        tap((dataSource) => {
          // Only update schedule, not Google events
          this.dataSource$.next([
            ...((this.dataSource$.value || []) as EjsScheduleModel[]).filter(
              ({ Type }) => Type === 'googleEvent',
            ),
            ...dataSource,
          ]);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
    this.store
      .select(TssCalendarSelector.googleCalendarEvents)
      .pipe(
        map((events) =>
          events.map((x) => GoogleCalendarEvent.parse(x).toEjsSchedule()),
        ),
        tap((dataSource) => {
          // TODO: Bug
          // console.log(dataSource);
          // Only update Google events
          this.dataSource$.next([
            ...((this.dataSource$.value || []) as EjsScheduleModel[]).filter(
              ({ Type }) => Type !== 'googleEvent',
            ),
            ...dataSource,
          ]);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleChangeData(): void {
    this.dataSource$
      .pipe(
        tap((dataSource) =>
          this.eventSettings$.next({
            ...this.staticSettings,
            dataSource,
          }),
        ),
      )
      .subscribe();
  }

  private handleSidebarAddItem(): void {
    this.store
      .pipe(
        TssSelector.sidebarListen('calendar.create'),
        tap((events) => {
          events.forEach((e) => {
            if (!this.calendars[e]) {
              this.calendars[e] = true;
            }
          });
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleSidebarCheckboxChange(): void {
    this.store
      .select(TssSelector.sidebarEvent)
      .pipe(
        ObservableHelper.filterNullish(),
        filter(({ name }) => name !== 'calendar.create'),
        tap(({ name, value }) => {
          // https://ej2.syncfusion.com/angular/documentation/schedule/appointments/#appointment-filtering
          this.calendars[name] = value as boolean;
          let predicate: Predicate | undefined;
          for (const [key, checked] of Object.entries(this.calendars)) {
            if (checked) {
              //    key         : calendar.study
              // => compareValue: study
              const compareValue = key.substring('calendar.'.length);
              if (predicate) {
                predicate = predicate.or('Type', 'equal', compareValue);
              } else {
                predicate = new Predicate('Type', 'equal', compareValue);
              }
            }
          }
          this.scheduleComponent.eventSettings.query = predicate
            ? new Query().where(predicate)
            : new Query();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleSelectedDateChanges(): void {
    this.store
      .select(TssCalendarSelector.selectedDate)
      .pipe(
        tap((date) => {
          this.scheduleComponent.selectedDate = new Date(date);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleChangeView(): void {
    this.store
      .select(TssCalendarSelector.view)
      .pipe(
        skip(1),
        distinctUntilChanged(),
        filter((view) => !!view),
        tap((view) => {
          const today = new Date();
          if (
            view !== 'Month' &&
            ScheduleHelper.dayInCurrentView(
              this.scheduleComponent,
              this.scheduleComponent.currentView,
              today,
            )
          ) {
            this.scheduleComponent.selectedDate = today;
          } else if (
            view === 'Month' &&
            DateHelper.weekIncludedByTwoMonths(today) &&
            ScheduleHelper.dayInCurrentView(
              this.scheduleComponent,
              this.scheduleComponent.currentView,
              today,
            )
          ) {
            today.setDate(today.getDate() + 7);
            this.scheduleComponent.selectedDate = today;
          }
          this.scheduleComponent.changeView(view);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private handleChangeStatus(): void {
    this.store
      .select(TssCalendarSelector.status)
      .pipe(
        map((status) => status === 'loading'),
        distinctUntilChanged(),
        tap((isLoading) => {
          if (isLoading) {
            this.scheduleComponent.showSpinner();
          } else {
            this.scheduleComponent.hideSpinner();
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private showExamEditorDialog(data: EjsScheduleModel): void {
    this.tuiDialogService
      .open<string | undefined>(
        new PolymorpheusComponent(TssExamDialogComponent, this.injector),
        {
          data,
          label: 'Chi tiết lịch thi',
          closeable: false,
          dismissible: false,
        },
      )
      .pipe(
        ObservableHelper.filterUndefined(),
        tap((Note) => {
          const newData: EjsScheduleModel = { ...data, Note };
          this.scheduleComponent.saveEvent(newData);
        }),
      )
      .subscribe();
  }

  private showStudyEditorDialog(schedule: EjsScheduleModel): void {
    // Get study schedule in the same day with `schedule`
    const schedules = schedule.StartTime
      ? (this.eventSettings$.value.dataSource as EjsScheduleModel[]).filter(
          (s) =>
            s.Type === 'study' &&
            schedule.StartTime &&
            s.StartTime &&
            DateHelper.sameDay(schedule.StartTime, s.StartTime),
        )
      : [schedule];
    const selectedId = schedule.Id;

    this.tuiDialogService
      .open<EjsScheduleModel[] | undefined>(
        new PolymorpheusComponent(TssTeachingDialogComponent, this.injector),
        {
          data: { schedules, selectedId },
          size: 'l',
          closeable: false,
          dismissible: false,
        },
      )
      .pipe(
        ObservableHelper.filterNullish(),
        tap((schedules) => this.scheduleComponent.saveEvent(schedules)),
      )
      .subscribe();
  }

  private showGoogleEventEditorDialog(data: GoogleCalendarModel): void {
    this.tuiDialogService
      .open<Partial<EjsScheduleModel> | boolean | undefined>(
        new PolymorpheusComponent(TssGoogleEventDialogComponent, this.injector),
        {
          data,
          label: 'Chi tiết sự kiện',
          closeable: false,
          dismissible: false,
          size: 'l',
        },
      )
      .pipe(
        ObservableHelper.filterUndefined(),
        tap((newData) => {
          if (typeof newData === 'boolean') {
            this.removeGoogleEvent(data.Id);
          } else {
            this.scheduleComponent.saveEvent({ ...data, ...newData });
          }
        }),
      )
      .subscribe();
  }

  private handleRemove(): void {
    this.remove$
      .pipe(
        withLatestFrom(this.teacher$, this.nameTitle$),
        switchMap(([data, { uuidAccount }, nameTitle]) =>
          this.tssDialogService
            .showConfirmDialog({
              header: `${nameTitle} có chắc chắn muốn xóa sự kiện này không? Hành động này sẽ không thể hoàn tác.`,
              positive: 'Có',
              negative: 'Không',
            })
            .pipe(map((confirm) => ({ data, uuidAccount, confirm }))),
        ),
        filter(({ confirm }) => confirm),
        switchMap(({ data, uuidAccount }) =>
          this.googleService
            .remove(uuidAccount, data.Calendar.id, data.Id)
            .pipe(map(() => data.Id)),
        ),
        tap((id) => {
          this.removeGoogleEvent(id);
          this.alertService
            .open('Xóa sự kiện thành công!', {
              status: TuiNotification.Success,
            })
            .subscribe();
        }),
        catchError(() =>
          this.alertService.open('Vui lòng thử lại sau', {
            label: 'Đã có lỗi xảy ra',
            status: TuiNotification.Error,
          }),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private removeGoogleEvent(id: string): void {
    // EJS Schedule receive `Id` is `number` type, but Google Event is `string`
    // Therefore, cannot use `this.scheduleComponent.deleteEvent()`
    // Below is just work-around
    this.dataSource$.next([
      ...((this.dataSource$.value || []) as EjsScheduleModel[]).filter(
        ({ Id, Type }) => Id !== id && Type === 'googleEvent',
      ),
    ]);
  }
}
