import { TssConfig } from '@tss/config';

export const environment: TssConfig = {
  production: false,
  baseUrl: 'http://localhost:5001',
  syncfusionLicense: '',
  recaptcha: {
    siteKey: '',
  },
  pusher: {
    key: 'fde3a10d00f7502271d3',
    cluster: 'ap1',
  },
  loginUrl: 'http://localhost:5100/login?returnUrl=http://localhost:4201/callback',
  logoutUrl: 'http://localhost:5100/logout',
};
