import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ESM_CONFIG } from '@esm/config';
import { TuiRootModule } from '@taiga-ui/core';
import { AppComponent } from './app/app.component';
import { AppModule } from 'apps/esm/src/app/app.module';

platformBrowserDynamic([
  {
    provide: ESM_CONFIG,
    useValue: {
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
    },
  },
])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
