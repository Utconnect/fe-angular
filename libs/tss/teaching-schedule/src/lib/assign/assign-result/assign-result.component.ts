import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { ModuleClass } from '@tss/api';
import { combineLatest, map, Observable } from 'rxjs';
import { TssTeachingScheduleAssignTableComponent } from '../assign-table';
import { TssTeachingScheduleAssignStore } from '../store';

@Component({
  selector: 'tss-teaching-schedule-assign-result',
  templateUrl: './assign-result.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TssTeachingScheduleAssignTableComponent, LetModule],
})
export class TssTeachingScheduleAssignResultComponent {
  // INJECTIONS
  private readonly store = inject(TssTeachingScheduleAssignStore);
  // PUBLIC PROPERTIES
  data$!: Observable<ModuleClass[]>;

  // PRIVATE METHODS
  private assigned$ = this.store.assigned$;
  private selectedTeacher$ = this.store.teacher$('selected');

  // CONSTRUCTOR
  constructor() {
    this.triggerChangeData();
  }

  // PRIVATE METHODS
  private triggerChangeData(): void {
    this.data$ = combineLatest([this.assigned$, this.selectedTeacher$]).pipe(
      map(([assigned, teacher]) =>
        teacher
          ? assigned.filter((x) => x.teacher === teacher?.name)
          : assigned,
      ),
    );
  }
}
