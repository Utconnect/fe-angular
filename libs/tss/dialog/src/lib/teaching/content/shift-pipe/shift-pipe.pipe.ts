import { Pipe, PipeTransform } from '@angular/core';
import { ShiftConstant } from '@utconnect/constants';
import { DateHelper } from '@utconnect/helpers';
import { Nullable } from '@utconnect/types';

@Pipe({
  name: 'shift',
  standalone: true,
})
export class TssTeachingDialogShiftPipe implements PipeTransform {
  // PUBLIC METHODS
  transform(shiftKey: Nullable<string>): string {
    if (!shiftKey) return '';

    const shift = ShiftConstant.SHIFTS[shiftKey];
    return `Ca ${shiftKey} (${this.beautify(shift.start[0])}:${this.beautify(
      shift.start[1],
    )} - ${this.beautify(shift.end[0])}:${this.beautify(shift.end[1])})`;
  }

  // PRIVATE METHODS
  private beautify(value: number): string {
    return DateHelper.beautifyDay(value);
  }
}
