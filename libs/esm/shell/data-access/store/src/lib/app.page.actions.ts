import { ESMApplicationExaminationsCommandsUpdateUpdateParams } from '@esm/api';
import { createAction, props } from '@ngrx/store';

export class EsmPageAction {
  static readonly getUserInfo = createAction('[ESM/Page] Get user info');
  static readonly logOut = createAction('[ESM/Page] Log out');
  static readonly getRelatedExaminations = createAction(
    '[ESM/Page] Get related examinations',
  );
  static readonly getDepartments = createAction('[ESM/Page] Get departments');
  static readonly getExaminationSummary = createAction(
    '[ESM/Page] Get examination summary',
    props<{ id: string }>(),
  );
  static readonly updateExamination = createAction(
    '[ESM/Page] Update departments',
    props<{
      id: string;
      data: ESMApplicationExaminationsCommandsUpdateUpdateParams;
    }>(),
  );
}
