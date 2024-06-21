import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { ObservableHelper } from '@utconnect/helpers';
import { Nullable, SimpleModel } from '@utconnect/types';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { TssTeachingScheduleAssignStore } from '../store';

const TAIGA_UI = [
  TuiSelectModule,
  TuiDataListModule,
  TuiButtonModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'tss-teaching-schedule-assign-left-title',
  templateUrl: './assign-left-title.component.html',
  styleUrls: ['./assign-left-title.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, LetModule, ...TAIGA_UI],
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'primary',
      size: 's',
    }),
  ],
})
export class TssTeachingScheduleAssignLeftTitleComponent {
  // INJECTIONS
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(TssTeachingScheduleAssignStore);

  // PUBLIC PROPERTIES
  needAssign$ = this.store.needAssign$;
  teachers$ = this.store.teacher$('data');
  assignStatus$ = this.store.status$('assign');
  selectedTeacher$ = this.store.teacher$('action');
  someNeedAssignCheckedChange$!: Observable<boolean>;

  // PRIVATE PROPERTIES
  private assignedTeacher$ = this.store.teacher$('action');

  // CONSTRUCTOR
  constructor() {
    this.needAssign$ = this.store.needAssign$;
    this.teachers$ = this.store.teacher$('data');
    this.assignStatus$ = this.store.status$('assign');
    this.assignedTeacher$ = this.store.teacher$('action');
    this.selectedTeacher$ = this.store.teacher$('selected');

    this.handleSomeNeedAssignChecked();
    this.handleAssignSuccessful();
  }

  // PUBLIC METHODS
  selectedTeacherChange(teacher: Nullable<SimpleModel>): void {
    this.store.changeSelectedTeacher(teacher);
  }

  assign(): void {
    this.store.assign();
  }

  // PRIVATE METHODS
  private handleSomeNeedAssignChecked(): void {
    this.someNeedAssignCheckedChange$ = this.store.selectedNeedAssign$.pipe(
      map((needAssign) => needAssign.some((x) => x)),
      distinctUntilChanged(),
    );
  }

  private handleAssignSuccessful(): void {
    this.assignStatus$
      .pipe(
        withLatestFrom(
          this.assignedTeacher$,
          this.store.teacher$('actionCount'),
        ),
        map(([status, teacher, count]) => ({ status, teacher, count })),
        filter(({ status, count }) => status === 'success' && !!count),
        ObservableHelper.filterNullishProp(['teacher']),
        switchMap(({ teacher, count }) =>
          this.alertService.open(
            `Đã phân công ${count} lớp cho giảng viên\n ${teacher.name}`,
            { status: TuiNotification.Success },
          ),
        ),
      )
      .subscribe();
  }
}
