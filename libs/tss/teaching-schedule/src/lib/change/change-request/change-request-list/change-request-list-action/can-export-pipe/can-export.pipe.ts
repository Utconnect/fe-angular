import { Pipe, PipeTransform } from '@angular/core';
import { ChangeStatusHelper } from '@tss/helpers';

@Pipe({
  name: 'tssTeachingScheduleChangeRequestListActionCanExport',
  standalone: true,
})
export class TssTeachingScheduleChangeRequestListActionCanExportPipe
  implements PipeTransform
{
  transform(value: number): boolean {
    return ChangeStatusHelper.canExport(value);
  }
}
