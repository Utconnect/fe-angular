import { ESMDomainEnumsExamMethod } from '@esm/api';

export class EsmStringHelper {
  static EXAM_METHOD_MAPPING = {
    0: 'Trắc nghiệm',
    1: 'Tự luận',
    2: 'Thực hành',
    3: 'Vấn đáp',
    4: 'Báo cáo 1',
    5: 'Báo cáo 2',
  };

  static getExamMethod(method: ESMDomainEnumsExamMethod): string {
    return this.EXAM_METHOD_MAPPING[method];
  }
}
