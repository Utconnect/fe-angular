import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiSvgModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ScheduleConstant } from '@tss/constants';
import { StatusColorPipe } from '@tss/pipes';
import { FixedScheduleModel } from '@utconnect/types';

const TAIGA_UI = [TuiSvgModule];

@Component({
  selector: 'tss-change-schedule-history-dialog',
  templateUrl: './change-schedule-history.component.html',
  styleUrls: ['./change-schedule-history.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, StatusColorPipe, ...TAIGA_UI],
})
export class TssChangeScheduleHistoryDialogComponent {
  // PUBLIC PROPERTIES
  readonly statusList = ScheduleConstant.REQUEST_CHANGE_SCHEDULE_STATUS;

  // CONSTRUCTOR
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<void, FixedScheduleModel[]>,
  ) {}
}
