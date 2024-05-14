/* eslint-disable */
export default {
  displayName: 'tss-shell-data-access-store',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../../coverage/libs/tss/shell/data-access/store',
};
