import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetTeachersData } from '@esm/api';
import { LetModule } from '@ngrx/component';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
  TuiAppearance,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogContext,
  TuiLoaderModule,
  TuiTextfieldAppearanceDirective,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiComboBoxModule } from '@taiga-ui/kit';
import {
  POLYMORPHEUS_CONTEXT,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus';
import {
  Subject,
  combineLatest,
  debounceTime,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { SelectTeacherDialogStore } from './select-teacher.store';

export const TAIGA_UI = [
  TuiButtonModule,
  TuiComboBoxModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LetModule,
    PolymorpheusModule,
    ...TAIGA_UI,
  ],
  templateUrl: './select-teacher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
      useFactory: (): TuiTextfieldAppearanceDirective => {
        const directive = new TuiTextfieldAppearanceDirective();
        directive.appearance = TuiAppearance.Textfield;
        return directive;
      },
    },
    TuiDestroyService,
    SelectTeacherDialogStore,
  ],
})
export class EsmDialogSelectTeacherComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    GetTeachersData['data'][number]
  >;
  private readonly store = inject(SelectTeacherDialogStore);
  private readonly destroy$ = inject(TuiDestroyService);

  readonly teacherContentContext!: {
    $implicit: GetTeachersData['data'][number];
  };
  readonly searchDebounce$ = new Subject<void>();
  private readonly data$ = this.store.data$;
  private readonly status$ = this.store.status$;
  readonly componentState$ = combineLatest([this.data$, this.status$]).pipe(
    map((arr) => ({ data: arr[0], status: arr[1] })),
  );
  teacher: GetTeachersData['data'][number] | null = null;
  search: string | null = null;

  ngOnInit(): void {
    this.searchDebounce$
      .pipe(
        debounceTime(500),
        tap(() => {
          if (this.search) this.store.search(this.search);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  // PUBLIC METHODS
  onSubmit(): void {
    if (this.teacher) {
      this.context.completeWith(this.teacher);
    }
  }
}
