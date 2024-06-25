import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { ModuleClass } from '@tss/api';
import { Nullable, SimpleModel } from '@utconnect/types';
import { combineLatest, map, Observable } from 'rxjs';
import { TssTeachingScheduleAssignTableComponent } from '../assign-table';
import { TssTeachingScheduleAssignStore } from '../store';

@Component({
  selector: 'tss-teaching-schedule-assign-result',
  templateUrl: './assign-result.component.html',
  styleUrls: ['./assign-result.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TssTeachingScheduleAssignTableComponent, LetModule],
})
export class TssTeachingScheduleAssignResultComponent {
  // PUBLIC PROPERTIES
  data$!: Observable<ModuleClass[]>;

  // PRIVATE METHODS
  private assigned$: Observable<ModuleClass[]>;
  private selectedTeacher$: Observable<Nullable<SimpleModel>>;

  // CONSTRUCTOR
  constructor(store: TssTeachingScheduleAssignStore) {
    this.assigned$ = store.assigned$;
    this.selectedTeacher$ = store.teacher$('selected');

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
