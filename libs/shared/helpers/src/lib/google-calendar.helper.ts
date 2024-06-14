import { GoogleCalendar } from '@utconnect/types';

export class GoogleCalendarHelper {
  static isReadonly(calendar: GoogleCalendar): boolean {
    return (
      calendar.accessRole === 'freeBusyReader' ||
      calendar.accessRole === 'reader'
    );
  }
}
