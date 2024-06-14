import { Pipe, PipeTransform } from '@angular/core';
import { StringHelper } from '@utconnect/helpers';

@Pipe({
  name: 'shortenName',
  standalone: true,
})
export class ShortenNamePipe implements PipeTransform {
  transform(value: string): string {
    return StringHelper.shortenName(value);
  }
}
