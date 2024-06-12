import { createAction, props } from '@ngrx/store';
import { View } from '@syncfusion/ej2-angular-schedule';
import { TuiDayRange, TuiMonth } from '@taiga-ui/cdk';
import {
  CalendarFilter,
  ExamScheduleModel,
  StudyScheduleModel,
} from '@tss/api';
import { GoogleCalendarEvent } from '@utconnect/types';

export class TssCalendarPageAction {
  static readonly reset = createAction('[TSS Calendar/Page] Reset');

  static readonly load = createAction(
    '[TSS Calendar/Page] Load',
    props<{ date: Date }>(),
  );

  static readonly prev = createAction(
    '[TSS Calendar/Page] Prev',
    props<{ oldSelectedDate: Date }>(),
  );

  static readonly next = createAction(
    '[TSS Calendar/Page] Next',
    props<{ oldSelectedDate: Date }>(),
  );

  static readonly changeMonth = createAction(
    '[TSS Calendar/Page] Choose Month',
    props<{ month: TuiMonth }>(),
  );

  static readonly changeView = createAction(
    '[TSS Calendar/Page] Change View',
    props<{ view: View }>(),
  );

  static readonly filter = createAction('[TSS Calendar/Page] Filter');

  static readonly resetFilter = createAction(
    '[TSS Calendar/Page] Reset Filter',
  );

  static readonly changeSelectingState = createAction(
    '[TSS Calendar/Page] Change selecting type',
    props<{ changes: Partial<CalendarFilter> }>(),
  );

  static readonly loadOfflineData = createAction(
    '[TSS Calendar/Page] Load offline data',
    props<{
      schedules: {
        personal: {
          study: StudyScheduleModel[];
          exam: ExamScheduleModel[];
          ranges: TuiDayRange[];
        };
        department: {
          study: StudyScheduleModel[];
          exam: ExamScheduleModel[];
          ranges: TuiDayRange[];
        };
      };
      googleCalendar: {
        events: GoogleCalendarEvent[];
        ranges: TuiDayRange[];
      };
    }>(),
  );
}
