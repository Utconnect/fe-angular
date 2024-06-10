export class ShiftConstant {
  static readonly SHIFTS: {
    [key: string]: { start: number[]; end: number[] };
  } = {
    '1': {
      start: [7, 0],
      end: [9, 25],
    },
    '2': {
      start: [9, 35],
      end: [12, 0],
    },
    '3': {
      start: [13, 0],
      end: [15, 25],
    },
    '4': {
      start: [15, 35],
      end: [18, 0],
    },
    '5_1': {
      start: [18, 5],
      end: [20, 30],
    },
    '5_2': {
      start: [18, 5],
      end: [21, 20],
    },
  };
}
