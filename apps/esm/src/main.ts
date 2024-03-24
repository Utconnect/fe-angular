import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { esmConfigProvider } from '@esm/config';
import { AppModule } from './app/app.module';
import { environment } from './environments/environments';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([esmConfigProvider(environment)])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
