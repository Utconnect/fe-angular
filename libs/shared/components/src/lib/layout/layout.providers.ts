import { Provider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { LAYOUT_OPTION_STORE_TOKEN } from './layout.tokens';
import { SIDE_BAR_OPTIONS_TOKEN, SideBarOptions } from './side-bar';
import {
  TOP_BAR_OPTION_ITEM_TOKEN,
  TOP_BAR_OPTION_MENU_TEXT_TOKEN,
  TOP_BAR_OPTION_RIGHT_ITEM_TOKEN,
  TopBarGroup,
  TopBarRightItemProviderType,
} from './top-bar';

type LayoutProvidersType<T extends Store> = {
  store: Type<T>;
  sideBar: SideBarOptions;
  topBar: {
    items: TopBarGroup[];
    menuText?: (store: T) => Observable<string>;
    right: TopBarRightItemProviderType;
  };
};

export const layoutProviders = <T extends Store>({
  store,
  sideBar,
  topBar,
}: LayoutProvidersType<T>): Provider => [
  {
    provide: LAYOUT_OPTION_STORE_TOKEN,
    useClass: store,
  },
  {
    provide: SIDE_BAR_OPTIONS_TOKEN,
    useValue: sideBar,
  },
  {
    provide: TOP_BAR_OPTION_ITEM_TOKEN,
    useValue: topBar.items,
  },
  {
    provide: TOP_BAR_OPTION_MENU_TEXT_TOKEN,
    useFactory: topBar.menuText ?? ((): Observable<string | null> => of(null)),
    deps: [store],
  },
  {
    provide: TOP_BAR_OPTION_RIGHT_ITEM_TOKEN,
    useValue: topBar.right,
  },
];
