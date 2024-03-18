import {
  GetAllFacultyData,
  GetMySummaryInfoData,
  GetRelatedData,
  GetSummaryData,
} from '@esm/api';
import { GenericState, Status } from '@utconnect/types';

type UserState = {
  showLoader: boolean | null;
  user: GetMySummaryInfoData['data'] | null;
  userStatus: Status;
};

type ExaminationState = {
  examinationId?: string | null;
  examination: GetSummaryData['data'] | null;
  examinationStatus: Status;
};

type RelatedExaminationsState = GenericState<
  GetRelatedData['data'],
  'relatedExaminations'
>;

type DepartmentsState = GenericState<GetAllFacultyData['data'], 'departments'>;

export type EsmState = UserState &
  ExaminationState &
  RelatedExaminationsState &
  DepartmentsState;
