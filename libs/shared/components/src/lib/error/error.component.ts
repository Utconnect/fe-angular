import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

const TAIGA_UI = [TuiButtonModule];
@Component({
  selector: 'utconnect-error',
  standalone: true,
  imports: [CommonModule, RouterModule, ...TAIGA_UI],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  // INPUT
  @Input() code!: number;
  @Input() message!: string;
}
