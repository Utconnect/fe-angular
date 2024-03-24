import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiHostedDropdownModule,
  tuiButtonOptionsProvider,
} from '@taiga-ui/core';
import { TuiBadgedContentModule } from '@taiga-ui/kit';
import { fadeInOut } from '@utconnect/animations';
import { NotificationListComponent } from '../notification-list';

const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiBadgedContentModule,
  TuiButtonModule,
  TuiHostedDropdownModule,
];

@Component({
  selector: 'utconnect-bell',
  standalone: true,
  imports: [CommonModule, NotificationListComponent, ...TAIGA_UI],
  templateUrl: './bell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'flat',
      shape: 'rounded',
      size: 's',
    }),
  ],
  animations: [fadeInOut],
})
export class BellComponent {
  // PUBLIC PROPERTIES
  openDropdown = false;
}
