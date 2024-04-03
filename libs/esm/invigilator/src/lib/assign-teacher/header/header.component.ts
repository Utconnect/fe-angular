import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { LetModule } from '@ngrx/component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { StringifyHelper } from '@utconnect/helpers';
import { ArrayPipe } from '@utconnect/pipes';
import { InvigilatorAssignTeacherStore } from '../assign-teacher.store';

export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-invigilator-assign-teacher-header',
  standalone: true,
  imports: [CommonModule, FormsModule, LetModule, ArrayPipe, ...TAIGA_UI],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvigilatorAssignTeacherHeaderComponent {
  // INJECTS
  private readonly store = inject(InvigilatorAssignTeacherStore);

  // OUTPUTS
  @Output()
  readonly saveChange = new EventEmitter<void>();

  // PROPERTIES
  readonly stringify = StringifyHelper.idName;
  // TODO
  readonly hideAutoAssign = true;
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly headerObservables$ = this.store.headerObservables$;

  /**
   * Called when select faculty from input select, only used if user has role `ExaminationDepartmentHead`
   */
  onSelectFaculty(facultyId: string): void {
    this.store.changeFaculty(facultyId);
  }

  autoAssign(): void {
    if (this.hideAutoAssign) return;
    this.store.autoAssign();
  }
}
