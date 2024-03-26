import { PercentagePipe } from './percentage.pipe';

describe('PercentagePipe', () => {
  it('create an instance', () => {
    const pipe = new PercentagePipe();
    expect(pipe).toBeTruthy();
  });

  it('should take value if there are no divider', () => {
    const pipe = new PercentagePipe();
    expect(pipe.transform(0)).toEqual('0.00%');
    expect(pipe.transform(100)).toEqual('100.00%');
    expect(pipe.transform(25.5)).toEqual('25.50%');
    expect(pipe.transform(50.79)).toEqual('50.79%');
  });

  it('should calculate new value if there are no divider', () => {
    const pipe = new PercentagePipe();
    expect(pipe.transform(0, 10)).toEqual('0.00%');
    expect(pipe.transform(100, 10)).toEqual('1000.00%');
    expect(pipe.transform(25.5, 10)).toEqual('255.00%');
    expect(pipe.transform(50.79, 10)).toEqual('5079.00%');
  });
});
