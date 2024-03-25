import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EditDepartmentDialogComponent } from '@esm/dialog';
import { DepartmentSummary } from '@esm/model';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogService,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { StringifyHelper } from '@utconnect/helpers';
import { filter, tap } from 'rxjs';
import { DataDepartmentStore } from './department.store';

const NGRX = [LetModule];
const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSelectModule,
  TuiTableModule,
];

@Component({
  templateUrl: './department.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    EditDepartmentDialogComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataDepartmentStore],
})
export class DataDepartmentComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly injector = inject(Injector);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(DataDepartmentStore);
  private readonly dialogService = inject(TuiDialogService);

  // PUBLIC PROPERTIES
  readonly columns = ['displayId', 'name', 'facultyName', 'action'];
  readonly facultyStringify = StringifyHelper.idName;
  readonly invigilatorRouterLink = '/data/invigilator';

  readonly status$ = this.store.status$;
  readonly tableObservables$ = this.store.tableObservables$;
  readonly headerObservables$ = this.store.headerObservables$;

  // LIFECYCLE
  ngOnInit(): void {
    const facultyIdFromRoute =
      this.route.snapshot.queryParams['facultyId'] || '';
    this.store.changeSelectedFaculty(facultyIdFromRoute);
  }

  // PUBLIC METHODS
  onChangeSelectedFaculty(facultyId: string): void {
    this.store.changeSelectedFaculty(facultyId);
  }

  openDialog(data?: DepartmentSummary): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(EditDepartmentDialogComponent, this.injector),
        { data },
      )
      .pipe(
        filter((x) => x),
        tap(() => this.store.load()),
      )
      .subscribe();
  }

  readonly departmentMatcher = (
    item: DepartmentSummary,
    facultyId: string,
  ): boolean => !facultyId || item.faculty?.id === facultyId;
}
