import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { View } from '@syncfusion/ej2-angular-schedule';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import {
  ExamScheduleModel,
  ExamService,
  GoogleService,
  ScheduleService,
  SearchSchedule,
  StudyScheduleModel,
} from '@tss/api';
import { PermissionHelper } from '@tss/helpers';
import { TssSelector, TssState } from '@tss/store';
import { DateHelper, ObservableHelper } from '@utconnect/helpers';
import { NetworkService } from '@utconnect/services';
import { GoogleCalendarEvent, Nullable, SimpleModel } from '@utconnect/types';
import { last } from 'lodash';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {
  catchError,
  combineLatest,
  filter,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  OperatorFunction,
  Subject,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { TssCalendarApiAction } from './calendar.api.actions';
import { TssCalendarPageAction } from './calendar.page.actions';
import { TssCalendarSelector } from './calendar.selectors';
import { CalendarState } from './calendar.state';

@Injectable()
export class CalendarEffects {
  // INJECTIONS
  private readonly actions$ = inject(Actions);
  private readonly examService = inject(ExamService);
  private readonly store = inject(Store<CalendarState>);
  private readonly googleService = inject(GoogleService);
  private readonly dbService = inject(NgxIndexedDBService);
  private readonly appShellStore = inject(Store<TssState>);
  private readonly networkService = inject(NetworkService);
  private readonly scheduleService = inject(ScheduleService);

  // PRIVATE PROPERTIES
  private ranges$ = this.store.select(TssCalendarSelector.ranges);
  private view$ = this.store.select(TssCalendarSelector.view);

  private readonly loadPersonalExamSubject$ = new Subject<Date>();
  private readonly loadPersonalScheduleSubject$ = new Subject<Date>();
  private readonly loadDepartmentExamSubject$ = new Subject<Date>();
  private readonly loadDepartmentScheduleSubject$ = new Subject<Date>();
  private readonly loadGoogleCalendarEventsSubject$ = new Subject<Date>();
  private readonly online$ = this.networkService.online$;
  private readonly permissions$ = this.appShellStore.select(
    TssSelector.permission,
  );
  private readonly department$ = this.appShellStore.select(
    TssSelector.department,
  );
  private readonly teacher$ = this.appShellStore.pipe(
    TssSelector.notNullTeacher,
  );

  // EFFECTS
  loadPersonalSchedule$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TssCalendarPageAction.load),
        tap(({ date }) => {
          this.loadPersonalScheduleSubject$.next(date);
          this.loadPersonalExamSubject$.next(date);
          this.loadGoogleCalendarEventsSubject$.next(date);
        }),
      );
    },
    { dispatch: false },
  );

  loadDepartmentSchedule$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TssCalendarPageAction.load),
        tap(({ date }) => {
          this.loadDepartmentScheduleSubject$.next(date);
          this.loadDepartmentExamSubject$.next(date);
        }),
      );
    },
    { dispatch: false },
  );

  prev$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TssCalendarPageAction.prev),
      withLatestFrom(this.view$),
      map(([{ oldSelectedDate }, view]) =>
        TssCalendarApiAction.prev({
          date: adjacentView(oldSelectedDate, view, true),
        }),
      ),
    );
  });

  next$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TssCalendarPageAction.next),
      withLatestFrom(this.view$),
      map(([{ oldSelectedDate }, view]) =>
        TssCalendarApiAction.next({
          date: adjacentView(oldSelectedDate, view),
        }),
      ),
    );
  });

  loadPrev$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TssCalendarApiAction.prev),
      map(({ date }) => TssCalendarPageAction.load({ date })),
    );
  });

  loadNext$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TssCalendarApiAction.next),
      map(({ date }) => TssCalendarPageAction.load({ date })),
    );
  });

  changeMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TssCalendarPageAction.changeMonth),
      map(({ month }) =>
        TssCalendarApiAction.changeMonth({
          month,
          date: new Date(month.year, month.month, new Date().getDate()),
        }),
      ),
    );
  });

  loadChangeMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TssCalendarApiAction.changeMonth),
      map(({ date }) => TssCalendarPageAction.load({ date })),
    );
  });

  // CONSTRUCTOR
  constructor() {
    this.handleLoadPersonalSchedule();
    this.handleLoadPersonalExam();
    this.handleLoadDepartmentSchedule();
    this.handleLoadDepartmentExam();
    this.handleLoadGoogleCalendar();
    this.handleLoadOfflineData();
  }

  // PRIVATE METHODS
  private handleLoadPersonalSchedule(): void {
    combineLatest([
      this.loadPersonalScheduleSubject$,
      this.teacher$.pipe(map(({ id }) => id)),
      this.online$,
    ])
      .pipe(
        this.commonPersonalObservable(),
        mergeMap(({ fetch, ranges, teacherId }) => {
          return this.scheduleService.getSchedule(teacherId, fetch).pipe(
            tap(({ data }) => {
              this.dbService.bulkAdd('schedule', data).subscribe();

              this.store.dispatch(
                TssCalendarApiAction.loadPersonalStudySuccessful({
                  schedules: data,
                  ranges,
                }),
              );
            }),
            catchError(() =>
              of(
                this.store.dispatch(
                  TssCalendarApiAction.loadPersonalStudyFailure(),
                ),
              ),
            ),
          );
        }),
      )
      .subscribe();
  }

  private handleLoadPersonalExam(): void {
    combineLatest([
      this.loadPersonalExamSubject$,
      this.teacher$.pipe(map(({ id }) => id)),
      this.online$,
    ])
      .pipe(
        this.commonPersonalObservable(),
        mergeMap(({ fetch, ranges, teacherId }) => {
          return this.examService.getExamSchedule(teacherId, fetch.date).pipe(
            tap(({ data }) => {
              this.dbService.bulkAdd('exam', data).subscribe();

              this.store.dispatch(
                TssCalendarApiAction.loadPersonalExamSuccessful({
                  schedules: data,
                  ranges,
                }),
              );
            }),
            catchError(() =>
              of(
                this.store.dispatch(
                  TssCalendarApiAction.loadPersonalExamFailure(),
                ),
              ),
            ),
          );
        }),
      )
      .subscribe();
  }

  private handleLoadDepartmentSchedule(): void {
    combineLatest([
      this.loadDepartmentScheduleSubject$,
      this.department$.pipe(ObservableHelper.filterNullish()),
      this.permissions$.pipe(ObservableHelper.filterNullish()),
    ])
      .pipe(
        this.commonPermissionObservable(),
        mergeMap(({ fetch, ranges, department }) => {
          return this.scheduleService
            .getDepartmentSchedule(department, fetch.date)
            .pipe(
              tap(({ data }) => {
                this.dbService.bulkAdd('departmentSchedule', data).subscribe();

                this.store.dispatch(
                  TssCalendarApiAction.loadDepartmentStudySuccessful({
                    schedules: data,
                    ranges,
                  }),
                );
              }),
              catchError(() =>
                of(
                  this.store.dispatch(
                    TssCalendarApiAction.loadDepartmentStudyFailure(),
                  ),
                ),
              ),
            );
        }),
      )
      .subscribe();
  }

  private handleLoadDepartmentExam(): void {
    combineLatest([
      this.loadDepartmentExamSubject$,
      this.department$.pipe(ObservableHelper.filterNullish()),
      this.permissions$.pipe(ObservableHelper.filterNullish()),
    ])
      .pipe(
        this.commonPermissionObservable(),
        mergeMap(({ fetch, ranges, department }) => {
          return this.examService
            .getDepartmentExamSchedule(department, fetch.date)
            .pipe(
              tap(({ data }) => {
                this.dbService.bulkAdd('departmentExam', data).subscribe();

                this.store.dispatch(
                  TssCalendarApiAction.loadDepartmentExamSuccessful({
                    schedules: data,
                    ranges,
                  }),
                );
              }),
              catchError(() =>
                of(
                  this.store.dispatch(
                    TssCalendarApiAction.loadDepartmentExamFailure(),
                  ),
                ),
              ),
            );
        }),
      )
      .subscribe();
  }

  private handleLoadGoogleCalendar(): void {
    combineLatest([
      this.loadPersonalExamSubject$,
      this.teacher$.pipe(
        filter(({ settings }) => settings.googleCalendar),
        map(({ uuidAccount }) => uuidAccount),
      ),
      this.online$,
    ])
      .pipe(
        this.commonPersonalObservable(),
        mergeMap(({ fetch, ranges, teacherId }) => {
          let [timeMin, timeMax] = fetch.date.split(',');
          timeMin += 'T00:00:00+07:00';
          timeMax += 'T23:59:59+07:00';
          return this.googleService
            .getCalendarEvents(teacherId, timeMin, timeMax)
            .pipe(
              tap(({ data }) => {
                const events = data.reduce((acc, { events, ...props }) => {
                  acc.push(
                    ...events.map((e) => {
                      e.calendar = props;
                      return e;
                    }),
                  );
                  return acc;
                }, <GoogleCalendarEvent[]>[]);

                this.dbService
                  .bulkAdd('googleCalendarEvents', events)
                  .subscribe();

                this.store.dispatch(
                  TssCalendarApiAction.loadGoogleCalendarSuccessful({
                    events,
                    ranges,
                  }),
                );
              }),
              catchError(() =>
                of(
                  this.store.dispatch(
                    TssCalendarApiAction.loadGoogleCalendarFailure(),
                  ),
                ),
              ),
            );
        }),
      )
      .subscribe();
  }

  private handleLoadOfflineData(): void {
    this.online$
      .pipe(
        filter((online) => !online),
        tap(() => {
          const ranges = [
            new TuiDayRange(new TuiDay(2020, 0, 1), new TuiDay(2030, 0, 1)),
          ];
          const personalStudy = this.dbService.getAll('schedule') as Observable<
            StudyScheduleModel[]
          >;
          const personalExam = this.dbService.getAll('exam') as Observable<
            ExamScheduleModel[]
          >;
          const departmentStudy = this.dbService.getAll(
            'departmentSchedule',
          ) as Observable<StudyScheduleModel[]>;
          const departmentExam = this.dbService.getAll(
            'departmentExam',
          ) as Observable<ExamScheduleModel[]>;
          const googleEvents = this.dbService.getAll(
            'googleCalendarEvents',
          ) as Observable<GoogleCalendarEvent[]>;

          forkJoin([
            personalStudy,
            personalExam,
            departmentStudy,
            departmentExam,
            googleEvents,
          ]).subscribe((result) => {
            const personal = {
              study: result[0].map((e) => StudyScheduleModel.parse(e)),
              exam: result[1].map((e) => ExamScheduleModel.parse(e)),
              ranges,
            };

            const department = {
              study: result[2].map((e) => StudyScheduleModel.parse(e)),
              exam: result[3].map((e) => ExamScheduleModel.parse(e)),
              ranges,
            };

            const googleCalendar = {
              events: result[4].map((e) => GoogleCalendarEvent.parse(e)),
              ranges,
            };

            this.store.dispatch(
              TssCalendarPageAction.loadOfflineData({
                schedules: { personal, department },
                googleCalendar,
              }),
            );
          });
        }),
        take(1),
      )
      .subscribe();
  }

  private commonPersonalObservable(): OperatorFunction<
    [Date, string, boolean],
    {
      teacherId: string;
      fetch: SearchSchedule;
      ranges: TuiDayRange[];
    }
  > {
    return (source$) =>
      source$.pipe(
        filter(({ 2: online }) => online),
        map(([date, teacherId]) => ({ date, teacherId })),
        calculateRangeO(this.ranges$.pipe(map(({ department }) => department))),
      );
  }

  private commonPermissionObservable(): OperatorFunction<
    [Date, SimpleModel, number[]],
    {
      department: string;
      fetch: SearchSchedule;
      ranges: TuiDayRange[];
    }
  > {
    return (source$) =>
      source$.pipe(
        filter(
          ({ 1: department, 2: permissions }) =>
            !!permissions &&
            !!department &&
            PermissionHelper.isDepartmentHead(permissions),
        ),
        map(([date, department]) => ({ date, department: department.id })),
        calculateRangeWithDepartmentO(
          this.ranges$.pipe(map(({ department }) => department)),
        ),
      );
  }
}

function adjacentView(date: Date, view: View, prev = false): Date {
  switch (view) {
    case 'Month':
      date.setMonth(date.getMonth() + (prev ? -1 : 1));
      break;
    case 'Week':
      date.setDate(date.getDate() + (prev ? -7 : 7));
      break;
    case 'Day':
      date.setDate(date.getDate() + (prev ? -1 : 1));
  }

  return date;
}

function calculateRange(date: Date): { first: Date; last: Date } {
  const start = new Date(date);
  const end = new Date(date);
  start.setDate(start.getDate() - 60);
  end.setDate(end.getDate() + 60);
  return { first: start, last: end };
}

function calculateFetchRange(
  date: Date,
  fetchedDateRanges: TuiDayRange[],
): { fetch: Nullable<TuiDayRange>; ranges: TuiDayRange[] } {
  const { first, last: lastDate } = calculateRange(date);
  const start = TuiDay.fromUtcNativeDate(first);
  const end = TuiDay.fromUtcNativeDate(lastDate);
  const rangeList = fetchedDateRanges.slice();
  const rangeListLastItem = last(rangeList);

  if (!rangeListLastItem) {
    const range = new TuiDayRange(start, end);
    return {
      fetch: range,
      ranges: [range],
    };
  }

  if (end.dayBefore(rangeList[0].from)) {
    const range = new TuiDayRange(start, end);
    rangeList.unshift(range);
    return {
      fetch: range,
      ranges: rangeList,
    };
  }

  if (start.dayAfter(rangeListLastItem.to)) {
    const range = new TuiDayRange(start, end);
    rangeList.push(range);
    return {
      fetch: range,
      ranges: rangeList,
    };
  }

  for (let i = 0; i < rangeList.length; i++) {
    const curr = rangeList[i];
    const leftGreater = start.daySameOrAfter(curr.from);
    const rightSmaller = end.daySameOrBefore(curr.to);

    if (leftGreater && rightSmaller) {
      return {
        fetch: null,
        ranges: rangeList,
      };
    }

    if (!leftGreater) {
      rangeList[i] = new TuiDayRange(start, curr.to);
      return {
        fetch: new TuiDayRange(start, curr.from.append({ day: 1 })),
        ranges: resolveConflictRanges(rangeList),
      };
    }

    if (start.daySameOrBefore(curr.to)) {
      rangeList[i] = new TuiDayRange(curr.from, end);
      return {
        fetch: new TuiDayRange(curr.to.append({ day: 1 }), end),
        ranges: resolveConflictRanges(rangeList),
      };
    }

    if (end.dayBefore(rangeList[i + 1].from)) {
      const range = new TuiDayRange(start, end);
      rangeList.splice(i + 1, 0, range);
      return {
        fetch: range,
        ranges: rangeList,
      };
    }
  }

  return {
    fetch: null,
    ranges: rangeList,
  };
}

function resolveConflictRanges(ranges: TuiDayRange[]): TuiDayRange[] {
  for (let i = 0; i < ranges.length - 1; i++) {
    if (ranges[i].to.daySameOrAfter(ranges[i + 1].from)) {
      ranges[i] = new TuiDayRange(ranges[i].from, ranges[i + 1].to);
      ranges.splice(i + 1, 1);
    }
  }

  return ranges;
}

function calculateRangeO(
  ranges$: Observable<TuiDayRange[]>,
): OperatorFunction<
  { teacherId: string; date: Date },
  { teacherId: string; fetch: SearchSchedule; ranges: TuiDayRange[] }
> {
  return (source$) =>
    source$.pipe(
      withLatestFrom(ranges$),
      map(([{ teacherId, date }, oldRanges]) => ({
        teacherId,
        ...calculateFetchRange(date, oldRanges),
      })),
      filter(
        (data: {
          teacherId: string;
          fetch: Nullable<TuiDayRange>;
          ranges: TuiDayRange[];
        }): data is {
          teacherId: string;
          fetch: TuiDayRange;
          ranges: TuiDayRange[];
        } => data.fetch !== null,
      ),
      map(({ teacherId, fetch, ranges }) => {
        return {
          teacherId,
          ranges: ranges ?? [],
          fetch: {
            date: [
              DateHelper.format(fetch.from),
              DateHelper.format(fetch.to),
            ].join(),
          },
        };
      }),
    );
}

function calculateRangeWithDepartmentO(
  ranges$: Observable<TuiDayRange[]>,
): OperatorFunction<
  { department: string; date: Date },
  { department: string; fetch: SearchSchedule; ranges: TuiDayRange[] }
> {
  return (source$) =>
    source$.pipe(
      withLatestFrom(ranges$),
      map(([{ department, date }, oldRanges]) => ({
        department,
        ...calculateFetchRange(date, oldRanges),
      })),
      filter(
        (data: {
          department: string;
          fetch: Nullable<TuiDayRange>;
          ranges: TuiDayRange[];
        }): data is {
          department: string;
          fetch: TuiDayRange;
          ranges: TuiDayRange[];
        } => data.fetch !== null,
      ),
      map(({ department, fetch, ranges }) => {
        return {
          department,
          ranges,
          fetch: {
            date: [
              DateHelper.format(fetch.from),
              DateHelper.format(fetch.to.append({ day: 1 })),
            ].join(),
          },
        };
      }),
    );
}
