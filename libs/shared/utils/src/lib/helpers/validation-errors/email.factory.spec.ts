import { emailFactory } from './email.factory';

describe('emailFactory', () => {
  it('should contains email', () => {
    expect(emailFactory()).toContain('email');
  });
});
