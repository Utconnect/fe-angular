/* eslint-disable */
export default {
  displayName: 'esm-shell-data-access-store',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../../coverage/libs/esm/shell/data-access/store',
};
