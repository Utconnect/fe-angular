import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  inject,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router, RouterModule } from '@angular/router';
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
})
export class TopBarComponent implements AfterViewInit {
  // INJECT PROPERTIES
  readonly items = inject(TOP_BAR_OPTION_ITEM_TOKEN);
  readonly menuText$ = inject(TOP_BAR_OPTION_MENU_TEXT_TOKEN);

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(LAYOUT_OPTION_STORE_TOKEN);
  private readonly router = inject(Router);
  private readonly rightItemOption = inject(TOP_BAR_OPTION_RIGHT_ITEM_TOKEN);

  // VIEW CHILD
  @ViewChild('right', { read: ViewContainerRef })
  rightVcr?: ViewContainerRef;

  // PUBLIC PROPERTIES
  openUserDropdown = false;

  // PRIVATE PROPERTIES
  currentRightComponent: ComponentRef<unknown> | null = null;

  ngAfterViewInit(): void {
    this.updateRightComponentOnNavigation(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.updateRightComponentOnNavigation(event.url);
      }
    });
  }

  // PUBLIC METHODS
  onClick(item: TopBarItem): void {
    item.action?.(this.store);
  }

  // PRIVATE METHODS
  private updateRightComponentOnNavigation(url: string): void {
    if (!this.rightVcr) {
      return;
    }

    const rightItem = this.getRightItem(url);
    if (!rightItem) {
      // this.currentRightComponent?.destroy();
      this.rightVcr.clear();
      this.currentRightComponent = null;
      return;
    }

    if (!this.currentRightComponent) {
      this.currentRightComponent = this.rightVcr.createComponent(rightItem);
      this.cdr.markForCheck();
      return;
    }

    if (this.currentRightComponent.componentType.name !== rightItem.name) {
      this.currentRightComponent.destroy();
      this.currentRightComponent = this.rightVcr.createComponent(rightItem);
      this.cdr.markForCheck();
    }
  }

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
