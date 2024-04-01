import { TestBed } from '@angular/core/testing';
import { ESMDomainEnumsExamMethod } from '@esm/api';
import { EsmStringHelper } from '@esm/helpers';
import { EsmExamMethodPipe } from './exam-method.pipe';

describe('ExamMethod', () => {
  let pipe: EsmExamMethodPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [EsmExamMethodPipe] });
    pipe = TestBed.inject(EsmExamMethodPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call StringHelper.getExamMethod', () => {
    const spy = spyOn(EsmStringHelper, 'getExamMethod');
    const method = ESMDomainEnumsExamMethod.Oral;

    pipe.transform(method);

    expect(spy).toHaveBeenCalledWith(method);
  });
});
