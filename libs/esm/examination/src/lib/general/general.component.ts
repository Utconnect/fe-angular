import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { LetModule } from '@ngrx/component';
import { TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';
import { RequiredStepComponent } from '@utconnect/components';
import { PercentagePipe } from '@utconnect/pipes';
import { map, Subscription } from 'rxjs';
import { ExaminationProcessStore } from './general.store';

const TAIGA_UI = [
  // TuiButtonModule,
  TuiIslandModule,
  TuiProgressModule,
];

@Component({
  templateUrl: './general.component.html',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    RequiredStepComponent,
    PercentagePipe,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // tuiButtonOptionsProvider({ size: 'm' }),
    ExaminationProcessStore,
  ],
})
export class ExaminationGeneralComponent implements OnInit {
  // // INJECT PROPERTIES
  // private readonly injector = inject(Injector);
  // private readonly dialogService = inject(TuiDialogService);
  // // PUBLIC METHODS
  // openWorkflow(): void {
  //   this.dialogService
  //     .open<boolean>(
  //       new PolymorpheusComponent(WorkflowDialogComponent, this.injector),
  //       {
  //         size: 'auto',
  //       }
  //     )
  //     .subscribe();
  // }

  // INJECT PROPERTIES
  private readonly store = inject(ExaminationProcessStore);

  // PUBLIC PROPERTIES
  // startDate = new Date(2023, 5, 1);
  // endDate = new Date(2023, 5, 30);
  // modulesCount = 100;
  // subjectsCount = 1000;8
  // candidatesCount = 10000;
  // invigilatorsCount = 1000;
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;

  readonly status$ = this.store.status$;
  readonly showLoader$ = this.store.status$.pipe(map((s) => s === 'loading'));

  // PRIVATE PROPERTIES
  readonly statistic$ = this.store.data$;

  readonly getDataFunc = (): Subscription => this.store.getStatistic();

  // CONSTRUCTOR
  // constructor() {}

  // LIFECYCLE
  ngOnInit(): void {
    this.store.getStatistic();
  }
}
