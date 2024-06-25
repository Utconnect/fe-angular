import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiTabsModule } from '@taiga-ui/kit';
import { PermissionConstant } from '@tss/constants';
import { TssTeachingScheduleChangeStore } from './change.store';

@Component({
  selector: 'tss-teaching-schedule-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, TuiTabsModule],
  providers: [TssTeachingScheduleChangeStore],
})
export class TssTeachingScheduleChangeComponent {
  // PUBLIC PROPERTIES
  readonly PermissionConstant = PermissionConstant;
}
