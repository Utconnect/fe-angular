import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EsmDialogEditFacultyComponent } from '@esm/dialog';
import { FacultySummary } from '@esm/model';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogService,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { DataFacultyStore } from './faculty.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiTableModule,
];

@Component({
  templateUrl: './faculty.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EsmDialogEditFacultyComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [DataFacultyStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class DataFacultyComponent {
  // INJECT PROPERTIES
  private readonly store = inject(DataFacultyStore);
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);

  // PUBLIC PROPERTIES
  readonly departmentRouterLink = '/data/department';
  readonly columns = ['displayId', 'name', 'action'];
  readonly faculties$ = this.store.faculties$;
  readonly status$ = this.store.status$;

  // PUBLIC METHODS
  openDialog(data?: FacultySummary): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(EsmDialogEditFacultyComponent, this.injector),
        { data },
      )
      .pipe(
        filter((x) => x),
        tap(() => this.store.load()),
      )
      .subscribe();
  }
}
