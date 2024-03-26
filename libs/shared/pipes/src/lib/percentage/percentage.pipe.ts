import { DecimalPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
  standalone: true,
})
export class PercentagePipe implements PipeTransform {
  private readonly numberPipe = inject(DecimalPipe);

  transform(value: number, divider?: number): string | null {
    const valueToTransform = divider ? (value / divider) * 100 : value;
    return this.numberPipe.transform(valueToTransform, '2.0-2') + '%';
  }
}
