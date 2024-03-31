import { TestBed } from '@angular/core/testing';
import { StringHelper } from '@esm/cdk';
import { ExamMethod } from '@esm/data';
import { ExamMethodPipe } from './exam-method.pipe';

describe('ExamMethod', () => {
  let pipe: ExamMethodPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ExamMethodPipe] });
    pipe = TestBed.inject(ExamMethodPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call StringHelper.getExamMethod', () => {
    const spy = spyOn(StringHelper, 'getExamMethod');
    const method = ExamMethod.Oral;

    pipe.transform(method);

    expect(spy).toHaveBeenCalledWith(method);
  });
});
