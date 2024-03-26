import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';

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
