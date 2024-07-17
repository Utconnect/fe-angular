import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiDialogContext, TuiSvgModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeSchedule } from '@tss/api';
import { ScheduleConstant } from '@tss/constants';
import { TssStatusColorPipe } from '@tss/pipes';

const TAIGA_UI = [TuiSvgModule];

@Component({
  selector: 'tss-change-report-details-dialog',
  templateUrl: './change-details-dialog.component.html',
  styleUrls: ['./change-details-dialog.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, TssStatusColorPipe, ...TAIGA_UI],
})
export class TssChangeDetailsDialogComponent {
  // INJECTIONS
  public readonly context =
    inject<TuiDialogContext<void, ChangeSchedule>>(POLYMORPHEUS_CONTEXT);

  // PUBLIC PROPERTIES
  readonly statusList = ScheduleConstant.REQUEST_CHANGE_SCHEDULE_STATUS;
}
