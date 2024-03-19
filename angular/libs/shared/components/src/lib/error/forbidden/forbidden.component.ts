import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error.component';

@Component({
  selector: 'utconnect-forbidden',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenComponent {}
