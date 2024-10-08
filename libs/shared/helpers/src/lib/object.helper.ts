import { StringHelper } from './string.helper';

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

  /**
   * Parse object to a new object with snake-case properties
   * @param obj
   * @returns Object with snake-case properties
   * @example
   * ObjectHelper.toSnakeCase({ id: 1, firstProp: 'first' })
   * // returns { id: 1, first_prop: 'first' }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toSnakeCase(obj: Record<string, any>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = StringHelper.toSnakeCase(key);
      if (Array.isArray(value)) {
        result[newKey] = value.map((v) => this.toSnakeCase(v));
      } else if (typeof value === 'object' && value !== null) {
        result[newKey] = this.toSnakeCase(value);
      } else {
        result[newKey] = value;
      }
    }
    return result;
  }

  /**
   * Parse all properties value in `props` to date
   * @param obj
   * @param props properties which need to parse
   * @returns Object with date-parsed properties
   */
  static parseDateProperties<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Record<string, any>,
    U extends (keyof T)[],
  >(obj: T, props: U): T {
    props.forEach((prop) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (obj as any)[prop] = new Date(obj[prop]);
    });
    return obj;
  }
}
