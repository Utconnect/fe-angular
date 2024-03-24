import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EsmShellFeatureModule } from '@esm/feature';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { ScreenLoaderComponent } from '@utconnect/components';
import { AppComponent } from './app.component';

const TAIGA_UI = [TuiRootModule, TuiDialogModule, TuiAlertModule];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EsmShellFeatureModule,
    ScreenLoaderComponent,
    ...TAIGA_UI,
  ],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
