import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { LetModule } from '@ngrx/component';
import { TuiButtonModule } from '@taiga-ui/core';
import { InvigilatorAssignRoomStore } from '../assign-room.store';

export const TAIGA_UI = [TuiButtonModule];

@Component({
  selector: 'esm-invigilator-assign-room-header',
  standalone: true,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvigilatorAssignRoomHeaderComponent {
  // INJECT PROPERTIES
  private readonly store = inject(InvigilatorAssignRoomStore);

  // OUTPUTS
  @Output() save = new EventEmitter<void>();

  // PUBLIC PROPERTIES
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly headerObservables$ = this.store.headerObservables$;

  // PUBLIC METHODS
  autoAssign(): void {
    this.store.autoAssign();
  }
}
