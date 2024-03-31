import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import {
  REQUIRED_STEP_LIST_TOKEN,
  REQUIRED_STEP_STEP_TOKEN,
} from './required-step.tokens';

export const TAIGA_UI = [TuiLinkModule, TuiLoaderModule];

@Component({
  selector: 'utconnect-required-step',
  standalone: true,
  imports: [CommonModule, RouterModule, LetModule, ...TAIGA_UI],
  templateUrl: './required-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredStepComponent {
  // INJECT PROPERTIES
  readonly steps$ = inject(REQUIRED_STEP_LIST_TOKEN);
  readonly currentStep$ = inject(REQUIRED_STEP_STEP_TOKEN);

  // INPUTS
  @Input() minimumStep!: number;
}
