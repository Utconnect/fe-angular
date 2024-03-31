import { Pipe, PipeTransform } from '@angular/core';
import { ESMDomainEnumsExamMethod } from '@esm/api';
import { EsmStringHelper } from '@esm/helpers';

@Pipe({
  name: 'esmExamMethod',
  standalone: true,
})
export class EsmExamMethodPipe implements PipeTransform {
  transform(method: ESMDomainEnumsExamMethod): string {
    return EsmStringHelper.getExamMethod(method);
  }
}
