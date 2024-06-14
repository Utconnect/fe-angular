import { Provider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  SIDE_BAR_OPTION_AUTH_ROLES_TOKEN,
  SIDE_BAR_OPTION_ITEM_TOKEN,
  SidebarItem,
} from './sidebar';
import {
  TOP_BAR_OPTION_ITEM_TOKEN,
  TOP_BAR_OPTION_MENU_TEXT_TOKEN,
  TOP_BAR_OPTION_RIGHT_ITEM_TOKEN,
  TopBarGroup,
  TopBarRightItemProviderType,
} from './top-bar';

type LayoutProvidersType<T extends Store> = {
  store: Type<T>;
  sidebar: {
    items: (store: T) => Observable<SidebarItem[]>;
    roles: (store: T) => Observable<string[]>;
  };
  topBar: {
    items: (store: T) => TopBarGroup[];
    menuText?: (store: T) => Observable<string>;
    right: TopBarRightItemProviderType;
  };
};

export const layoutProviders = <T extends Store>({
  store,
  sidebar,
  topBar,
}: LayoutProvidersType<T>): Provider => [
  {
    provide: SIDE_BAR_OPTION_ITEM_TOKEN,
    useFactory: sidebar.items,
    deps: [store],
  },
  {
    provide: SIDE_BAR_OPTION_AUTH_ROLES_TOKEN,
    useFactory: sidebar.roles,
    deps: [store],
  },
  {
    provide: TOP_BAR_OPTION_ITEM_TOKEN,
    useFactory: topBar.items,
    deps: [store],
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
