import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { createReducer, on } from '@ngrx/store';
import { ErrorLogger } from '@utconnect/helpers';
import { AppApiAction } from './app.api.actions';
import { AppPageAction } from './app.page.actions';
import { EsmState } from './app.state';

export const appInitialState: EsmState = {
  showLoader: null,
  user: null,
  userStatus: 'idle',
  //
  examinationId: null,
  examination: null,
  examinationStatus: 'idle',
  //
  relatedExaminations: [],
  relatedExaminationsStatus: 'idle',
  relatedExaminationsError: null,
  //
  departments: [],
  departmentsStatus: 'idle',
  departmentsError: null,
};

export const appFeatureKey = '[NGRX Key] App';

export const appReducer = createReducer(
  appInitialState,
  on(AppPageAction.getUserInfo, state => ({
    ...state,
    userStatus: 'loading',
  })),
  on(AppPageAction.logOut, state => ({
    ...state,
    user: null,
  })),
  on(AppPageAction.getRelatedExaminations, state => ({
    ...state,
    relatedExaminationsStatus: 'loading',
  })),
  on(AppPageAction.getDepartments, state => ({
    ...state,
    departmentsStatus: 'loading',
  })),
  on(AppPageAction.updateExamination, (state, { id, data }) => {
    const examination = ErrorLogger.nullOrEmpty(
      state.examination,
      'Examination',
      'appReducer/updateExamination'
    );

    return {
      ...state,
      examination: {
        ...examination,
        name: data.name ?? examination.name,
        displayId: data.displayId ?? examination.displayId,
        description: data.description,
        expectStartAt: data.expectStartAt ?? examination.expectStartAt,
        expectEndAt: data.expectEndAt ?? examination.expectEndAt,
        updatedAt: data.updatedAt,
      },
      relatedExaminations: state.relatedExaminations.map(e =>
        e.id !== id
          ? e
          : {
              ...e,
              displayId: data.displayId ?? examination.displayId,
              name: data.name ?? examination.name,
            }
      ),
    };
  }),
  on(AppApiAction.noCacheUserInfo, state => ({
    ...state,
    userStatus: 'success',
  })),
  on(AppApiAction.getUserInfoSuccessful, (state, { user }) => ({
    ...state,
    user,
    userStatus: 'success',
  })),
  on(AppApiAction.getUserInfoFailed, state => ({
    ...state,
    user: null,
    userStatus: 'error',
  })),
  on(AppApiAction.changeExaminationId, (state, { id }) => ({
    ...state,
    examinationId: id,
    examinationStatus: 'loading',
  })),
  on(AppApiAction.getExaminationSuccessful, (state, { examination }) => ({
    ...state,
    examination,
    examinationStatus: 'success',
    relatedExaminations:
      examination === null ||
      examination.status === ESMDomainEnumsExaminationStatus.Closed ||
      state.relatedExaminations.find(e => e.id === examination.id)
        ? state.relatedExaminations
        : [...state.relatedExaminations, examination],
  })),
  on(AppApiAction.getExaminationFailed, state => ({
    ...state,
    examination: null,
    examinationStatus: 'error',
  })),
  on(
    AppApiAction.getRelatedExaminationsSuccessful,
    (state, { relatedExaminations }) => ({
      ...state,
      relatedExaminations,
      relatedExaminationsStatus: 'success',
    })
  ),
  on(AppApiAction.getRelatedExaminationsFailed, state => ({
    ...state,
    relatedExaminations: [],
    relatedExaminationsStatus: 'error',
  })),
  on(AppApiAction.getDepartmentsSuccessful, (state, { departments }) => ({
    ...state,
    departments,
    departmentsStatus: 'success',
  })),
  on(AppApiAction.getDepartmentsFailed, state => ({
    ...state,
    departments: [],
    departmentsStatus: 'error',
  })),
  on(AppApiAction.commitNumberOfInvigilatorForFacultySuccessful, state => {
    const examination = ErrorLogger.nullOrEmpty(
      state.examination,
      'Examination',
      'appReducer/commitNumberOfInvigilatorForFacultySuccessful'
    );

    return {
      ...state,
      examination: {
        ...examination,
        status: ESMDomainEnumsExaminationStatus.AssignInvigilator,
      },
      relatedExaminations: state.relatedExaminations.map(e =>
        e.id !== examination.id
          ? e
          : {
              ...e,
              status: ESMDomainEnumsExaminationStatus.AssignInvigilator,
            }
      ),
    };
  }),
  on(AppApiAction.closeSuccessful, state => {
    const examination = ErrorLogger.nullOrEmpty(
      state.examination,
      'Examination',
      'appReducer/closeSuccessful'
    );

    return {
      ...state,
      examination: {
        ...examination,
        status: ESMDomainEnumsExaminationStatus.Closed,
      },
      relatedExaminations: state.relatedExaminations.map(e =>
        e.id !== examination.id
          ? e
          : {
              ...e,
              status: ESMDomainEnumsExaminationStatus.Closed,
            }
      ),
    };
  })
);
