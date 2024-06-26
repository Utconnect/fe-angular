import { Pipe, PipeTransform } from '@angular/core';
import { TuiDayRange } from '@taiga-ui/cdk';
import { Nullable } from '@utconnect/types';

@Pipe({
  name: 'inputDateRangeDateText',
  standalone: true,
})
export class InputDateRangeDateTextPipe implements PipeTransform {
  transform(range: Nullable<TuiDayRange>): string {
    if (!range) {
      return '';
    }

    const { from, to } = range;
    return `${from.day}.${from.month + 1}.${from.year} - ${to.day}.${
      to.month + 1
    }.${to.year}`;
  }
}
