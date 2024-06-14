import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '@utconnect/helpers';

type Method = 'format' | 'example';

@Pipe({
  name: 'dateRange',
  standalone: true,
})
export class DateRangePipe implements PipeTransform {
  transform([from, to]: [Date, Date], method: Method): string;

  transform(value: [Date, Date], method: Method): string {
    if (method === 'format') {
      return this.format(value[0], value[1]);
    }

    throw new Error(`Not implemented ${method} on DateRangePipe`);
  }

  private format(from: Date, to: Date): string {
    const fromDate = from.getDate();
    const fromMonth = from.getMonth() + 1;
    const fromYear = from.getFullYear();
    const fromTime = DateHelper.beautifyTime(from);
    const toTime = DateHelper.beautifyTime(to);

    if (DateHelper.sameDay(from, to)) {
      return `${fromDate} Tháng ${fromMonth}, ${fromYear}
      (${fromTime} - ${toTime})`;
    }

    return `${fromDate} Tháng ${fromMonth}, ${fromYear}
    (${fromTime}) -
    ${to.getDate()} Tháng ${to.getMonth() + 1}, ${to.getFullYear()}
    (${toTime})`;
  }
}
