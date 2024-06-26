import { Pipe, PipeTransform } from '@angular/core';
import { ChangeStatusHelper } from '@tss/helpers';
import { RequestChangeScheduleType } from '@tss/types';
import { Nullable } from '@utconnect/types';

@Pipe({
  name: 'tssTeachingScheduleChangeRequestListActionStatusType',
  standalone: true,
})
export class TssTeachingScheduleChangeRequestListActionStatusTypePipe
  implements PipeTransform
{
  transform(value: number): Nullable<RequestChangeScheduleType> {
    return ChangeStatusHelper.getType(value);
  }
}
