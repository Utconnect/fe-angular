import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { TeacherService } from '@esm/api';
import { EsmDialogResetPasswordComponent } from '@esm/dialog';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogService,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter } from 'rxjs';
import { DataResetPasswordStore } from './reset-password.store';

const TAIGA_UI = [TuiLoaderModule, TuiTableModule, TuiButtonModule];

@Component({
  standalone: true,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DataResetPasswordStore,
    TeacherService,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class DataResetPasswordComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly store = inject(DataResetPasswordStore);
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);

  // PUBLIC PROPERTIES
  readonly columns = ['name', 'faculty', 'action'];

  readonly data$ = this.store.data$;
  readonly status$ = this.store.status$;

  // LIFECYCLE
  ngOnInit(): void {
    this.store.getData();
  }

  // PUBLIC METHODS
  openDialog(accountId: string): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(
          EsmDialogResetPasswordComponent,
          this.injector,
        ),
        {
          data: accountId,
          dismissible: false,
        },
      )
      .pipe(
        filter((x) => x),
        // tap(() => this.store.load())
      )
      .subscribe();
  }
}
