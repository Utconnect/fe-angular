import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

type Method = 'entries' | 'values' | 'extract';

@Pipe({
  name: 'object',
  standalone: true,
})
export class ObjectPipe<T extends object> implements PipeTransform {
  transform(
    value: Record<string, T>,
    method: 'entries',
  ): { key: string; value: T }[];
  transform(value: T, method: 'entries'): { key: string; value: unknown }[];
  transform(value: Record<string, T>, method: 'values'): T[];
  transform(value: T, method: 'values'): unknown[];
  transform(value: T, method: 'extract', path: string): unknown[];

  transform(
    value: T | Record<string, T>,
    method: Method,
    ...args: unknown[]
  ): unknown {
    if (method === 'entries') {
      return Object.entries(value);
    }

    if (method === 'values') {
      return Object.values(value);
    }

    if (method === 'extract') {
      const path = args[0];
      if (!path || typeof path !== 'string') {
        throw new Error(`Not implemented ${method} on ObjectPipe`);
      }

      return get(value, path);
    }

    throw new Error(`Not implemented ${method} on ObjectPipe`);
  }
}
