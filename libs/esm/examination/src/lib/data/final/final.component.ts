import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiLoaderModule } from '@taiga-ui/core';
import { ExaminationDataFinalStore } from './final.store';
import { ExaminationDataFinalHeaderComponent } from './header/header.component';
import { ExaminationDataFinalTableComponent } from './table/table.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiLoaderModule];

@Component({
  selector: 'esm-examination-data-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    ExaminationDataFinalHeaderComponent,
    ExaminationDataFinalTableComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataFinalStore],
})
export class ExaminationDataFinalComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly store = inject(ExaminationDataFinalStore);

  // PUBLIC PROPERTIES
  readonly status$ = this.store.status$;

  // LIFECYCLE
  ngOnInit(): void {
    this.store.getData();
  }
}
