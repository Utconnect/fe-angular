import { ArrayHelper } from './array.helper';

describe('ArrayHelper', () => {
  describe('last', () => {
    it('returns correctly', () => {
      const arr = [0, 1, 2];
      expect(ArrayHelper.last(arr)).toEqual(2);
    });
  });
});
