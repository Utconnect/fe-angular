import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error.component';

@Component({
  selector: 'utconnect-not-found',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
