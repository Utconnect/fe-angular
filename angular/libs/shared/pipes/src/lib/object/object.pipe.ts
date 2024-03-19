import { Pipe, PipeTransform } from '@angular/core';

type Method = 'entries' | 'values';

@Pipe({
  name: 'object',
  standalone: true,
})
export class ObjectPipe<T extends object> implements PipeTransform {
  transform(
    value: Record<string, T>,
    method: 'entries'
  ): { key: string; value: T }[];
  transform(value: T, method: 'entries'): { key: string; value: unknown }[];
  transform(value: Record<string, T>, method: 'values'): T[];
  transform(value: T, method: 'values'): unknown[];

  transform(value: T | Record<string, T>, method: Method): unknown {
    if (method === 'entries') {
      return Object.entries(value);
    }

    if (method === 'values') {
      return Object.values(value);
    }

    throw new Error(`Not implemented ${method} on ObjectPipe`);
  }
}
