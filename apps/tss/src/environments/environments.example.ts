import { EsmConfig } from '@esm/config';

export const environment: EsmConfig = {
  production: false,
  baseUrl: 'http://localhost:5001',
  syncfusionLicense: '',
  recaptcha: {
    siteKey: '',
  },
  defaultPassword: '123456',
  pusher: {
    key: 'exampleKey',
    cluster: 'exampleCluster',
  },
};
