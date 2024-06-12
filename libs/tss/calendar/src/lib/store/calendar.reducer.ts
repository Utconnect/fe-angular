import { createReducer, on } from '@ngrx/store';
import { TuiMonth } from '@taiga-ui/cdk';
import { uniqBy } from 'lodash';
import { CalendarState } from '.';
import { TssCalendarApiAction } from './calendar.api.actions';
import { TssCalendarPageAction } from './calendar.page.actions';

const initialState: CalendarState = {
  status: 'idle',
  filter: {
    active: {
      showDepartmentSchedule: false,
      teacherIds: [],
      modules: [],
    },
    selecting: {
      showDepartmentSchedule: false,
      teacherIds: [],
      modules: [],
    },
  },
  schedules: {
    department: {
      exam: [],
      study: [],
      ranges: [],
    },
    personal: {
      exam: [],
      study: [],
      ranges: [],
    },
  },
  googleCalendar: {
    events: [],
    ranges: [],
  },
  view: 'Month',
  selectedDate: new Date(),
  month: TuiMonth.currentLocal(),
};

export const calendarFeatureKey = 'calendar';

export const calendarReducer = createReducer(
  initialState,
  on(TssCalendarPageAction.reset, () => initialState),
  on(TssCalendarPageAction.load, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(
    TssCalendarApiAction.changeMonth,
    (state, { month, date: selectedDate }) => ({
      ...state,
      month,
      selectedDate,
    }),
  ),
  on(TssCalendarPageAction.changeView, (state, { view }) => ({
    ...state,
    view,
  })),
  on(TssCalendarPageAction.filter, (state) => ({
    ...state,
    filter: {
      ...state.filter,
      active: { ...state.filter.selecting },
    },
  })),
  on(TssCalendarPageAction.resetFilter, (state) => ({
    ...state,
    filter: {
      ...state.filter,
      selecting: { ...state.filter.active },
    },
  })),
  on(
    TssCalendarPageAction.changeSelectingState,
    (state, { changes }) => ({
      ...state,
      filter: {
        ...state.filter,
        selecting: {
          ...state.filter.selecting,
          ...changes,
          modules: changes.modules || [],
        },
      },
    }),
  ),
  on(
    TssCalendarPageAction.loadOfflineData,
    (state, { googleCalendar, schedules }) => {
      return {
        ...state,
        schedules,
        googleCalendar,
      };
    },
  ),
  on(TssCalendarApiAction.prev, (state, { date }) => {
    return {
      ...state,
      selectedDate: date,
      month: new TuiMonth(date.getFullYear(), date.getMonth()),
    };
  }),
  on(TssCalendarApiAction.next, (state, { date }) => {
    return {
      ...state,
      selectedDate: date,
      month: new TuiMonth(date.getFullYear(), date.getMonth()),
    };
  }),
  on(
    TssCalendarApiAction.loadPersonalStudySuccessful,
    (state, { schedules, ranges }) => {
      return {
        ...state,
        schedules: {
          ...state.schedules,
          personal: {
            ...state.schedules.personal,
            ranges,
            study: uniqBy(
              [...state.schedules.personal.study, ...schedules],
              'id',
            ),
          },
        },
        status: 'success',
      };
    },
  ),
  on(
    TssCalendarApiAction.loadPersonalExamSuccessful,
    (state, { schedules, ranges }) => {
      return {
        ...state,
        schedules: {
          ...state.schedules,
          personal: {
            ...state.schedules.personal,
            ranges,
            exam: uniqBy(
              [...state.schedules.personal.exam, ...schedules],
              'id',
            ),
          },
        },
        status: 'success',
      };
    },
  ),
  on(
    TssCalendarApiAction.loadDepartmentStudySuccessful,
    (state, { schedules, ranges }) => {
      return {
        ...state,
        schedules: {
          ...state.schedules,
          department: {
            ...state.schedules.department,
            ranges,
            study: uniqBy(
              [...state.schedules.department.study, ...schedules],
              'id',
            ),
          },
        },
        status: 'success',
      };
    },
  ),
  on(
    TssCalendarApiAction.loadDepartmentExamSuccessful,
    (state, { schedules, ranges }) => {
      return {
        ...state,
        schedules: {
          ...state.schedules,
          department: {
            ...state.schedules.department,
            ranges,
            exam: uniqBy(
              [...state.schedules.department.exam, ...schedules],
              'id',
            ),
          },
        },
        status: 'success',
      };
    },
  ),
  on(
    TssCalendarApiAction.loadGoogleCalendarSuccessful,
    (state, { events, ranges }) => {
      return {
        ...state,
        googleCalendar: {
          ...state.googleCalendar,
          ranges,
          events: uniqBy([...state.googleCalendar.events, ...events], 'id'),
        },
        status: 'success',
      };
    },
  ),
);
