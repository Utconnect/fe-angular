import { ESMDomainEnumsExamMethod } from '@esm/api';
import { EsmStringHelper } from './string-helper';

describe('StringHelper', () => {
  describe('getExamMethod', () => {
    it('should return exam method in string', () => {
      expect(
        EsmStringHelper.getExamMethod(ESMDomainEnumsExamMethod.Select),
      ).toEqual('Trắc nghiệm');
      expect(
        EsmStringHelper.getExamMethod(ESMDomainEnumsExamMethod.Write),
      ).toEqual('Tự luận');
      expect(
        EsmStringHelper.getExamMethod(ESMDomainEnumsExamMethod.Practice),
      ).toEqual('Thực hành');
      expect(
        EsmStringHelper.getExamMethod(ESMDomainEnumsExamMethod.Oral),
      ).toEqual('Vấn đáp');
      expect(
        EsmStringHelper.getExamMethod(ESMDomainEnumsExamMethod.Report1),
      ).toEqual('Báo cáo 1');
      expect(
        EsmStringHelper.getExamMethod(ESMDomainEnumsExamMethod.Report2),
      ).toEqual('Báo cáo 2');
    });
  });
});
