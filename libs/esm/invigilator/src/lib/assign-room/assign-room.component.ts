import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { LetModule } from '@ngrx/component';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { RequiredStepComponent } from '@utconnect/components';
import { InvigilatorAssignRoomStore } from './assign-room.store';
import { InvigilatorAssignRoomHeaderComponent } from './header/header.component';
import { InvigilatorAssignRoomTableComponent } from './table/table.component';

@Component({
  templateUrl: './assign-room.component.html',
  styleUrls: ['./assign-room.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    InvigilatorAssignRoomStore,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
  imports: [
    CommonModule,
    LetModule,
    RequiredStepComponent,
    InvigilatorAssignRoomHeaderComponent,
    InvigilatorAssignRoomTableComponent,
  ],
})
export class InvigilatorAssignRoomComponent {
  // INJECT PROPERTIES
  private readonly store = inject(InvigilatorAssignRoomStore);

  // VIEW CHILD
  @ViewChild('table')
  table?: InvigilatorAssignRoomTableComponent;

  // PUBLIC PROPERTIES
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly dataStatus$ = this.store.dataStatus$;

  // PUBLIC METHODS
  readonly getDataFunc = (): void => {
    this.store.getData();
    this.store.getInvigilatorsData();
  };
}
