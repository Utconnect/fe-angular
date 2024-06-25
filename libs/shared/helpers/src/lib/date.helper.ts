import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { TuiDayRangePeriod } from '@taiga-ui/kit';

export class DateHelper {
  static readonly TIMEZONE_OFFSET = -25_200_000; // = -420 * 60_000 milliseconds

  // To string
  static beautifyDay(day: number): string {
    return `0${day}`.slice(-2);
  }

  static beautifyTime(dt: Date): string {
    return [
      DateHelper.beautifyDay(dt.getHours()),
      DateHelper.beautifyDay(dt.getMinutes()),
    ].join(':');
  }

  static toDateOnlyString(date: Date): string {
    return new Date(date.valueOf() - this.TIMEZONE_OFFSET)
      .toISOString()
      .split('T')[0];
  }

  static toSqlDate(date: Date): string {
    return new Date(date.valueOf() - this.TIMEZONE_OFFSET)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }

  static format(date: Date | TuiDay): string {
    if (date instanceof Date) {
      return this.toTuiDay(date).getFormattedDay('YMD', '-');
    }
    return date.getFormattedDay('YMD', '-');
  }

  // From other types
  static fromShift(
    date: Date,
    shift: string,
    map: { [key: string]: { start: number[]; end: number[] } },
  ): [Date, Date] {
    const end = new Date(date.getTime());

    date.setHours(map[shift].start[0]);
    date.setMinutes(map[shift].start[1]);
    end.setHours(map[shift].end[0]);
    end.setMinutes(map[shift].end[1]);

    return [date, end];
  }

  // To other types
  static toTuiDay(date: Date): TuiDay {
    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Calculation
  static weekIncludedByTwoMonths(date: Date): boolean {
    const dow = date.getDay();
    const first = new Date(date);
    const last = new Date(date);
    const lastSunday = date.getDate() - dow;

    if (dow) {
      first.setDate(lastSunday + 1);
      last.setDate(lastSunday + 1);
    } else {
      first.setDate(date.getDate() - 6);
    }

    return first.getMonth() === last.getMonth();
  }

  static add(day: Date, amount: number): Date {
    day.setDate(day.getDate() + amount);
    return day;
  }

  static subtract(day: Date, amount: number): Date {
    day.setDate(day.getDate() - amount);
    return day;
  }

  static sameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  static dateAtZero(date = new Date()): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  static getPeriods(): ReadonlyArray<TuiDayRangePeriod> {
    const today = TuiDay.currentLocal();
    const startOfMonth = today.append({ day: 1 - today.day });
    const startOfYear = new TuiDay(today.year, 0, 1);

    return [
      new TuiDayRangePeriod(
        new TuiDayRange(
          startOfMonth,
          startOfMonth.append({ month: 1, day: -1 }),
        ),
        `Tháng hiện tại (tháng ${startOfMonth.month + 1})`,
      ),
      new TuiDayRangePeriod(
        new TuiDayRange(
          startOfMonth.append({ month: -1 }),
          startOfMonth.append({ day: -1 }),
        ),
        `Tháng trước (tháng ${startOfMonth.month || 12})`,
      ),
      new TuiDayRangePeriod(
        new TuiDayRange(startOfYear, startOfYear.append({ year: 1, day: -1 })),
        `Năm hiện tại (năm ${startOfYear.year})`,
      ),
      new TuiDayRangePeriod(
        new TuiDayRange(
          startOfYear.append({ year: -1 }),
          startOfYear.append({ day: -1 }),
        ),
        `Năm trước (năm ${startOfYear.year - 1})`,
      ),
    ];
  }

  static getPreviousMonthRange(): TuiDayRange {
    return this.getPeriods()[1].range;
  }
}
