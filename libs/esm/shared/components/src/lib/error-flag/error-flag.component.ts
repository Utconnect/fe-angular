import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiDropdownModule } from '@taiga-ui/core';

const TAIGA_UI = [TuiDropdownModule];

@Component({
  selector: 'esm-component-error-flag',
  templateUrl: './error-flag.component.html',
  styleUrls: ['./error-flag.component.less'],
  standalone: true,
  imports: [CommonModule, ...TAIGA_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsmErrorFlagComponent {
  // INPUT
  @Input() error?: string;
}
