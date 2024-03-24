import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { ExaminationEditFinishExaminationStore } from './finish-examination.store';

export const TAIGA_UI = [TuiButtonModule, TuiIslandModule];

@Component({
  selector: 'esm-examination-edit-finish-examination',
  standalone: true,
  imports: [CommonModule, LetModule, TAIGA_UI],
  templateUrl: './finish-examination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationEditFinishExaminationStore],
})
export class ExaminationEditFinishExaminationComponent {
  // INJECT PROPERTIES
  private readonly store = inject(ExaminationEditFinishExaminationStore);

  // PUBLIC PROPERTIES
  readonly status$ = this.store.status$;

  // PUBLIC METHODS
  onFinish(): void {
    this.store.finish();
  }
}
