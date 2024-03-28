import { TopBarCreateButtonComponent } from '@esm/components';
import { EsmPageAction } from '@esm/store';
import {
  tuiIconCommentLarge,
  tuiIconHelpCircleLarge,
  tuiIconLogOutLarge,
  tuiIconSettingsLarge,
} from '@taiga-ui/icons';
import {
  SidebarItem,
  TopBarGroup,
  TopBarItemMapper,
} from '@utconnect/components';
import { Role } from './roles';

export const topBarRightItemKey = 'rightItem';

export const esmSideBarItems: SidebarItem[] = [
  {
    name: 'Lịch thi',
    routerLink: '/exam/data',
    icon: 'far fa-calendar-alt',
    roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  },
  {
    name: 'Đề thi',
    icon: 'far fa-briefcase',
    routerLink: '/exam',
    roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  },
  {
    name: 'Quản lý CBCT',
    icon: 'far fa-user',
    subItems: [
      {
        name: 'Khối lượng',
        routerLink: '/invigilator/assign-faculty',
        icon: 'far fa-chalkboard',
        roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
      },
      {
        name: 'Phân công',
        routerLink: '/invigilator/assign-teacher',
        icon: 'far fa-chalkboard',
      },
      {
        name: 'Phòng thi',
        routerLink: '/invigilator/assign-room',
        icon: 'far fa-users-class',
        roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
      },
    ],
  },
  {
    name: 'Bàn giao bài thi',
    icon: 'far fa-pencil-paintbrush',
    routerLink: '/exam/handover',
    roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  },
  // {
  //   name: 'Thanh toán',
  //   icon: 'far fa-wallet',
  //   roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //   subItems: [
  //     {
  //       name: 'Ban coi thi',
  //       routerLink: '/paid/invigilator-department',
  //       icon: 'far fa-money-bill',
  //     },
  //     {
  //       name: 'Ban đề thi',
  //       routerLink: '/paid/exam-department',
  //       icon: 'far fa-money-bill',
  //     },
  //     {
  //       name: 'Cán bộ coi thi',
  //       routerLink: '/paid/invigilator',
  //       icon: 'far fa-money-bill',
  //     },
  //   ],
  // },
  // {
  //   name: 'Báo cáo, thống kê',
  //   roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
  //   icon: 'far fa-chart-pie',
  //   subItems: [
  //     {
  //       name: 'Tiến độ',
  //       routerLink: '/process',
  //       icon: 'far fa-tasks',
  //     },
  //     {
  //       name: 'Tổng hợp',
  //       routerLink: '/',
  //       icon: 'far fa-clipboard-list',
  //     },
  //     {
  //       name: 'Báo cáo',
  //       routerLink: '/report',
  //       icon: 'far fa-file-chart-pie',
  //     },
  //   ],
  // },
  // {
  //   name: 'Thông báo, tài liệu',
  //   icon: 'far fa-folders',
  //   routerLink: '/document',
  // },
  {
    name: 'Thống kê',
    icon: 'far fa-clipboard-list',
    routerLink: '/',
  },
  {
    name: 'Quản lý kỳ thi',
    roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
    icon: 'far fa-cog',
    routerLink: '/edit',
  },
];

export class EsmTopBarConstants {
  static keys = {
    USER_INFO: 'user-info',
    COMMENTS: 'comments',
    SETTINGS: 'settings',
    CHANGE_PASSWORD: 'change-password',
    HELP: 'help',
    LOG_OUT: 'log-out',
  };

  static items: TopBarGroup[] = [
    {
      items: [
        {
          key: EsmTopBarConstants.keys.USER_INFO,
          label: 'Thông tin cá nhân',
          routerLink: '/user-info',
          icon: '<i class="far fa-user" style="font-size: 23px"></i>',
        },
      ],
    },
    {
      items: [
        {
          key: EsmTopBarConstants.keys.COMMENTS,
          label: 'Đóng góp ý kiến',
          routerLink: '/feedback',
          icon: tuiIconCommentLarge,
        },
        {
          key: EsmTopBarConstants.keys.CHANGE_PASSWORD,
          label: 'Cài đặt',
          routerLink: '/settings',
          icon: tuiIconSettingsLarge,
        },
      ],
    },
    {
      items: [
        {
          key: EsmTopBarConstants.keys.HELP,
          label: 'Trợ giúp & hỗ trợ',
          icon: tuiIconHelpCircleLarge,
          externalLink: 'https://m.me/utcketnoi',
        },
        {
          key: EsmTopBarConstants.keys.LOG_OUT,
          label: 'Đăng xuất',
          icon: tuiIconLogOutLarge,
          action: (store): void => store.dispatch(EsmPageAction.logOut()),
        },
      ],
    },
  ];
}

export const topBarRightItemMapper: TopBarItemMapper = [
  {
    paths: ['/create'],
    component: null,
  },
  {
    path: '*',
    component: TopBarCreateButtonComponent,
  },
];
