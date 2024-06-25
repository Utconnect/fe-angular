import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { ModuleClass } from '@tss/api';
import { Observable } from 'rxjs';
import { TssTeachingScheduleAssignTableComponent } from '../assign-table';
import { TssTeachingScheduleAssignStore } from '../store';

@Component({
  selector: 'tss-teaching-schedule-assign-list',
  templateUrl: './assign-list.component.html',
  styleUrls: ['./assign-list.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TssTeachingScheduleAssignTableComponent, LetModule],
})
export class TssTeachingScheduleAssignListComponent {
  // PUBLIC PROPERTIES
  data$: Observable<ModuleClass[]>;

  // CONSTRUCTOR
  constructor(store: TssTeachingScheduleAssignStore) {
    this.data$ = store.needAssign$;
  }
}
