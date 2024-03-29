import { TopBarCreateButtonComponent } from '@esm/components';
import { ComponentRouteMapper } from '@utconnect/types';

export const topBarRightItemMapper: ComponentRouteMapper = [
  {
    path: '/create',
    component: null,
  },
  {
    path: '*',
    component: TopBarCreateButtonComponent,
  },
];
