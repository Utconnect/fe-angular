import { last } from 'lodash';
import { Md5 } from 'ts-md5';

export class StringHelper {
  static md5(text: string): string {
    return new Md5().appendStr(text).end() as string;
  }

  static getFirstName(name: string): string {
    return last(name.split(' ')) ?? '';
  }

  static nameCompareFn(a: string, b: string): number {
    const getName = (fullName: string): string =>
      last(fullName.split(' ')) ?? '';

    const name1 = getName(StringHelper.toLatinText(a));
    const name2 = getName(StringHelper.toLatinText(b));

    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  static toLatinText(text: string): string {
    if (!text) return '';

    text = text.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    text = text.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    text = text.replace(/[ìíịỉĩ]/g, 'i');
    text = text.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    text = text.replace(/[ùúụủũưừứựửữ]/g, 'u');
    text = text.replace(/[ỳýỵỷỹ]/g, 'y');
    text = text.replace(/đ/g, 'd');

    text = text.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
    text = text.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
    text = text.replace(/[ÌÍỊỈĨ]/g, 'I');
    text = text.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
    text = text.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
    text = text.replace(/[ỲÝỴỶỸ]/g, 'Y');
    text = text.replace(/Đ/g, 'D');

    return text;
  }

  static toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  static shortenName(text: string): string {
    const words = text.split(' ');
    return words
      .map((word, i) => (i === words.length - 1 ? ` ${word}` : word[0]))
      .join('.');
  }
}
