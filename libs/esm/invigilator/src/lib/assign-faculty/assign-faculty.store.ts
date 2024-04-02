import { inject, Injectable } from '@angular/core';
import {
  ESMDomainEnumsExaminationStatus,
  ExaminationService,
  GetAllGroupsData,
} from '@esm/api';
import { EsmApiAction, EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ObservableHelper } from '@utconnect/helpers';
import { Status } from '@utconnect/types';
import {
  combineLatest,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type InvigilatorAssignFacultyState = {
  data: GetAllGroupsData['data'];
  dataStatus: Status;
  calculateStatus: Status;
  finishStatus: Status;
  updateRows: number[];
};

@Injectable()
export class InvigilatorAssignFacultyStore extends ComponentStore<InvigilatorAssignFacultyState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);
  private readonly examinationService = inject(ExaminationService);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly finishStatus$ = this.select((s) => s.finishStatus);
  readonly calculateStatus$ = this.select((s) => s.calculateStatus);

  private readonly updateRows$ = this.select((s) => s.updateRows);

  // GLOBAL SELECTORS
  readonly faculties$ = this.appStore
    .select(EsmSelector.faculties)
    .pipe(takeUntil(this.destroy$));

  private readonly examination$ = this.appStore
    .select(EsmSelector.examination)
    .pipe(takeUntil(this.destroy$));

  private readonly examinationId$ = this.appStore
    .select(EsmSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  private readonly columns$ = this.faculties$.pipe(
    map((faculties) => [
      'index',
      'moduleId',
      'moduleName',
      'method',
      'startAt',
      'shift',
      'facultyName',
      'roomsCount',
      'invigilatorsCount',
      ...faculties.map((f) => f.id),
      'total',
      'difference',
    ]),
  );

  readonly headerObservables$ = combineLatest([
    this.dataStatus$,
    this.finishStatus$,
    this.calculateStatus$,
    this.updateRows$,
    this.examination$,
  ]).pipe(
    map(
      ([
        dataStatus,
        finishStatus,
        calculateStatus,
        updateRows,
        examination,
      ]) => ({
        dataStatus,
        finishStatus,
        calculateStatus,
        updateRows,
        examination,
      }),
    ),
  );

  readonly tableObservables$ = combineLatest([
    this.columns$,
    this.faculties$,
    this.updateRows$,
    this.examination$,
  ]).pipe(
    map(([columns, faculties, updateRows, examination]) => ({
      columns,
      faculties,
      updateRows,
      examination,
    })),
  );

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getAllGroups(id).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                dataStatus: 'success',
              }),
            () => this.patchState({ dataStatus: 'error' }),
          ),
        ),
      ),
    ),
  );

  readonly calculate = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ calculateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) => {
        return this.examinationService
          .calculateInvigilatorNumerateOfShiftForEachFaculty(id)
          .pipe(
            tapResponse(
              () => {
                this.patchState({ calculateStatus: 'success' });
                this.getData();
              },
              () => this.patchState({ calculateStatus: 'error' }),
            ),
          );
      }),
    ),
  );

  readonly finishAssign = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ finishStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) => {
        return this.examinationService
          .changeStatus(id, {
            status: ESMDomainEnumsExaminationStatus.AssignInvigilator,
            createdAt: new Date(),
          })
          .pipe(
            tapResponse(
              () => {
                this.patchState({ finishStatus: 'success' });
                this.appStore.dispatch(
                  EsmApiAction.commitNumberOfInvigilatorForFacultySuccessful(),
                );
                this.getData();
              },
              () => this.patchState({ finishStatus: 'error' }),
            ),
          );
      }),
    ),
  );

  readonly save = this.effect<{
    rowId: number;
    facultyId: string;
    numberOfInvigilator: number;
  }>((params$) =>
    params$.pipe(
      tap(({ rowId }) =>
        this.patchState((s) => ({ updateRows: [...s.updateRows, rowId] })),
      ),
      withLatestFrom(this.data$, this.examinationId$),
      switchMap(([{ rowId, facultyId, numberOfInvigilator }, data, id]) => {
        return this.examinationService
          .assignInvigilatorNumerateOfShiftToFaculty(
            id,
            data[rowId].id,
            facultyId,
            numberOfInvigilator,
          )
          .pipe(
            tapResponse(
              ({ data }) => {
                this.patchState((s) => ({
                  data: s.data.map((d, i) => (i !== rowId ? d : data)),
                  updateRows: s.updateRows.filter((r) => r !== rowId),
                }));
              },
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              () => {},
            ),
          );
      }),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      dataStatus: 'loading',
      calculateStatus: 'idle',
      finishStatus: 'idle',
      updateRows: [],
    });
  }
}
