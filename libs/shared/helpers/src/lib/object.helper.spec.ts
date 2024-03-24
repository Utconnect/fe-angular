import { ObjectHelper } from './object.helper';

describe('ObjectHelper', () => {
  describe('toArray', () => {
    it('returns correctly', () => {
      const obj = { first: 1, second: 2, third: 3, foo: 0, bar: 0 };
      expect(ObjectHelper.toArray(obj)).toEqual([
        {
          id: 'first',
          value: 1,
        },
        {
          id: 'second',
          value: 2,
        },
        {
          id: 'third',
          value: 3,
        },
        {
          id: 'foo',
          value: 0,
        },
        {
          id: 'bar',
          value: 0,
        },
      ]);
      expect(ObjectHelper.toArray(obj, { uniqueValue: true })).toEqual([
        {
          id: 'first',
          value: 1,
        },
        {
          id: 'second',
          value: 2,
        },
        {
          id: 'third',
          value: 3,
        },
        {
          id: 'foo',
          value: 0,
        },
      ]);
    });
  });

  describe('isNullOrUndefined', () => {
    it('returns correctly', () => {
      expect(ObjectHelper.isNullOrUndefined({})).toEqual(false);
      expect(ObjectHelper.isNullOrUndefined(null)).toEqual(true);
      expect(ObjectHelper.isNullOrUndefined(undefined)).toEqual(true);
    });
  });
});
