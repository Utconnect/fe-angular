import { Pipe, PipeTransform } from '@angular/core';

type Operator = 'in' | 'map';
type OperatorParam<T> = {
  in: T;
  map: (value: T, index: number) => T;
};
type OperatorResult<T> = {
  in: boolean;
  map: T[];
};

@Pipe({
  name: 'array',
  standalone: true,
})
export class ArrayPipe implements PipeTransform {
  transform<T>(value: T[], operator: 'in', param: T): boolean;
  transform<T>(
    value: T[],
    operator: 'map',
    param: (value: T, index: number) => T,
  ): T[];

  transform<T, O extends Operator>(
    value: T[],
    operator: O,
    param: OperatorParam<T>[O],
  ): OperatorResult<T>[Operator] {
    if (operator === 'in') {
      return value.includes(param as OperatorParam<T>['in']);
    }

    if (operator === 'map') {
      return value.map(param as OperatorParam<T>['map']);
    }

    throw Error('Invalid operator');
  }
}
