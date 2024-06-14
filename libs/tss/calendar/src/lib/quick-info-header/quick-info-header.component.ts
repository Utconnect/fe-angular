import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiButtonModule, tuiButtonOptionsProvider } from '@taiga-ui/core';
import { EjsScheduleModel } from '@utconnect/types';

const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'tss-calendar-quick-info-header',
  templateUrl: './quick-info-header.component.html',
  styleUrls: ['./quick-info-header.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'flat-white',
      shape: 'rounded',
      size: 's',
    }),
  ],
})
export class TssCalendarQuickInfoHeaderComponent {
  // INPUT
  @Input() data!: EjsScheduleModel;

  // OUTPUT
  @Output() remove = new EventEmitter<void>();
  @Output() showEditorDialog = new EventEmitter<void>();
  @Output() closeDialog = new EventEmitter<void>();
}
