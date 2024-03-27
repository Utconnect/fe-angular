import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ESM_CONFIG } from '@esm/config';
import { LetModule } from '@ngrx/component';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDialogContext,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputCopyModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ObservableHelper } from '@utconnect/helpers';
import { filter, switchMap, tap } from 'rxjs';
import { ResetPasswordDialogStore } from './reset-password.store';

export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputCopyModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-dialog-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, LetModule, TAIGA_UI],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResetPasswordDialogStore],
})
export class EsmDialogResetPasswordComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly env = inject(ESM_CONFIG);
  private readonly store = inject(ResetPasswordDialogStore);
  private readonly alertService = inject(TuiAlertService);
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    boolean,
    string
  >;

  // PUBLIC PROPERTIES
  readonly newPassword = this.env.defaultPassword;
  readonly status$ = this.store.status$;
  readonly errors$ = this.store.errors$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleResetSuccess();
    this.handleResetFailed();
  }

  // PUBLIC METHODS
  reset(): void {
    this.store.resetPassword(this.context.data);
  }

  // PRIVATE METHODS
  private handleResetSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => {
          this.alertService
            .open('Đặt lại mật khẩu thành công!', {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.context.completeWith(true);
        }),
      )
      .subscribe();
  }

  private handleResetFailed(): void {
    this.errors$
      .pipe(
        ObservableHelper.filterNullish(),
        switchMap(() =>
          this.alertService.open('Đã có lỗi xảy ra, vui lòng thử lại sau!', {
            label: 'Lỗi',
            status: TuiNotification.Error,
          }),
        ),
      )
      .subscribe();
  }
}
