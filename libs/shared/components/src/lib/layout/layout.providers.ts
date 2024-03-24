import { Provider, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SIDE_BAR_OPTIONS_TOKEN, SideBarOptions } from './side-bar';
import {
  TOP_BAR_OPTION_ITEM_TOKEN,
  TOP_BAR_OPTION_MENU_TEXT_TOKEN,
  TopBarGroup,
} from './top-bar';

type LayoutProvidersType<T extends Store> = {
  sideBar: SideBarOptions;
  topBar: {
    items: TopBarGroup[];
    menuText?: {
      factory: (store: T) => Observable<string>;
      store: Type<T>;
    };
  };
};

export const layoutProviders = <T extends Store>({
  sideBar,
  topBar,
}: LayoutProvidersType<T>): Provider => [
  {
    provide: SIDE_BAR_OPTIONS_TOKEN,
    useValue: sideBar,
  },
  {
    provide: TOP_BAR_OPTION_ITEM_TOKEN,
    useValue: topBar.items,
  },
  topBar.menuText && {
    provide: TOP_BAR_OPTION_MENU_TEXT_TOKEN,
    useFactory: topBar.menuText.factory,
    deps: [topBar.menuText.store],
  },
];
