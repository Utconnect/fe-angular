import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auth',
  standalone: true,
})
export class AuthPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
