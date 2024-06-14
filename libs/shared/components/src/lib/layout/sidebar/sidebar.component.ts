import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { RoleDirective } from '@utconnect/directives';
import {
  SIDE_BAR_OPTION_AUTH_ROLES_TOKEN,
  SIDE_BAR_OPTION_ITEM_TOKEN,
} from './sidebar.tokens';
import { CustomItemComponent } from './custom-item/custom-item.component';

const TAIGA_UI = [
  TuiAccordionModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
];

@Component({
  selector: 'utconnect-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RoleDirective,
    LetModule,
    ...TAIGA_UI,
    CustomItemComponent,
  ],
})
export class SidebarComponent {
  // INJECT PROPERTIES
  readonly items$ = inject(SIDE_BAR_OPTION_ITEM_TOKEN);
  readonly roles$ = inject(SIDE_BAR_OPTION_AUTH_ROLES_TOKEN);
}
