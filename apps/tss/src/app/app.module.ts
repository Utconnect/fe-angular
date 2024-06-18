import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeVi from '@angular/common/locales/vi';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { TssShellFeatureModule } from '@tss/feature';
import { ScreenLoaderComponent } from '@utconnect/components';
import { DeviceHelper } from '@utconnect/helpers';
import * as gregorian from 'cldr-data/main/vi/ca-gregorian.json';
import * as numbers from 'cldr-data/main/vi/numbers.json';
import * as timeZoneNames from 'cldr-data/main/vi/timeZoneNames.json';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import { default as EJS_LOCALE } from '../assets/locales/ejs-locale.json';
import { AppComponent } from './app.component';

registerLocaleData(localeVi, 'vi');
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
L10n.load({ vi: EJS_LOCALE.vi });
setCulture('vi');

const TAIGA_UI = [TuiRootModule, TuiDialogModule, TuiAlertModule];

const disableAnimations =
  !('animate' in document.documentElement) ||
  (navigator && DeviceHelper.isOldIosVersion());

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule.withConfig({ disableAnimations }),
    HttpClientModule,
    TssShellFeatureModule,
    ScreenLoaderComponent,
    ...TAIGA_UI,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
