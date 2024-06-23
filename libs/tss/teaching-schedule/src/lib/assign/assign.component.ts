import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TssTeachingScheduleAssignFilterComponent } from './assign-filter';
import { TssTeachingScheduleAssignLeftTitleComponent } from './assign-left-title';
import { TssTeachingScheduleAssignRightTitleComponent } from './assign-right-title';

@Component({
  selector: 'tss-teaching-schedule-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TssTeachingScheduleAssignFilterComponent,
    TssTeachingScheduleAssignLeftTitleComponent,
    TssTeachingScheduleAssignRightTitleComponent,
  ],
})
export class TssTeachingScheduleAssignComponent {}
