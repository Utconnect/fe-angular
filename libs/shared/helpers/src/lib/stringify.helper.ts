import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';

export class StringifyHelper {
  @tuiPure
  static idName<T extends { id: string; name: string }>(
    items: T[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [string, string]),
    );
    map.set('', 'Tất cả');

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) ?? '';
  }
}
