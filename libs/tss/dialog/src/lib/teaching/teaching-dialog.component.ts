import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogContext,
  TuiScrollbarModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangedScheduleModel } from '@tss/api';
import { ChangeStatusHelper } from '@tss/helpers';
import { IconConstant } from '@utconnect/constants';
import { FixedScheduleModel, TssTeachingModel } from '@utconnect/types';
import { TssTeachingDialogContentComponent } from './content';
import { TssTeachingDialogHistoryDirective } from './history-directive';
import { TssTeachingDialogChange, TssTeachingDialogStore } from './store';
import { TssTeachingDialogNavigationComponent } from './teaching-dialog-navigation';

const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiButtonModule,
  TuiScrollbarModule,
  TuiSidebarModule,
  TuiSvgModule,
];

@Component({
  selector: 'tss-teaching-dialog',
  templateUrl: './teaching-dialog.component.html',
  styleUrls: ['./teaching-dialog.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TssTeachingDialogContentComponent,
    TssTeachingDialogHistoryDirective,
    TssTeachingDialogNavigationComponent,
    ...TAIGA_UI,
  ],
  providers: [
    TssTeachingDialogStore,
    tuiButtonOptionsProvider({
      appearance: 'outline',
      size: 'm',
    }),
  ],
})
export class TssTeachingDialogComponent {
  // INJECTIONS
  public readonly context =
    inject<
      TuiDialogContext<
        TssTeachingModel[],
        { schedules: TssTeachingModel[]; selectedId: number }
      >
    >(POLYMORPHEUS_CONTEXT);

  // PUBLIC PROPERTIES
  readonly IconConstant = IconConstant;
  schedules = this.context.data.schedules;
  openScheduleList = false;
  changedSchedule: ChangedScheduleModel =
    this.context.data.schedules.reduce<ChangedScheduleModel>((acc, { Id }) => {
      acc[Id] = null;
      return acc;
    }, {});
  selectedSchedule!: TssTeachingModel;

  // PRIVATE PROPERTIES
  private haveOpened = false;
  private needUpdateAfterClose = false;

  // GETTERS
  private get currentSelected(): TssTeachingModel {
    return (
      this.schedules.find(({ Id }) => Id === this.selectedSchedule.Id) ||
      this.selectedSchedule
    );
  }

  // SETTERS
  private set currentSelected(schedule: TssTeachingModel) {
    this.schedules = this.schedules.map((s) => {
      if (s.Id === this.selectedSchedule.Id) {
        this.selectedSchedule = schedule;
        return schedule;
      }
      return s;
    });
  }

  // CONSTRUCTOR
  constructor() {
    this.onChangeSelectedSchedule(this.context.data.selectedId);
  }

  // PUBLIC METHODS
  toggleScheduleList(open: boolean, needCheck = false): void {
    if (!open || !needCheck || this.haveOpened) {
      this.openScheduleList = open;
      this.haveOpened = true;
    }
  }

  onChangeSelectedSchedule(scheduleId: number | string): void {
    const newSelectSchedule = this.schedules.find(
      ({ Id }) => Id === scheduleId,
    );
    if (newSelectSchedule) {
      this.selectedSchedule = newSelectSchedule;
    }
  }

  onUpdateSchedule(schedule: FixedScheduleModel): void {
    const copy = { ...this.currentSelected };
    copy.FixedSchedules = [
      schedule,
      ...(this.selectedSchedule.FixedSchedules?.filter(({ isNew }) => !isNew) ??
        []),
    ];
    this.currentSelected = copy;
    this.needUpdateAfterClose = true;
  }

  onChangeScheduleInfo(changes: TssTeachingDialogChange): void {
    const copy = { ...this.currentSelected };
    copy.Note = changes.note;
    this.currentSelected = copy;
    this.needUpdateAfterClose = true;
  }

  onCancelRequest(): void {
    this.currentSelected.FixedSchedules =
      this.selectedSchedule.FixedSchedules?.filter(
        (x) => !x.isNew && !ChangeStatusHelper.isPending(x.status),
      );
  }

  onCancel(): void {
    setTimeout(() => {
      if (this.needUpdateAfterClose) {
        this.context.completeWith(this.schedules);
      } else {
        this.context.$implicit.complete();
      }
    });
  }
}
