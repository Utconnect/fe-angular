import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { Store } from '@ngrx/store';
import { RequiredStep } from '@utconnect/components';
import { ObservableHelper } from '@utconnect/helpers';
import { combineLatest, map, Observable, tap } from 'rxjs';

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
