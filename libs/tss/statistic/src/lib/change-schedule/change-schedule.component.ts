import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TssStatisticChangeScheduleChartComponent } from './change-schedule-chart';
import { TssStatisticChangeScheduleFilterComponent } from './change-schedule-filter';

@Component({
  selector: 'tss-statistic-change-schedule',
  templateUrl: './change-schedule.component.html',
  styleUrls: ['./change-schedule.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TssStatisticChangeScheduleChartComponent,
    TssStatisticChangeScheduleFilterComponent,
  ],
})
export class TssStatisticChangeScheduleComponent {}
