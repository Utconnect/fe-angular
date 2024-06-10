import { TssConfig } from '@tss/config';

export const environment: TssConfig = {
  production: true,
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
