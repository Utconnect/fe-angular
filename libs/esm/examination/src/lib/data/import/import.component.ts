import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiFileLike, TuiInputFilesModule } from '@taiga-ui/kit';
import { filter, tap } from 'rxjs';
import { ExaminationDataImportStore } from './import.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiInputFilesModule];

@Component({
  selector: 'esm-examination-data-import',
  templateUrl: './import.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ...NGRX, ...TAIGA_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataImportStore],
})
export class ExaminationDataImportComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly store = inject(ExaminationDataImportStore);

  // OUTPUT
  @Output() uploadSuccess = new EventEmitter<void>();

  // PUBLIC PROPERTIES
  file: TuiFileLike | null = null;
  readonly status$ = this.store.status$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleUploadSuccess();
  }

  // PUBLIC METHODS
  removeFile(): void {
    this.file = null;
  }

  clearRejected(): void {
    this.removeFile();
    this.store.clearRejected();
  }

  importFile(file: File): void {
    this.store.import({ File: file });
  }

  // PRIVATE METHODS
  private handleUploadSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => this.store.reloadExamination()),
      )
      .subscribe();
  }
}
