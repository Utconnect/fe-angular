import { ArrayPipe } from './array.pipe';

describe('ArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('in', () => {
    const pipe = new ArrayPipe();
    expect(pipe.transform([1, 2, 3], 'in', 1)).toEqual(true);
    expect(pipe.transform([1, 2, 3], 'in', 0)).toEqual(false);
  });

  it('map', () => {
    const pipe = new ArrayPipe();
    expect(pipe.transform([1, 2, 3], 'map', (x) => x * x)).toEqual([1, 4, 9]);
  });
});
