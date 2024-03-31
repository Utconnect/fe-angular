import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ESMApplicationRoomsCommandsCreateCreateCommand } from '@esm/api';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogContext,
  TuiHintModule,
  TuiNotification,
} from '@taiga-ui/core';
import { TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, map, tap } from 'rxjs';
import { EsmEditRoomDialogStore } from './edit-room.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiHintModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTableModule,
];

@Component({
  selector: 'esm-dialog-edit-room',
  templateUrl: './edit-room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  providers: [
    EsmEditRoomDialogStore,
    tuiButtonOptionsProvider({ appearance: 'icon', size: 'm' }),
  ],
})
export class EsmEditRoomDialogComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(EsmEditRoomDialogStore);
  private readonly alertService = inject(TuiAlertService);
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    boolean,
    string[]
  >;

  // PUBLIC PROPERTIES
  form!: FormGroup<{
    rooms: FormArray<
      FormGroup<{
        displayId: FormControl<string | null>;
        capacity: FormControl<number | null | undefined>;
      }>
    >;
  }>;
  shouldUpdate = false;
  readonly columns = ['id', 'roomId', 'capacity', 'action'];
  readonly data$ = this.store.data$;
  readonly status$ = this.store.status$;

  // LIFECYCLE
  ngOnInit(): void {
    this.store.init(this.context.data);

    this.handleDataChange();
    this.handleCreateSuccess();
  }

  // PUBLIC METHODS
  public onRemove(rowId: number): void {
    const roomControls = this.form.controls.rooms;

    roomControls.removeAt(rowId);
    if (!roomControls.length) {
      this.context.completeWith(this.shouldUpdate);
    }
  }

  public onCreate(rowId: number): void {
    const params = this.form.getRawValue().rooms[
      rowId
    ] as ESMApplicationRoomsCommandsCreateCreateCommand;
    this.store.create({ rowId, params });
  }

  // PRIVATE METHODS
  private handleCreateSuccess(): void {
    this.status$
      .pipe(
        map((s) => s.indexOf('success')),
        filter((i) => i !== -1),
        tap((i) => {
          this.shouldUpdate = true;
          this.alertService
            .open('Thêm phòng thành công!', {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.onRemove(i);
        }),
      )
      .subscribe();
  }

  private handleDataChange(): void {
    this.data$
      .pipe(
        tap((data) => {
          this.form = this.fb.group({
            rooms: this.fb.array(
              data.map(({ displayId, capacity }) =>
                this.fb.group({
                  displayId: [displayId, Validators.required],
                  capacity: [capacity],
                }),
              ),
            ),
          });
        }),
      )
      .subscribe();
  }
}
