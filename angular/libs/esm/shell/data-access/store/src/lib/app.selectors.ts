import { GetAllFacultyData, GetMySummaryInfoData } from '@esm/api';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { ObservableHelper, StringHelper } from '@utconnect/helpers';
import { Observable, UnaryFunction, map, pipe } from 'rxjs';
import { appFeatureKey } from './app.reducer';
import { EsmState } from './app.state';

export class EsmSelector {
  private static readonly selector =
    createFeatureSelector<EsmState>(appFeatureKey);

  static readonly user = createSelector(this.selector, state => state.user);
  static readonly notNullUser = pipe(
    select(this.user),
    ObservableHelper.filterNullish()
  );
  static readonly userStatus = createSelector(
    this.selector,
    state => state.userStatus
  );
  static readonly roles = createSelector(
    this.selector,
    state => state.user?.roles ?? []
  );

  static readonly userName = pipe(
    this.notNullUser,
    map(user =>
      this.isOrganizationAccount(user)
        ? user.fullName
        : StringHelper.getFirstName(user.fullName ?? '')
    )
  );

  static readonly userTitle = (
    useTitleCase = true
  ): UnaryFunction<Observable<object>, Observable<string | null>> =>
    pipe(
      this.notNullUser,
      map(user => {
        if (this.isOrganizationAccount(user)) return null;

        let title = user.isMale ? 'Thầy' : 'Cô';
        if (!useTitleCase) {
          title = title.toLocaleLowerCase();
        }
        return title;
      })
    );

  static readonly showLoader = createSelector(
    this.selector,
    this.userStatus,
    ({ showLoader: userShowLoader }, status) => {
      if (userShowLoader !== null) {
        return userShowLoader;
      }
      return status === 'idle' || status === 'loading';
    }
  );

  static readonly examinationStatus = createSelector(
    this.selector,
    state => state.examinationStatus
  );

  static readonly examinationId = createSelector(
    this.selector,
    state => state.examinationId
  );

  static readonly examination = createSelector(
    this.selector,
    state => state.examination
  );

  static readonly relatedExaminationsStatus = createSelector(
    this.selector,
    state => state.relatedExaminationsStatus
  );

  static readonly relatedExaminations = createSelector(
    this.selector,
    state => state.relatedExaminations
  );

  static readonly departmentsStatus = createSelector(
    this.selector,
    state => state.departmentsStatus
  );

  static readonly facultiesWithDepartment = createSelector(
    this.selector,
    state => state.departments
  );

  static readonly faculties = createSelector(this.selector, state =>
    state.departments.map(f => {
      const { departments, ...rest } = f;
      return rest as GetAllFacultyData['data'][number];
    })
  );

  // static readonly departmentsWithFaculty = createSelector(
  //   this.selector,
  //   state =>
  //     state.departments.reduce((acc, curr) => {
  //       acc = [
  //         ...acc,
  //         ...curr.departments.map(f => {
  //           const { departments, ...faculty } = curr;
  //           const res = { ...f, faculty };
  //           return res;
  //         }),
  //       ];
  //       return acc;
  //     }, [] as DepartmentSummary[])
  // );

  private static isOrganizationAccount({
    faculty,
    roles,
  }: GetMySummaryInfoData['data']): boolean {
    return !!faculty || roles.includes('ExaminationDepartmentHead');
  }
}
