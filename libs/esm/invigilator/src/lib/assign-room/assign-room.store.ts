import { inject, Injectable } from '@angular/core';
import {
  AssignInvigilatorsToShiftsPayload,
  ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto,
  ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem,
  ExaminationService,
  GetAvailableInvigilatorsInShiftGroupData,
} from '@esm/api';
import { ObservableHelper, Status } from '@esm/cdk';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

export type ShiftUiModel = Omit<
  ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto,
  'invigilatorShift' | 'id'
> &
  ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto['invigilatorShift'][number];

export type InvigilatorItem =
  | {
      id: string;
      fullName: string;
    }
  | { temporaryName: string };

type InvigilatorMapType = Record<
  string,
  {
    facultyName?: string | null;
    departmentName?: string | null;
    phoneNumber?: string | null;
  } | null
>;

type InvigilatorAssignRoomState = {
  data: ShiftUiModel[];
  dataStatus: Status;
  //
  invigilatorsData: GetAvailableInvigilatorsInShiftGroupData['data'];
  invigilatorsDataStatus: Status;
  //
  invigilatorMap: InvigilatorMapType;
  //
  updateStatus: Status;
  //
  autoAssignStatus: Status;
};

@Injectable()
export class InvigilatorAssignRoomStore extends ComponentStore<InvigilatorAssignRoomState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);
  private readonly examinationService = inject(ExaminationService);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);

  private readonly invigilatorsData$ = this.select((s) => s.invigilatorsData);
  private readonly autoAssignStatus$ = this.select((s) => s.autoAssignStatus);
  private readonly invigilatorFacultyMap$ = this.select(
    (s) => s.invigilatorMap,
  );

  // GLOBAL SELECTORS
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));

  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  private readonly showLoader$ = combineLatest([
    this.dataStatus$,
    this.autoAssignStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));

  private readonly invigilatorsList$ = this.invigilatorsData$.pipe(
    map((data) => {
      const res: ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem[] =
        [];

      Object.values(data).forEach((invigilators) => {
        invigilators.forEach((i) => {
          res.push(i);
        });
      });

      return res;
    }),
  );

  readonly usedInvigilatorsMap$ = new BehaviorSubject<
    Record<string, Record<string, string | null>>
  >({});

  readonly headerObservables$ = combineLatest([
    this.showLoader$,
    this.examination$,
  ]).pipe(
    map(([showLoader, examination]) => ({
      showLoader,
      examination,
    })),
  );

  readonly tableObservables$ = combineLatest([
    this.data$,
    this.invigilatorsData$,
    this.invigilatorsList$,
    this.invigilatorFacultyMap$,
    this.usedInvigilatorsMap$,
  ]).pipe(
    map((arr) => ({
      data: arr[0],
      invigilatorsData: arr[1],
      invigilatorsList: arr[2],
      invigilatorFacultyMap: arr[3],
      usedInvigilatorsMap: arr[4],
    })),
  );

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getShifts(id).pipe(
          tapResponse(
            ({ data }) => {
              this.patchState({
                data: data.reduce<ShiftUiModel[]>((acc, curr) => {
                  curr.invigilatorShift.forEach((s) => {
                    acc.push({ ...curr, ...s });
                  });
                  return acc;
                }, []),
                dataStatus: 'success',
              });
            },
            () => this.patchState({ dataStatus: 'error' }),
          ),
        ),
      ),
    ),
  );

  readonly getInvigilatorsData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ invigilatorsDataStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getAvailableInvigilatorsInShiftGroup(id).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                invigilatorsData: data,
                invigilatorsDataStatus: 'success',
                invigilatorMap: Object.entries(data).reduce<InvigilatorMapType>(
                  (acc, [key, invigilators]) => {
                    invigilators.forEach((invigilator) => {
                      if (!acc[key] && 'id' in invigilator) {
                        const { facultyName, departmentName, phoneNumber } =
                          invigilator;
                        acc[invigilator.id] = {
                          facultyName,
                          departmentName,
                          phoneNumber,
                        };
                      }
                    });
                    return acc;
                  },
                  {},
                ),
              }),
            () => this.patchState({ invigilatorsDataStatus: 'error' }),
          ),
        ),
      ),
    ),
  );

  readonly autoAssign = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ autoAssignStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.autoAssignTeachersToShift(id).pipe(
          tapResponse(
            () => {
              this.patchState({ autoAssignStatus: 'success' });
              this.getData();
            },
            () => this.patchState({ autoAssignStatus: 'error' }),
          ),
        ),
      ),
    ),
  );

  readonly save = this.effect<AssignInvigilatorsToShiftsPayload>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ updateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(([params, id]) =>
        this.examinationService.assignInvigilatorsToShifts(id, params).pipe(
          tapResponse(
            () => {
              this.patchState({ updateStatus: 'success' });
              this.getData();
            },
            () => this.patchState({ updateStatus: 'error' }),
          ),
        ),
      ),
    ),
  );

  readonly updateTeacherAssignment = this.effect<{
    shiftGroupId: string;
    departmentId: string;
    userId: string;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ updateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(([{ departmentId, shiftGroupId, userId }, id]) =>
        this.examinationService
          .updateTemporaryTeacherToUserIdInDepartmentShiftGroup(
            id,
            shiftGroupId,
            departmentId,
            userId,
          )
          .pipe(
            tapResponse(
              () => {
                this.patchState({ updateStatus: 'success' });
                this.getData();
                this.getInvigilatorsData();
              },
              () => this.patchState({ updateStatus: 'error' }),
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
      invigilatorsData: {},
      invigilatorsDataStatus: 'loading',
      invigilatorMap: {},
      updateStatus: 'idle',
      autoAssignStatus: 'idle',
    });
  }
}
