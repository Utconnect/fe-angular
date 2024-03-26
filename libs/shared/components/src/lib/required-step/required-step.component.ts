import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { ExaminationStatus, ExaminationSummary } from '@esm/data';
import { MinimumExaminationStatusDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';

export const TAIGA_UI = [TuiLinkModule, TuiLoaderModule];

@Component({
  selector: 'utconnect-required-step',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    PolymorpheusModule,
    MinimumExaminationStatusDirective,
    ...TAIGA_UI,
  ],
  templateUrl: './required-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredStepComponent {
  // INPUTS
  @Input() minimumStatus: ESMDomainEnumsExaminationStatus =
    ESMDomainEnumsExaminationStatus.Closed;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Input() getDataFunc: () => void = () => {};
  @Input() showLoader: Observable<boolean> | boolean = false;

  // PUBLIC PROPERTIES
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly context!: {
    $implicit: ExaminationStatus | null;
    status: ExaminationStatus;
    examination: ExaminationSummary;
  };
}
