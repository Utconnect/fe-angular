import { EsmConfig } from '@esm/config';

export const environment: EsmConfig = {
  production: true,
  baseUrl: 'http://localhost:5000/',
  syncfusionLicense: '',
  recaptcha: {
    siteKey: '',
  },
  defaultPassword: '123456',
  pusher: {
    key: 'fde3a10d00f7502271d3',
    cluster: 'ap1',
  },
  loginUrl: 'http://localhost:5100/login',
  logoutUrl: 'http://localhost:5100/logout',
};
