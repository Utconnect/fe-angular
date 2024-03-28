import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { LetModule } from '@ngrx/component';
import {
  TuiActiveZoneModule,
  TuiDestroyService,
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
import { fadeInOut } from '@utconnect/animations';
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
    FormsModule,
    NgOptimizedImage,
    BellComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'icon',
      size: 'm',
    }),
  ],
  animations: [fadeInOut],
})
export class TopBarComponent implements AfterViewInit {
  // INJECT PROPERTIES
  readonly route = inject(ActivatedRoute);
  readonly items = inject(TOP_BAR_OPTION_ITEM_TOKEN);
  readonly store = inject(LAYOUT_OPTION_STORE_TOKEN);
  readonly router = inject(Router);
  readonly destroy$ = inject(TuiDestroyService);
  readonly menuText$ = inject(TOP_BAR_OPTION_MENU_TEXT_TOKEN);
  readonly rightItemOption = inject(TOP_BAR_OPTION_RIGHT_ITEM_TOKEN);

  // VIEW CHILD
  @ViewChild('right', { read: ViewContainerRef })
  rightVcr?: ViewContainerRef;

  // PUBLIC PROPERTIES
  openUserDropdown = false;

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && this.rightVcr) {
        this.rightVcr.clear();

        const rightItem = this.getRightItem(event.url);
        if (rightItem) {
          this.rightVcr.createComponent(rightItem);
        }
      }
    });
  }

  // PUBLIC METHODS
  onClick(item: TopBarItem): void {
    item.action?.(this.store);
  }

  // PRIVATE METHODS
  private getRightItem(url: string): Type<unknown> | null {
    for (const item of this.rightItemOption.mapper) {
      if ('paths' in item) {
        for (const path of item.paths) {
          if (url.startsWith(path)) {
            return item.component;
          }
        }
        continue;
      }

      if (item.path === '*') {
        return item.component;
      }

      if (url.startsWith(item.path)) {
        return item.component;
      }
    }

    return null;
  }
}
