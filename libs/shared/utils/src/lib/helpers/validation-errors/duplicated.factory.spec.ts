import { duplicatedFactory } from './duplicated.factory';

describe('duplicated', () => {
  it('should contains duplicated field', () => {
    const field = 'testField';
    expect(duplicatedFactory(field)).toContain(field);
  });
});
