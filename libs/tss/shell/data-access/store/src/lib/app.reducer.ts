import { createReducer, on } from '@ngrx/store';
import { StringHelper } from '@utconnect/helpers';
import { TssApiAction } from './app.api.actions';
import { TssPageAction } from './app.page.actions';
import { TssState } from './app.state';

const initialState: TssState = {
  currentTerm: '',
  breadcrumbs: [],
  academicData: [],
  teacher: null,
  status: 'idle',
  rooms: [],
  teachersInDepartment: [],
  showLoader: null,
  googleCalendars: [],
};

export const tssFeatureKey = '[NGRX Key] TSS';

export const tssReducer = createReducer(
  initialState,
  on(TssPageAction.reset, () => initialState),
  on(TssPageAction.keepLogin, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(TssPageAction.getUserInfo, (state) => ({
    ...state,
    userStatus: 'loading',
  })),
  on(TssPageAction.logout, (state) => ({
    ...state,
    teacher: null,
    teachersInDepartment: [],
  })),
  on(TssPageAction.setLoader, (state, { showLoader }) => ({
    ...state,
    showLoader,
  })),
  on(TssPageAction.setConnectToGoogle, (state, { connect }) => ({
    ...state,
    teacher: state.teacher
      ? {
          ...state.teacher,
          settings: {
            ...state.teacher.settings,
            googleCalendar: connect,
          },
        }
      : null,
  })),
  on(TssApiAction.updateBreadcrumbs, (state, { breadcrumbs }) => ({
    ...state,
    breadcrumbs,
  })),
  on(TssApiAction.autoLoginSuccessfully, (state, { teacher }) => ({
    ...state,
    teacher,
    status: 'success',
  })),
  on(TssApiAction.autoLoginFailure, (state) => ({
    ...state,
    teacher: null,
    status: 'error',
  })),
  on(TssApiAction.loadRoomsSuccessfully, (state, { rooms }) => ({
    ...state,
    rooms,
  })),
  on(TssApiAction.loadCurrentTermSuccessful, (state, { currentTerm }) => {
    return {
      ...state,
      currentTerm,
    };
  }),
  on(TssApiAction.loadAcademicYearSuccessful, (state, { academicYears }) => {
    return {
      ...state,
      academicData: academicYears,
    };
  }),
  on(TssApiAction.loadTeachersInDepartmentSuccessful, (state, { teachers }) => {
    const teachersInDepartment = [...teachers];
    teachersInDepartment.sort((a, b) =>
      StringHelper.nameCompareFn(a.name, b.name),
    );
    return {
      ...state,
      teachersInDepartment,
    };
  }),
  on(TssApiAction.loadGoogleCalendarSuccessful, (state, { calendars }) => {
    return {
      ...state,
      googleCalendars: calendars,
    };
  }),
);
