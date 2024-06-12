import { createAction, props } from '@ngrx/store';
import { TuiDayRange, TuiMonth } from '@taiga-ui/cdk';
import { ExamScheduleModel, StudyScheduleModel } from '@tss/api';
import { GoogleCalendarEvent } from '@utconnect/types';

export class TssCalendarApiAction {
  static readonly loadPersonalStudySuccessful = createAction(
    '[TSS Calendar/API] Load personal study Successfully',
    props<{ schedules: StudyScheduleModel[]; ranges: TuiDayRange[] }>(),
  );

  static readonly loadPersonalStudyFailure = createAction(
    '[TSS Calendar/API] Load personal study Failed',
  );

  static readonly loadPersonalExamSuccessful = createAction(
    '[TSS Calendar/API] Load Exam Successfully',
    props<{ schedules: ExamScheduleModel[]; ranges: TuiDayRange[] }>(),
  );

  static readonly loadPersonalExamFailure = createAction(
    '[TSS Calendar/API] Load Exam Failed',
  );

  static readonly loadDepartmentStudySuccessful = createAction(
    '[TSS Calendar/API] Load department study Successfully',
    props<{ schedules: StudyScheduleModel[]; ranges: TuiDayRange[] }>(),
  );

  static readonly loadDepartmentStudyFailure = createAction(
    '[TSS Calendar/API] Load department study Failed',
  );

  static readonly loadDepartmentExamSuccessful = createAction(
    '[TSS Calendar/API] Load department exam Successfully',
    props<{ schedules: ExamScheduleModel[]; ranges: TuiDayRange[] }>(),
  );

  static readonly loadDepartmentExamFailure = createAction(
    '[TSS Calendar/API] Load department exam Failed',
  );

  static readonly loadGoogleCalendarSuccessful = createAction(
    '[TSS Calendar/API] Load Google calendar Successfully',
    props<{ events: GoogleCalendarEvent[]; ranges: TuiDayRange[] }>(),
  );

  static readonly loadGoogleCalendarFailure = createAction(
    '[TSS Calendar/API] Load Google calendar Failed',
  );

  static readonly prev = createAction(
    '[TSS Calendar/API] Prev',
    props<{ date: Date }>(),
  );

  static readonly next = createAction(
    '[TSS Calendar/API] Next',
    props<{ date: Date }>(),
  );

  static readonly changeMonth = createAction(
    '[TSS Calendar/API] Choose Month',
    props<{ month: TuiMonth; date: Date }>(),
  );
}
