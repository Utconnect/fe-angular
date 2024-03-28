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
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import {
  RequiredStepContext,
  RequiredStepDirective,
} from '@utconnect/directives';
import { Observable, tap } from 'rxjs';
import { REQUIRED_STEP_TOKEN } from './required-step.tokens';

export const TAIGA_UI = [TuiLinkModule, TuiLoaderModule];

@Component({
  selector: 'utconnect-required-step',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    PolymorpheusModule,
    RequiredStepDirective,
    ...TAIGA_UI,
  ],
  templateUrl: './required-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredStepComponent<T, TStep> {
  // CONTEXT
  readonly context!: RequiredStepContext<T, TStep>;

  // INJECT PROPERTIES
  readonly steps$ = inject(REQUIRED_STEP_TOKEN);

  // INPUTS
  @Input() minimumStep!: TStep;
  @Input() showLoader: Observable<boolean> | boolean = false;
  @Input() getDataFunc?: () => void;
}
