import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import {
  TOP_BAR_OPTION_ITEM_TOKEN,
  TOP_BAR_OPTION_MENU_TEXT_TOKEN,
} from '../top-bar.tokens';
import { TopBarItem } from '../top-bar.types';

const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
];

@Component({
  selector: 'utconnect-top-bar-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ...TAIGA_UI],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarUserComponent {
  // INJECT PROPERTIES
  readonly items = inject(TOP_BAR_OPTION_ITEM_TOKEN);
  readonly menuText$ = inject(TOP_BAR_OPTION_MENU_TEXT_TOKEN);

  // PUBLIC PROPERTIES
  openDropdown = false;

  // PUBLIC METHODS
  onClick(item: TopBarItem): void {
    this.openDropdown = false;
    item.action?.();
  }
}
