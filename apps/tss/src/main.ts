import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { tssConfigProvider } from '@tss/config';
import { AppModule } from './app/app.module';
import { environment } from './environments/environments';

registerLicense(environment.syncfusionLicense);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([tssConfigProvider(environment)])
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
