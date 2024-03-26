import { requiredFactory } from './required.factory';

describe('requiredFactory', () => {
  it('should contains required', () => {
    expect(requiredFactory()).toContain('trống');
  });
});
