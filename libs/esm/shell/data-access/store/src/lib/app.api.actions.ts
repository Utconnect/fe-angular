import {
  GetAllFacultyData,
  GetMySummaryInfoData,
  GetRelatedData,
  GetSummaryData,
} from '@esm/api';
import { createAction, props } from '@ngrx/store';

export class EsmApiAction {
  static readonly noCacheUserInfo = createAction(
    '[ESM/API] No cache user info',
  );
  static readonly getUserInfoSuccessful = createAction(
    '[ESM/API] Get user info successful',
    props<{ user: GetMySummaryInfoData['data'] }>(),
  );
  static readonly getUserInfoFailed = createAction(
    '[ESM/API] Get user info failed',
  );
  static readonly changeExaminationId = createAction(
    '[ESM/API] Change examination id',
    props<{ id: string | null }>(),
  );
  static readonly getExaminationSuccessful = createAction(
    '[ESM/API] Get examination successful',
    props<{ examination: GetSummaryData['data'] | null }>(),
  );
  static readonly getExaminationFailed = createAction(
    '[ESM/API] Get examination failed',
  );
  static readonly getRelatedExaminationsSuccessful = createAction(
    '[ESM/API] Get related examinations successful',
    props<{ relatedExaminations: GetRelatedData['data'] }>(),
  );
  static readonly getRelatedExaminationsFailed = createAction(
    '[ESM/API] Get related examinations failed',
  );
  static readonly getDepartmentsSuccessful = createAction(
    '[ESM/API] Get departments successful',
    props<{ departments: GetAllFacultyData['data'] }>(),
  );
  static readonly getDepartmentsFailed = createAction(
    '[ESM/API] Get departments failed',
  );
  static readonly commitNumberOfInvigilatorForFacultySuccessful = createAction(
    '[ESM/API] Commit number of invigilator for faculty successful',
  );
  static readonly closeSuccessful = createAction('[ESM/API] Close successful');
}
