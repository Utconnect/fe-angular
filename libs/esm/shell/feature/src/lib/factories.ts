import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { Store } from '@ngrx/store';
import {
  tuiIconCommentLarge,
  tuiIconHelpCircleLarge,
  tuiIconLogOutLarge,
  tuiIconSettingsLarge,
} from '@taiga-ui/icons';
import { RequiredStep, TopBarGroup } from '@utconnect/components';
import { ObservableHelper } from '@utconnect/helpers';
import { combineLatest, map, Observable } from 'rxjs';

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

export const esmRequiredStatusFactory: (
  store: Store<EsmState>,
) => Observable<RequiredStep<ESMDomainEnumsExaminationStatus>[]> = (store) =>
  store.select(EsmSelector.examination).pipe(
    ObservableHelper.filterNullish(),
    map((examination) => [
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
    ]),
  );
