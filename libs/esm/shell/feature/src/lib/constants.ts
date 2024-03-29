import { TopBarCreateButtonComponent } from '@esm/components';
import { EsmPageAction } from '@esm/store';
import {
  tuiIconCommentLarge,
  tuiIconHelpCircleLarge,
  tuiIconLogOutLarge,
  tuiIconSettingsLarge,
} from '@taiga-ui/icons';
import { SidebarItem, TopBarGroup } from '@utconnect/components';
import { ComponentRouteMapper } from '@utconnect/types';
import { Role } from './roles';

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
