export interface TssConfig {
  production: boolean;
  baseUrl: string;
  syncfusionLicense: string;
  recaptcha: {
    siteKey: string;
  };
  pusher: {
    key: string;
    cluster: string;
  };
  loginUrl: string;
  logoutUrl: string;
}
