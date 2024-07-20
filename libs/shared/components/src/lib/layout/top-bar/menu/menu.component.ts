import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import { TuiActionModule, TuiMarkerIconModule } from '@taiga-ui/kit';

const TAIGA_UI = [
  TuiActionModule,
  TuiButtonModule,
  TuiHostedDropdownModule,
  TuiMarkerIconModule,
];

type TopBarMenuApplication = {
  name: string;
  icon: string;
  url: string;
};

const applications: TopBarMenuApplication[] = [
  {
    name: 'Lịch dạy',
    icon: 'tuiIconCoffeeLarge',
    url: 'http://localhost:4202',
  },
  { name: 'Coi thi', icon: 'tuiIconCoffeeLarge', url: 'http://localhost:4201' },
  {
    name: 'Tài khoản',
    icon: 'tuiIconUsersLarge',
    url: 'https://localhost:7167/Identity/Account/Manage',
  },
];

@Component({
  selector: 'utconnect-top-bar-menu',
  standalone: true,
  imports: [CommonModule, ...TAIGA_UI],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarMenuComponent {
  // PUBLIC PROPERTIES
  readonly applications = applications;
  openDropdown = false;
}
