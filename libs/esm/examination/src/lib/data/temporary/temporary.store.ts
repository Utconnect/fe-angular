import { inject, Injectable } from '@angular/core';
import {
  ESMDomainEnumsExaminationStatus,
  ExaminationService,
  GetTemporaryDataData,
} from '@esm/api';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ObservableHelper } from '@utconnect/helpers';
import { GenericState, Status } from '@utconnect/types';
import {
  combineLatest,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type ExaminationDataTemporaryState = GenericState<
  GetTemporaryDataData['data']['items'],
  'data'
> & {
  activateStatus: Status;
  totalPages: number;
  pageNumber: number;
};

@Injectable()
export class ExaminationDataTemporaryStore extends ComponentStore<ExaminationDataTemporaryState> {
  // INJECT PROPERTIES
  private readonly examinationService = inject(ExaminationService);
  private readonly appStore = inject(Store<EsmState>);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);

  private readonly dataStatus$ = this.select((s) => s.dataStatus);
  private readonly pageNumber$ = this.select((s) => s.pageNumber);
  private readonly totalPages$ = this.select((s) => s.totalPages);
  private readonly activateStatus$ = this.select((s) => s.activateStatus);

  // GLOBAL SELECTORS
  private readonly examinationId$ = this.appStore
    .select(EsmSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  private readonly hasError$ = this.select(
    (s) => !!s.data.find((d) => Object.keys(d.errors).length > 0),
  );

  readonly headerObservables$ = combineLatest([
    this.pageNumber$,
    this.dataStatus$,
    this.hasError$,
    this.activateStatus$,
  ]).pipe(
    map(([pageNumber, dataStatus, hasError, activateStatus]) => ({
      pageNumber,
      dataStatus,
      hasError,
      activateStatus,
    })),
  );

  readonly paginationObservables$ = combineLatest([
    this.pageNumber$,
    this.totalPages$,
  ]).pipe(
    map(([pageNumber, totalPages]) => ({
      pageNumber,
      totalPages,
    })),
  );

  // EFFECTS
  readonly activate = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ activateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService
          .changeStatus(id, {
            status: ESMDomainEnumsExaminationStatus.AssignFaculty,
            createdAt: new Date(),
          })
          .pipe(
            tapResponse(
              () => {
                this.patchState({ activateStatus: 'success' });
                this.appStore.dispatch(
                  EsmPageAction.getExaminationSummary({ id }),
                );
              },
              () => this.patchState({ activateStatus: 'error' }),
            ),
          ),
      ),
    ),
  );

  readonly getData = this.effect<number>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
      withLatestFrom(this.examinationId$),
      switchMap(([pageNumber, id]) =>
        this.examinationService
          .getTemporaryData({
            examinationId: id,
            pageNumber: pageNumber + 1,
            pageSize: 50,
          })
          .pipe(
            tapResponse(
              ({ data }) =>
                this.patchState({
                  data: data.items,
                  dataStatus: 'success',
                  dataError: null,
                  totalPages: data.totalPages,
                  pageNumber,
                }),
              (error) =>
                this.patchState({
                  dataStatus: 'error',
                  dataError: error as string,
                }),
            ),
          ),
      ),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      dataStatus: 'loading',
      dataError: null,
      activateStatus: 'idle',
      totalPages: 0,
      pageNumber: 0,
    });
  }
}
