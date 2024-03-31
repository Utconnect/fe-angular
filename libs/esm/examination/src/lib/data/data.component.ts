import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExaminationStatus } from '@esm/data';
import { LetModule } from '@ngrx/component';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { ExaminationDataStore } from './data.store';
import { ExaminationDataFinalComponent } from './final/final.component';
import { ExaminationDataImportComponent } from './import/import.component';
import { ExaminationDataTemporaryComponent } from './temporary/temporary.component';

export const NGRX = [LetModule];

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExaminationDataFinalComponent,
    ExaminationDataImportComponent,
    ExaminationDataTemporaryComponent,
    ...NGRX,
  ],
  providers: [ExaminationDataStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class ExaminationDataComponent {
  // INJECT PROPERTIES
  private readonly store = inject(ExaminationDataStore);

  // PUBLIC PROPERTIES
  readonly examination$ = this.store.examination$;
  readonly ExaminationStatus = ExaminationStatus;
}
