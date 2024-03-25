import { StringifyHelper } from './stringify.helper';

describe('StringifyHelper', () => {
  describe('faculty', () => {
    it('should work', () => {
      const faculties: any[] = [
        {
          id: '1',
          displayId: 'mock-id-1',
          name: 'mock-name-1',
        },
        {
          id: '2',
          displayId: 'mock-id-2',
          name: 'mock-name-2',
        },
      ];
      expect(StringifyHelper.idName(faculties)({ $implicit: '1' })).toEqual(
        'mock-name-1',
      );
      expect(StringifyHelper.idName(faculties)({ $implicit: '2' })).toEqual(
        'mock-name-2',
      );
    });
  });
});
