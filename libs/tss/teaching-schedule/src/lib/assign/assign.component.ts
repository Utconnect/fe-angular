import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TssTeachingScheduleAssignFilterComponent } from './assign-filter';
import { TssTeachingScheduleAssignLeftTitleComponent } from './assign-left-title';
import { TssTeachingScheduleAssignListComponent } from './assign-list';
import { TssTeachingScheduleAssignResultComponent } from './assign-result';
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
    TssTeachingScheduleAssignListComponent,
    TssTeachingScheduleAssignResultComponent,
  ],
})
export class TssTeachingScheduleAssignComponent {}
