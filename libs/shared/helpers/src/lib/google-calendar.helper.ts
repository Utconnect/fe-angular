import { GoogleCalendar } from '@utconnect/types';

export class GoogleCalendarHelper {
  static googleCalendarIsReadonly(calendar: GoogleCalendar): boolean {
    return (
      calendar.accessRole === 'freeBusyReader' ||
      calendar.accessRole === 'reader'
    );
  }
}
