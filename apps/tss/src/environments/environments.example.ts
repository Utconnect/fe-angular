import { EsmConfig } from '@esm/config';

export const environment: EsmConfig = {
  production: false,
  baseUrl: 'http://localhost:5000/',
  syncfusionLicense: '',
  recaptcha: {
    siteKey: '',
  },
  pusher: {
    key: 'exampleKey',
    cluster: 'exampleCluster',
  },
  loginUrl: 'http://localhost:5100/login?returnUrl=http://localhost:4201/callback',
  logoutUrl: 'http://localhost:5100/logout',
};
