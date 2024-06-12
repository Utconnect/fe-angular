import { View } from '@syncfusion/ej2-angular-schedule';
import { TuiDayRange, TuiMonth } from '@taiga-ui/cdk';
import {
  Activatable,
  CalendarFilter,
  ExamScheduleModel,
  StudyScheduleModel,
} from '@tss/api';
import { GoogleCalendarEvent, Status } from '@utconnect/types';

export interface CalendarState {
  status: Status;
  filter: Activatable<CalendarFilter>;
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
  view: View;
  selectedDate: Date;
  month: TuiMonth;
}
