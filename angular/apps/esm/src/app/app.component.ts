import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import { ScreenLoaderComponent } from '@utconnect/components';

const TAIGA_UI = [TuiRootModule, TuiDialogModule, TuiAlertModule];

@Component({
  standalone: true,
  imports: [ScreenLoaderComponent,...TAIGA_UI, ],
  selector: 'angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {}
