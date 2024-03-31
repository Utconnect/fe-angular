import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { Store } from '@ngrx/store';
import {
  tuiIconCommentLarge,
  tuiIconHelpCircleLarge,
  tuiIconLogOutLarge,
  tuiIconSettingsLarge,
} from '@taiga-ui/icons';
import { RequiredStep, SidebarItem, TopBarGroup } from '@utconnect/components';
import { combineLatest, map, Observable } from 'rxjs';
import { Role } from './roles';

export const esmTopBarItemsFactory: <T extends Store>(
  store: T,
) => TopBarGroup[] = (store) => [
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
        action: () => store.dispatch(EsmPageAction.logOut()),
      },
    ],
  },
];

export const esmSideBarItemsFactory: (
  store: Store<EsmState>,
) => Observable<SidebarItem[]> = (store) => {
  return store.select(EsmSelector.examinationId).pipe(
    map((id) => {
      if (!id) {
        return [];
      }

      return [
        {
          name: 'Lịch thi',
          routerLink: `${id}/exam/data`,
          icon: 'far fa-calendar-alt',
          roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
        },
        {
          name: 'Đề thi',
          icon: 'far fa-briefcase',
          routerLink: `${id}/exam`,
          roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
        },
        {
          name: 'Quản lý CBCT',
          icon: 'far fa-user',
          subItems: [
            {
              name: 'Khối lượng',
              routerLink: `${id}/invigilator/assign-faculty`,
              icon: 'far fa-chalkboard',
              roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
            },
            {
              name: 'Phân công',
              routerLink: `${id}/invigilator/assign-teacher`,
              icon: 'far fa-chalkboard',
            },
            {
              name: 'Phòng thi',
              routerLink: `${id}/invigilator/assign-room`,
              icon: 'far fa-users-class',
              roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
            },
          ],
        },
        {
          name: 'Bàn giao bài thi',
          icon: 'far fa-pencil-paintbrush',
          routerLink: `${id}/exam/handover`,
          roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
        },
        // {
        //   name: 'Thanh toán',
        //   icon: 'far fa-wallet',
        //   roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
        //   subItems: [
        //     {
        //       name: 'Ban coi thi',
        //       routerLink: `{id}/paid/invigilator-department`,
        //       icon: 'far fa-money-bill',
        //     },
        //     {
        //       name: 'Ban đề thi',
        //       routerLink: `{id}/paid/exam-department`,
        //       icon: 'far fa-money-bill',
        //     },
        //     {
        //       name: 'Cán bộ coi thi',
        //       routerLink: `{id}/paid/invigilator`,
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
        //       routerLink: `{id}/process`,
        //       icon: 'far fa-tasks',
        //     },
        //     {
        //       name: 'Tổng hợp',
        //       routerLink: `{id}/`,
        //       icon: 'far fa-clipboard-list',
        //     },
        //     {
        //       name: 'Báo cáo',
        //       routerLink: `{id}/report`,
        //       icon: 'far fa-file-chart-pie',
        //     },
        //   ],
        // },
        // {
        //   name: 'Thông báo, tài liệu',
        //   icon: 'far fa-folders',
        //   routerLink: `{id}/document`,
        // },
        {
          name: 'Thống kê',
          icon: 'far fa-clipboard-list',
          routerLink: `${id}/`,
        },
        {
          name: 'Quản lý kỳ thi',
          roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
          icon: 'far fa-cog',
          routerLink: `${id}/edit`,
        },
      ];
    }),
  );
};

export const roleFactory: (store: Store<EsmState>) => Observable<string[]> = (
  store,
) =>
  store.pipe(
    EsmSelector.notNullUser,
    map((u) => u.roles ?? []),
  );

export const onLoginSuccess: (store: Store<EsmState>) => () => void = (
  store,
) => {
  return () => store.dispatch(EsmPageAction.getUserInfo());
};

export const titleFactory: (
  store: Store<EsmState>,
) => Observable<string | null> = (store) => store.pipe(EsmSelector.userTitle());

export const menuTextFactory: (store: Store<EsmState>) => Observable<string> = (
  store,
) =>
  combineLatest([
    store.pipe(EsmSelector.userTitle()),
    store.pipe(EsmSelector.userName),
  ]).pipe(
    map(([title, name]) => `Xin chào ${title ?? ''} ${name ?? ''}`.trim()),
  );

export const esmRequiredStepStepFactory: (
  store: Store<EsmState>,
) => Observable<number | undefined> = (store) =>
  store.select(EsmSelector.examination).pipe(map((e) => e?.status));

export const esmRequiredStepListFactory: (
  store: Store<EsmState>,
) => Observable<RequiredStep<ESMDomainEnumsExaminationStatus>[]> = (store) =>
  store.select(EsmSelector.examination).pipe(
    map((examination) => {
      if (!examination) {
        return [];
      }

      return [
        {
          step: ESMDomainEnumsExaminationStatus.Idle,
          title: 'Chưa có dữ liệu lịch thi',
          routerLink: ['/', examination.id, 'exam', 'data'],
          description: 'Đến trang nhập dữ liệu',
        },
        {
          step: ESMDomainEnumsExaminationStatus.Setup,
          title: 'Kỳ thi chưa được kích hoạt',
          routerLink: ['/', examination.id, 'exam', 'data'],
          description: 'Đến trang nhập dữ liệu',
        },
        {
          step: ESMDomainEnumsExaminationStatus.AssignFaculty,
          title: 'Chưa chốt số lượng CBCT tới các khoa',
          routerLink: ['/', examination.id, 'invigilator', 'assign-faculty'],
          description: 'Đến trang nhập dữ liệu',
        },
      ];
    }),
  );
