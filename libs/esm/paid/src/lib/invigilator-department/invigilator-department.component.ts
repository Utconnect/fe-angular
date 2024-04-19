import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esm-paid-invigilator-department',
  templateUrl: './invigilator-department.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsmPaidInvigilatorDepartmentComponent {}
