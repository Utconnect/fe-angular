import { Pipe, PipeTransform } from '@angular/core';

type Operator = 'includes' | 'map';
type OperatorParam<T> = {
  includes: T;
  map: (value: T, index: number) => T;
};
type OperatorResult<T> = {
  includes: boolean;
  map: T[];
};

@Pipe({
  name: 'array',
  standalone: true,
})
export class ArrayPipe implements PipeTransform {
  transform<T>(array: T[], operator: 'includes', param: T): boolean;
  transform<T>(
    array: T[],
    operator: 'map',
    param: (value: T, index: number) => T,
  ): T[];

  transform<T, O extends Operator>(
    array: T[],
    operator: O,
    param: OperatorParam<T>[O],
  ): OperatorResult<T>[Operator] {
    if (operator === 'includes') {
      return array.includes(param as OperatorParam<T>['includes']);
    }

    if (operator === 'map') {
      return array.map(param as OperatorParam<T>['map']);
    }

    throw Error('Invalid operator');
  }
}
