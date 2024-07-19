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
    key: 'fde3a10d00f7502271d3',
    cluster: 'ap1',
  },
};
