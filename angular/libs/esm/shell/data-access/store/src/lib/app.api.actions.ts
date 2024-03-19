import {
  GetAllFacultyData,
  GetMySummaryInfoData,
  GetRelatedData,
  GetSummaryData,
} from '@esm/api';
import { createAction, props } from '@ngrx/store';

export class EsmApiAction {
  static readonly noCacheUserInfo = createAction(
    '[App/API] No cache user info'
  );
  static readonly getUserInfoSuccessful = createAction(
    '[App/API] Get user info successful',
    props<{ user: GetMySummaryInfoData['data'] }>()
  );
  static readonly getUserInfoFailed = createAction(
    '[App/API] Get user info failed'
  );
  static readonly changeExaminationId = createAction(
    '[App/API] Change examination id',
    props<{ id: string | null }>()
  );
  static readonly getExaminationSuccessful = createAction(
    '[App/API] Get examination successful',
    props<{ examination: GetSummaryData['data'] | null }>()
  );
  static readonly getExaminationFailed = createAction(
    '[App/API] Get examination failed'
  );
  static readonly getRelatedExaminationsSuccessful = createAction(
    '[App/API] Get related examinations successful',
    props<{ relatedExaminations: GetRelatedData['data'] }>()
  );
  static readonly getRelatedExaminationsFailed = createAction(
    '[App/API] Get related examinations failed'
  );
  static readonly getDepartmentsSuccessful = createAction(
    '[App/API] Get departments successful',
    props<{ departments: GetAllFacultyData['data'] }>()
  );
  static readonly getDepartmentsFailed = createAction(
    '[App/API] Get departments failed'
  );
  static readonly commitNumberOfInvigilatorForFacultySuccessful = createAction(
    '[App/API] Commit number of invigilator for faculty successful'
  );
  static readonly closeSuccessful = createAction('[App/API] Close successful');
}
