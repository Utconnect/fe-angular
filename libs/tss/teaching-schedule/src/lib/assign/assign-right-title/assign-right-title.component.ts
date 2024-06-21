import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetModule } from '@ngrx/component';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiNotification,
} from '@taiga-ui/core';
import { fadeInOut } from '@utconnect/animations';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { TssTeachingScheduleAssignStore } from '../store';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-teaching-schedule-assign-right-title',
  templateUrl: './assign-right-title.component.html',
  styleUrls: ['./assign-right-title.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'primary',
      size: 's',
    }),
  ],
  animations: [fadeInOut],
})
export class TssTeachingScheduleAssignRightTitleComponent {
  // INJECTIONS
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(TssTeachingScheduleAssignStore);

  // PUBLIC PROPERTIES
  assigned$ = this.store.assigned$;
  unassignStatus$ = this.store.status$('unassign');
  someAssignedCheckedChange$!: Observable<boolean>;

  // CONSTRUCTOR
  constructor() {
    this.handleSomeAssignedChecked();
    this.handleUnassignSuccessful();
  }

  // PUBLIC METHODS
  unassign(): void {
    this.store.unassign();
  }

  // PRIVATE METHODS
  private handleSomeAssignedChecked(): void {
    this.someAssignedCheckedChange$ = this.store.selectedAssigned$.pipe(
      map((assigned) => assigned.some((x) => x)),
      distinctUntilChanged(),
    );
  }

  private handleUnassignSuccessful(): void {
    this.unassignStatus$
      .pipe(
        withLatestFrom(this.store.teacher$('actionCount')),
        filter(([status, count]) => status === 'success' && !!count),
        switchMap(({ 1: count }) =>
          this.alertService.open(`Đã hủy phân công ${count} lớp học phần`, {
            status: TuiNotification.Success,
          }),
        ),
      )
      .subscribe();
  }
}
