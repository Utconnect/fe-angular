import { ScheduleComponent, View } from '@syncfusion/ej2-angular-schedule';
import { DateHelper } from '../date.helper';

export class ScheduleHelper {
  static dayInCurrentView(
    schedule: ScheduleComponent,
    view: View,
    date: Date = new Date(),
  ): boolean {
    const currentViewDates = schedule.getCurrentViewDates();
    const first = currentViewDates[0];
    const last = currentViewDates[currentViewDates.length - 1];

    return (
      (view !== 'Day' && first <= date && date <= last) ||
      (view === 'Day' && DateHelper.sameDay(first, date))
    );
  }

  static generateSchoolYears(currentTerm: string): string[] {
    const curr = +currentTerm.split('_')[0] + 1;
    const result = [];

    for (let i = 0; i < 3; i++) {
      result.unshift(`${curr - i}_${curr - i + 1}`);
    }

    return result;
  }
}
