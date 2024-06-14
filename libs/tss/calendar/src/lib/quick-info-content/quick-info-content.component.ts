import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Input,
} from '@angular/core';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { EjsScheduleModel } from '@utconnect/types';
import { TssCalendarQuickInfoContentCellComponent } from './quick-info-content-cell';
import { TssCalendarQuickInfoContentEventComponent } from './quick-info-content-event';

@Component({
  selector: 'tss-calendar-quick-info-content',
  templateUrl: './quick-info-content.component.html',
  styleUrls: ['./quick-info-content.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TssCalendarQuickInfoContentCellComponent,
    TssCalendarQuickInfoContentEventComponent,
  ],
  providers: [
    tuiButtonOptionsProvider({
      size: 's',
    }),
  ],
})
export class TssCalendarQuickInfoContentComponent {
  // INPUT
  @Input() data!: EjsScheduleModel;

  // PUBLIC PROPERTIES
  newEventTitle = '';

  // CONSTRUCTOR
  constructor(
    @Inject(forwardRef(() => ScheduleComponent))
    readonly schedule: ScheduleComponent,
  ) {}
}
