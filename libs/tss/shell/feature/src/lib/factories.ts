import { Store } from '@ngrx/store';
import {
  tuiIconCommentLarge,
  tuiIconHelpCircleLarge,
  tuiIconLogOutLarge,
  tuiIconSettingsLarge,
  tuiIconUpload,
} from '@taiga-ui/icons';
import { TssPageAction, TssSelector, TssState } from '@tss/store';
import { SidebarItem, TopBarGroup } from '@utconnect/components';
import { combineLatest, map, Observable, of } from 'rxjs';

export const tssTopBarItemsFactory: () => TopBarGroup[] = () => [
  {
    items: [
      {
        key: 'user-info',
        label: 'Thông tin cá nhân',
        routerLink: '/user-info',
        icon: '<i class="far fa-user" style="font-size: 23px"></i>',
      },
    ],
  },
  {
    items: [
      {
        key: 'comments',
        label: 'Đóng góp ý kiến',
        routerLink: '/feedback',
        icon: tuiIconCommentLarge,
      },
      {
        key: 'settings',
        label: 'Cài đặt',
        routerLink: '/settings',
        icon: tuiIconSettingsLarge,
      },
    ],
  },
  {
    items: [
      {
        key: 'help',
        label: 'Trợ giúp & hỗ trợ',
        icon: tuiIconHelpCircleLarge,
        externalLink: 'https://m.me/utcketnoi',
      },
      {
        key: 'log-out',
        label: 'Đăng xuất',
        icon: tuiIconLogOutLarge,
        externalLink: 'https://localhost:7167/Identity/Account/Logout',
      },
    ],
  },
];

export const tssSidebarItemsFactory: (
  store: Store<TssState>,
) => Observable<SidebarItem[]> = () => {
  const items: SidebarItem[] = [
    {
      controlName: 'calendar',
      name: 'Lịch biểu',
      icon: 'far fa-calendar-alt',
      routerLink: '/calendar',
      component: async () => (await import('@tss/ui')).CalendarItemComponent,
    },
    {
      name: 'Phân giảng',
      icon: 'far fa-pencil-paintbrush',
      roles: ['16'],
      subItems: [
        {
          name: 'Danh sách phân giảng',
          routerLink: '/schedule/assign',
          icon: 'mdi mdi-format-list-bulleted',
        },
        {
          name: 'Nhập dữ liệu',
          routerLink: '/schedule/import',
          icon: tuiIconUpload,
        },
      ],
    },
    {
      name: 'Lịch thi',
      icon: 'mdi mdi-calendar-clock',
      roles: ['16'],
      subItems: [
        {
          name: 'Phân lịch thi',
          routerLink: '/exam/assign',
          icon: 'mdi mdi-format-list-bulleted',
        },
      ],
    },
    {
      name: 'Thay đổi lịch',
      icon: 'fas fa-exchange-alt',
      routerLink: '/schedule/change',
      exactRouterLink: false,
    },
    {
      name: 'Thống kê',
      icon: 'far fa-chart-pie',
      routerLink: '/statistic',
      roles: ['28'],
    },
  ];

  return of(items);
};

export const roleFactory: (store: Store<TssState>) => Observable<string[]> = (
  store,
) =>
  store.pipe(
    TssSelector.notNullTeacher,
    map((u) => u.permissions.map((p) => p.toString()) ?? []),
  );

export const onLoginSuccess: (store: Store<TssState>) => () => void = (
  store,
) => {
  return () => store.dispatch(TssPageAction.getUserInfo());
};

export const userTitleFactory: (
  store: Store<TssState>,
) => Observable<string | null> = (store) => store.select(TssSelector.nameTitle);

export const menuTextFactory: (store: Store<TssState>) => Observable<string> = (
  store,
) =>
  combineLatest([
    store.select(TssSelector.nameTitle),
    store.pipe(TssSelector.userName),
  ]).pipe(
    map(([title, name]) => `Xin chào ${title ?? ''} ${name ?? ''}`.trim()),
  );
