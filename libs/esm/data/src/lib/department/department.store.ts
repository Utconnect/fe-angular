import { inject, Injectable } from '@angular/core';
import { EsmPageAction, EsmSelector, EsmState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { combineLatest, map, takeUntil, tap } from 'rxjs';

type DataDepartmentState = {
  selectedFacultyId: string;
};

@Injectable()
export class DataDepartmentStore extends ComponentStore<DataDepartmentState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<EsmState>);

  // STATE SELECTORS
  private readonly selectedFacultyId$ = this.select((s) => s.selectedFacultyId);

  // GLOBAL SELECTORS
  readonly status$ = this.appStore
    .select(EsmSelector.departmentsStatus)
    .pipe(takeUntil(this.destroy$));

  private readonly faculties$ = this.appStore
    .select(EsmSelector.faculties)
    .pipe(takeUntil(this.destroy$));
  private readonly departments$ = this.appStore
    .select(EsmSelector.departmentsWithFaculty)
    .pipe(takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  private readonly selectedFacultyName$ = combineLatest([
    this.faculties$,
    this.selectedFacultyId$,
  ]).pipe(
    map(([faculties, id]) => faculties.find((f) => f.id === id)?.name ?? ''),
  );

  readonly headerObservables$ = combineLatest([
    this.selectedFacultyName$,
    this.selectedFacultyId$,
    this.faculties$,
  ]).pipe(
    map(([selectedFacultyName, selectedFacultyId, faculties]) => ({
      selectedFacultyName,
      selectedFacultyId,
      faculties,
    })),
  );

  readonly tableObservables$ = combineLatest([
    this.departments$,
    this.selectedFacultyId$,
  ]).pipe(
    map(([departments, selectedFacultyId]) => ({
      departments,
      selectedFacultyId,
    })),
  );

  // EFFECTS
  readonly changeSelectedFaculty = this.effect<string>((params$) =>
    params$.pipe(tap((id) => this.patchState({ selectedFacultyId: id }))),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      selectedFacultyId: '',
    });
  }

  // PUBLIC METHODS
  load(): void {
    this.appStore.dispatch(EsmPageAction.getDepartments());
  }
}
