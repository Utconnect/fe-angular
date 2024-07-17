import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiDialogContext, TuiSvgModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ScheduleConstant } from '@tss/constants';
import { TssStatusColorPipe } from '@tss/pipes';
import { FixedScheduleModel } from '@utconnect/types';

const TAIGA_UI = [TuiSvgModule];

@Component({
  selector: 'tss-change-schedule-history-dialog',
  templateUrl: './change-schedule-history.component.html',
  styleUrls: ['./change-schedule-history.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TssStatusColorPipe, ...TAIGA_UI],
})
export class TssChangeScheduleHistoryDialogComponent {
  // INJECTIONS
  public readonly context =
    inject<TuiDialogContext<void, FixedScheduleModel[]>>(POLYMORPHEUS_CONTEXT);

  // PUBLIC PROPERTIES
  readonly statusList = ScheduleConstant.REQUEST_CHANGE_SCHEDULE_STATUS;
}
