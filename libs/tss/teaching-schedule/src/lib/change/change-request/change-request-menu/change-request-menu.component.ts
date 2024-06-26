import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, tuiButtonOptionsProvider } from '@taiga-ui/core';
import { TssTeachingScheduleChangeRequestFilterLeftComponent } from '../change-request-filter-left';

const TAIGA_UI = [TuiActiveZoneModule, TuiButtonModule, TuiSidebarModule];

@Component({
  selector: 'tss-teaching-schedule-change-request-menu',
  templateUrl: './change-request-menu.component.html',
  styleUrls: ['./change-request-menu.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'icon',
      size: 'm',
    }),
  ],
  imports: [
    CommonModule,
    ...TAIGA_UI,
    TssTeachingScheduleChangeRequestFilterLeftComponent,
  ],
})
export class TssTeachingScheduleChangeRequestMenuComponent {
  // PUBLIC PROPERTIES
  openRightMenu = false;

  // PUBLIC METHODS
  toggleRightMenu(open: boolean): void {
    this.openRightMenu = open;
  }
}
