import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import {
  TuiAxesModule,
  TuiBarChartModule,
  TuiLineHandler,
} from '@taiga-ui/addon-charts';
import { TuiHintModule, TuiLoaderModule } from '@taiga-ui/core';
import { ChangeSchedule } from '@tss/api';
import { ChangeStatusHelper } from '@tss/helpers';
import { ObjectHelper, StringHelper } from '@utconnect/helpers';
import { SimpleModel } from '@utconnect/types';
import { combineLatest, filter, tap } from 'rxjs';
import { TssStatisticChangeScheduleStore } from '../store';

const TAIGA_UI = [
  TuiAxesModule,
  TuiBarChartModule,
  TuiHintModule,
  TuiLoaderModule,
];

type TeacherData = { [key: string]: { accept: number; deny: number } };

@Component({
  selector: 'tss-statistic-change-schedule-chart',
  templateUrl: './change-schedule-chart.component.html',
  styleUrls: ['./change-schedule-chart.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
})
export class TssStatisticChangeScheduleChartComponent {
  // INJECTIONS
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(TssStatisticChangeScheduleStore);

  // PUBLIC PROPERTIES
  teachersNameList: string[] = [];

  value: [number[], number[]] = [[], []];
  labelsX: string[] = [];
  labelsY: string[] = [];
  axisYLabels: string[] = [];
  max = 0;

  readonly setNames = ['Đã đổi', 'Bị từ chối'];
  readonly status$ = this.store.status$;
  readonly teachersList$ = this.store.teachersInDepartment$;

  // PRIVATE PROPERTIES
  private readonly data$ = this.store.data$;

  readonly horizontalLinesHandler: TuiLineHandler = (index, total) => {
    return index === 0 || (total - index) % 5 === 0 ? 'none' : 'dashed';
  };

  // CONSTRUCTOR
  constructor() {
    this.handleChangeScheduleChange();
  }

  // PRIVATE METHODS
  private handleChangeScheduleChange(): void {
    combineLatest([this.data$, this.teachersList$])
      .pipe(
        filter(
          ([changeSchedules, teachersList]) =>
            !!changeSchedules && teachersList.length > 0,
        ),
        tap(([changeSchedules, teachersList]) =>
          this.calculateChartData(changeSchedules, teachersList),
        ),
      )
      .subscribe();
  }

  private calculateChartData(
    changeSchedules: ChangeSchedule[],
    teachersList: SimpleModel[],
  ): void {
    const teacherData = teachersList.reduce<TeacherData>((acc, { id }) => {
      acc[id] = { accept: 0, deny: 0 };
      return acc;
    }, {});

    changeSchedules.forEach(({ teacher, status }) => {
      const id = teacher.id;
      if (ChangeStatusHelper.isApproved(status)) {
        teacherData[id].accept++;
      } else {
        teacherData[id].deny++;
      }
    });

    const newValue: [number[], number[]] = [[], []];
    const newTeachersList: string[] = [];
    const labelsX: string[] = [];
    let maxHeight = 0;

    ObjectHelper.toArray(teacherData).forEach(({ id, value }) => {
      const name = teachersList.find((t) => t.id === id)?.name;
      if (name) {
        labelsX.push(StringHelper.shortenName(name));
        newValue[0].push(value.accept);
        newValue[1].push(value.deny);
        newTeachersList.push(name);
        maxHeight = Math.max(maxHeight, value.accept, value.deny);
      }
    });

    this.value = newValue;
    this.labelsY = [...Array(maxHeight + 1).keys()].map((x, i, { length }) =>
      x % 5 === 0 || i === length - 1 ? `${x}` : '',
    );
    this.max = maxHeight;
    this.labelsX = labelsX;
    this.teachersNameList = newTeachersList;
    this.cdr.markForCheck();
  }
}
