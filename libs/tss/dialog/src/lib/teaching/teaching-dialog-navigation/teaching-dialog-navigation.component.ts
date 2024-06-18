import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TuiButtonModule, tuiButtonOptionsProvider } from '@taiga-ui/core';
import { EjsScheduleModel } from '@utconnect/types';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-teaching-dialog-navigation',
  templateUrl: './teaching-dialog-navigation.component.html',
  styleUrls: ['./teaching-dialog-navigation.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ...TAIGA_UI],
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'flat',
      size: 'm',
    }),
  ],
})
export class TssTeachingDialogNavigationComponent {
  // INPUT
  @Input() schedules!: EjsScheduleModel[];
  @Input() selectedSchedule!: EjsScheduleModel;

  // OUTPUT
  @Output() changeSelectedSchedule = new EventEmitter<number | string>();
}
