import { StringHelper } from './string.helper';

describe('StringHelper', () => {
  describe('md5', () => {
    it('should encode', () => {
      expect(StringHelper.md5('test')).toEqual(
        '098f6bcd4621d373cade4e832627b4f6'
      );
      expect(StringHelper.md5('random string')).toEqual(
        '706b16b2fb732ab6079a10fea61d078b'
      );
    });
  });
});
