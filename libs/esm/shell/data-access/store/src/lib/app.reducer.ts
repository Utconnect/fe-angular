import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { createReducer, on } from '@ngrx/store';
import { ErrorLogger } from '@utconnect/helpers';
import { EsmApiAction } from './app.api.actions';
import { EsmPageAction } from './app.page.actions';
import { EsmState } from './app.state';

export const esmInitialState: EsmState = {
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

export const esmFeatureKey = '[NGRX Key] ESM';

export const appReducer = createReducer(
  esmInitialState,
  on(EsmPageAction.getUserInfo, state => ({
    ...state,
    userStatus: 'loading',
  })),
  on(EsmPageAction.logOut, state => ({
    ...state,
    user: null,
  })),
  on(EsmPageAction.getRelatedExaminations, state => ({
    ...state,
    relatedExaminationsStatus: 'loading',
  })),
  on(EsmPageAction.getDepartments, state => ({
    ...state,
    departmentsStatus: 'loading',
  })),
  on(EsmPageAction.updateExamination, (state, { id, data }) => {
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
  on(EsmApiAction.noCacheUserInfo, state => ({
    ...state,
    userStatus: 'success',
  })),
  on(EsmApiAction.getUserInfoSuccessful, (state, { user }) => ({
    ...state,
    user,
    userStatus: 'success',
  })),
  on(EsmApiAction.getUserInfoFailed, state => ({
    ...state,
    user: null,
    userStatus: 'error',
  })),
  on(EsmApiAction.changeExaminationId, (state, { id }) => ({
    ...state,
    examinationId: id,
    examinationStatus: 'loading',
  })),
  on(EsmApiAction.getExaminationSuccessful, (state, { examination }) => ({
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
  on(EsmApiAction.getExaminationFailed, state => ({
    ...state,
    examination: null,
    examinationStatus: 'error',
  })),
  on(
    EsmApiAction.getRelatedExaminationsSuccessful,
    (state, { relatedExaminations }) => ({
      ...state,
      relatedExaminations,
      relatedExaminationsStatus: 'success',
    })
  ),
  on(EsmApiAction.getRelatedExaminationsFailed, state => ({
    ...state,
    relatedExaminations: [],
    relatedExaminationsStatus: 'error',
  })),
  on(EsmApiAction.getDepartmentsSuccessful, (state, { departments }) => ({
    ...state,
    departments,
    departmentsStatus: 'success',
  })),
  on(EsmApiAction.getDepartmentsFailed, state => ({
    ...state,
    departments: [],
    departmentsStatus: 'error',
  })),
  on(EsmApiAction.commitNumberOfInvigilatorForFacultySuccessful, state => {
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
  on(EsmApiAction.closeSuccessful, state => {
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
