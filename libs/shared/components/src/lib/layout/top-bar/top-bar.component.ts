import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import {
  TuiActiveZoneModule,
  TuiFilterPipeModule,
  TuiLetModule,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { DynamicRouteComponentComponent } from '../../dynamic-route-component';
import { BellComponent } from '../bell';
import { LAYOUT_OPTION_STORE_TOKEN } from '../layout.tokens';
import {
  TOP_BAR_OPTION_ITEM_TOKEN,
  TOP_BAR_OPTION_MENU_TEXT_TOKEN,
  TOP_BAR_OPTION_RIGHT_ITEM_TOKEN,
} from './top-bar.tokens';
import { TopBarItem } from './top-bar.types';

const NGRX = [LetModule];
const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiHostedDropdownModule,
  TuiInputModule,
  TuiLetModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'utconnect-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['top-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    BellComponent,
    DynamicRouteComponentComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'icon',
      size: 'm',
    }),
  ],
})
export class TopBarComponent {
  // INJECT PROPERTIES
  readonly items = inject(TOP_BAR_OPTION_ITEM_TOKEN);
  readonly menuText$ = inject(TOP_BAR_OPTION_MENU_TEXT_TOKEN);
  readonly rightItemOption = inject(TOP_BAR_OPTION_RIGHT_ITEM_TOKEN);
  private readonly store = inject(LAYOUT_OPTION_STORE_TOKEN);

  // PUBLIC PROPERTIES
  openUserDropdown = false;

  // PUBLIC METHODS
  onClick(item: TopBarItem): void {
    item.action?.(this.store);
  }
}
