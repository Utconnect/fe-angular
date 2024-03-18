type Item<K extends number | string, V> = {
  id: K;
  value: V;
};

export class ObjectHelper {
  /**
   * Parse an object to array
   * @param obj
   * @param options function options
   * @returns Returns an array which contains elements created by key-value pairs from `obj`
   * @example
   * ObjectHelper.toArray({ first: 1, foo: 0, bar: 0 })
   * // returns [
   * //    {
   * //      id: 'first',
   * //      value: 1,
   * //    },
   * //    {
   * //      id: 'foo',
   * //      value: 0,
   * //    },
   * //    {
   * //      id: 'bar',
   * //      value: 0,
   * //    },
   * // ]
   *
   * @example
   * ObjectHelper.toArray({ first: 1, foo: 0, bar: 0 }, { uniqueValue: true })
   * // returns [
   * //    {
   * //      id: 'first',
   * //      value: 1,
   * //    },
   * //    {
   * //      id: 'foo',
   * //      value: 0,
   * //    },
   * // ]
   */
  static toArray<K extends number | string, V>(
    obj: Record<K, V>,
    options?: {
      uniqueValue?: boolean;
    },
  ): Item<K, V>[] {
    const array: Item<K, V>[] = [];
    (Object.keys(obj) as K[]).forEach((key) => {
      if (options?.uniqueValue && array.find((x) => x.value === obj[key])) {
        return;
      }
      array.push({ id: key, value: obj[key] });
    });
    return array;
  }

  /**
   * Determine if an object is null or undefined
   * @param obj
   * @returns `obj` is null or undefined or not
   * @example
   * ObjectHelper.isNullOrUndefined({})
   * // returns false
   */
  static isNullOrUndefined<T>(
    obj: T | null | undefined,
  ): obj is null | undefined {
    return obj === null || obj === undefined;
  }

  /**
   * Determine if an object is null or undefined
   * @param obj
   * @returns `obj` is null or undefined or not
   * @example
   * ObjectHelper.isNullOrUndefined({})
   * // returns false
   */
  static removeUndefinedField<T>(obj: T): Required<T> {
    const result: Record<string, unknown> = {};

    for (const key in obj) {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }

    return result as Required<T>;
  }
}
