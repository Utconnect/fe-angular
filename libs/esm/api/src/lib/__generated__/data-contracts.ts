/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type AssignInvigilatorNumerateOfShiftToFacultyData =
  ESMApplicationCommonModelsResultESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto;

/** @format int32 */
export type AssignInvigilatorNumerateOfShiftToFacultyPayload = number;

export type AssignInvigilatorsNumberToFacultyData =
  ESMApplicationCommonModelsResultESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto;

/** @format int32 */
export type AssignInvigilatorsNumberToFacultyPayload = number;

export type AssignInvigilatorsToShiftsData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type AssignInvigilatorsToShiftsPayload = Record<string, string>;

export type AutoAssignTeachersToGroupsData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type AutoAssignTeachersToShiftData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type CalculateInvigilatorNumerateOfShiftForEachFacultyData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type ChangePasswordData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type ChangeStatusData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type CreateDepartmentData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateExaminationData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateFacultyData =
  ESMApplicationCommonModelsResultESMDomainDtosFacultyFacultySummary;

export type CreateModuleData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateRoomData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateUserData = ESMApplicationCommonModelsResultSystemGuid;

export interface ESMApplicationAuthCommandsChangePasswordChangePasswordCommand {
  newPassword: string;
  oldPassword: string;
}

export interface ESMApplicationAuthCommandsLoginLoginCommand {
  password: string;
  userName: string;
}

export interface ESMApplicationAuthQueriesMySummaryInfoInternalDepartment {
  faculty: ESMApplicationAuthQueriesMySummaryInfoInternalFaculty;
  /** @format uuid */
  id: string;
}

export interface ESMApplicationAuthQueriesMySummaryInfoInternalFaculty {
  displayId?: string | null;
  /** @format uuid */
  id: string;
  name: string;
}

export interface ESMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto {
  department: ESMApplicationAuthQueriesMySummaryInfoInternalDepartment;
  faculty: ESMApplicationAuthQueriesMySummaryInfoInternalFaculty;
  fullName?: string | null;
  /** @format uuid */
  id: string;
  isMale?: boolean | null;
  phoneNumber?: string | null;
  roles: string[];
}

export interface ESMApplicationCommonModelsError {
  /**
   *
   *
   * 100 = Continue
   *
   * 101 = SwitchingProtocols
   *
   * 102 = Processing
   *
   * 103 = EarlyHints
   *
   * 200 = OK
   *
   * 201 = Created
   *
   * 202 = Accepted
   *
   * 203 = NonAuthoritativeInformation
   *
   * 204 = NoContent
   *
   * 205 = ResetContent
   *
   * 206 = PartialContent
   *
   * 207 = MultiStatus
   *
   * 208 = AlreadyReported
   *
   * 226 = IMUsed
   *
   * 300 = Ambiguous
   *
   * 301 = Moved
   *
   * 302 = Redirect
   *
   * 303 = RedirectMethod
   *
   * 304 = NotModified
   *
   * 305 = UseProxy
   *
   * 306 = Unused
   *
   * 307 = RedirectKeepVerb
   *
   * 308 = PermanentRedirect
   *
   * 400 = BadRequest
   *
   * 401 = Unauthorized
   *
   * 402 = PaymentRequired
   *
   * 403 = Forbidden
   *
   * 404 = NotFound
   *
   * 405 = MethodNotAllowed
   *
   * 406 = NotAcceptable
   *
   * 407 = ProxyAuthenticationRequired
   *
   * 408 = RequestTimeout
   *
   * 409 = Conflict
   *
   * 410 = Gone
   *
   * 411 = LengthRequired
   *
   * 412 = PreconditionFailed
   *
   * 413 = RequestEntityTooLarge
   *
   * 414 = RequestUriTooLong
   *
   * 415 = UnsupportedMediaType
   *
   * 416 = RequestedRangeNotSatisfiable
   *
   * 417 = ExpectationFailed
   *
   * 421 = MisdirectedRequest
   *
   * 422 = UnprocessableEntity
   *
   * 423 = Locked
   *
   * 424 = FailedDependency
   *
   * 426 = UpgradeRequired
   *
   * 428 = PreconditionRequired
   *
   * 429 = TooManyRequests
   *
   * 431 = RequestHeaderFieldsTooLarge
   *
   * 451 = UnavailableForLegalReasons
   *
   * 500 = InternalServerError
   *
   * 501 = NotImplemented
   *
   * 502 = BadGateway
   *
   * 503 = ServiceUnavailable
   *
   * 504 = GatewayTimeout
   *
   * 505 = HttpVersionNotSupported
   *
   * 506 = VariantAlsoNegotiates
   *
   * 507 = InsufficientStorage
   *
   * 508 = LoopDetected
   *
   * 510 = NotExtended
   *
   * 511 = NetworkAuthenticationRequired
   */
  code: SystemNetHttpStatusCode;
  message: string;
  property?: string | null;
}

export interface ESMApplicationCommonModelsPaginatedListESMDomainEntitiesExaminationData {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isEmpty: boolean;
  items: ESMDomainEntitiesExaminationData[];
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
}

export type ESMApplicationCommonModelsResult =
  ESMApplicationCommonModelsResultSystemBoolean;

export interface ESMApplicationCommonModelsResultESMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto {
  data: ESMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultESMApplicationCommonModelsPaginatedListESMDomainEntitiesExaminationData {
  data: ESMApplicationCommonModelsPaginatedListESMDomainEntitiesExaminationData;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsDto {
  data: Record<
    string,
    (
      | ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemVerifiedInvigilator
      | ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemTemporaryInvigilator
    )[]
  >;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultESMApplicationExaminationsQueriesGetStatisticGetStatisticDto {
  data: ESMApplicationExaminationsQueriesGetStatisticGetStatisticDto;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto {
  data: ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultESMDomainDtosExaminationExaminationSummary {
  data: ESMDomainDtosExaminationExaminationSummary;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultESMDomainDtosFacultyFacultySummary {
  data: ESMDomainDtosFacultyFacultySummary;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultESMDomainDtosGeneratedToken {
  data: ESMDomainDtosGeneratedToken;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemBoolean {
  data: boolean;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableESMApplicationTeachersQueriesGetGetDto {
  data: ESMApplicationTeachersQueriesGetGetDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableESMDomainDtosUserUserSummary {
  data: ESMDomainDtosUserUserSummary[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDto {
  data: ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto {
  data: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto {
  data: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDto {
  data: ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDto {
  data: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetRelatedExaminationsRelatedExaminationDto {
  data: ESMApplicationExaminationsQueriesGetRelatedExaminationsRelatedExaminationDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationFacultiesQueriesGetAllGetAllDto {
  data: ESMApplicationFacultiesQueriesGetAllGetAllDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainDtosUserUserSummary {
  data: ESMDomainDtosUserUserSummary[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainEntitiesExaminationEvent {
  data: ESMDomainEntitiesExaminationEvent[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationCommonModelsResultSystemGuid {
  /** @format uuid */
  data: string;
  errors?: ESMApplicationCommonModelsError[] | null;
  success: boolean;
}

export interface ESMApplicationDepartmentsCommandsCreateDepartmentCreateDepartmentCommand {
  displayId?: string | null;
  /** @format uuid */
  facultyId?: string | null;
  name: string;
}

export interface ESMApplicationDepartmentsCommandsCreateUserInDepartmentCreateUserInDepartmentParams {
  email: string;
  fullName: string;
  isMale: boolean;
  phoneNumber?: string | null;
  teacherId?: string | null;
}

export interface ESMApplicationDepartmentsCommandsUpdateDepartmentUpdateDepartmentParams {
  displayId: string;
  facultyId: string;
  name: string;
}

export interface ESMApplicationExaminationsCommandsChangeStatusChangeStatusRequest {
  /** @format date-time */
  createdAt: Date;
  /**
   *
   *
   * 0 = None
   *
   * 1 = Idle
   *
   * 2 = Setup
   *
   * 4 = AssignFaculty
   *
   * 8 = AssignInvigilator
   *
   * 16 = Closed
   */
  status: ESMDomainEnumsExaminationStatus;
}

export interface ESMApplicationExaminationsCommandsCreateCreateCommand {
  /** @format date-time */
  createdAt: Date;
  description?: string | null;
  displayId?: string | null;
  /** @format date-time */
  expectEndAt?: Date | null;
  /** @format date-time */
  expectStartAt?: Date | null;
  name: string;
}

export interface ESMApplicationExaminationsCommandsUpdateTeacherAssignmentUpdateTeacherAssignmentDto {
  departmentId?: string | null;
  temporaryInvigilatorName?: string | null;
  userId?: string | null;
}

export interface ESMApplicationExaminationsCommandsUpdateUpdateParams {
  description?: string | null;
  displayId?: string | null;
  /** @format date-time */
  expectEndAt?: Date | null;
  /** @format date-time */
  expectStartAt?: Date | null;
  name?: string | null;
  /** @format date-time */
  updatedAt?: Date | null;
}

export interface ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDto {
  assignNumerate: Record<string, ESMDomainDtosExaminationShiftGroupDataCell>;
  departmentAssign: boolean;
  /** @format uuid */
  id: string;
  /** @format int32 */
  invigilatorsCount: number;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method: ESMDomainEnumsExamMethod;
  module: ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDtoInternalModule;
  /** @format int32 */
  roomsCount: number;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt: Date;
}

export interface ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDtoInternalFaculty {
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDtoInternalModule {
  displayId: string;
  faculty: ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDtoInternalFaculty;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto {
  /** @format int32 */
  candidatesCount: number;
  invigilatorShift: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalInvigilatorShift[];
  isDuplicated: boolean;
  room: ESMDomainDtosRoomRoomSummary;
  shiftGroup: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalShiftGroup;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalDepartment {
  displayId?: string | null;
  faculty: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalFaculty;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalFaculty {
  displayId?: string | null;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalInvigilatorShift {
  /** @format uuid */
  id: string;
  invigilator: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalTeacher;
  /** @format int32 */
  orderIndex: number;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalShiftGroup {
  departmentAssign: boolean;
  /** @format uuid */
  id: string;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method: ESMDomainEnumsExamMethod;
  module: ESMDomainDtosModuleModuleSimple;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt: Date;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalTeacher {
  department: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalDepartment;
  fullName: string;
  /** @format uuid */
  id: string;
  invigilatorId?: string | null;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto {
  /** @format int32 */
  candidatesCount: number;
  /** @format int32 */
  examsCount: number;
  /** @format uuid */
  id: string;
  /** @format int32 */
  invigilatorsCount: number;
  room: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalRoom;
  shiftGroup: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalShiftGroup;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalModule {
  /** @format int32 */
  credits: number;
  displayId: string;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalRoom {
  displayId: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalShiftGroup {
  departmentAssign: boolean;
  /** @format uuid */
  id: string;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method: ESMDomainEnumsExamMethod;
  module: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalModule;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt: Date;
}

export interface ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem {
  isPriority: boolean;
}

export type ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemTemporaryInvigilator =
  ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem & {
    /** @format uuid */
    departmentId?: string | null;
    temporaryName: string;
  };

export type ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemVerifiedInvigilator =
  ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem & {
    departmentName?: string | null;
    facultyName?: string | null;
    fullName: string;
    /** @format uuid */
    id: string;
    invigilatorId?: string | null;
    phoneNumber?: string | null;
  };

export interface ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDto {
  /** @format uuid */
  departmentId?: string | null;
  facultyShiftGroup: ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalFacultyShiftGroup;
  /** @format uuid */
  id: string;
  temporaryInvigilatorName?: string | null;
  user: ESMDomainDtosUserUserSimple;
}

export interface ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalFacultyShiftGroup {
  /** @format uuid */
  id: string;
  shiftGroup: ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalShiftGroup;
}

export interface ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalModule {
  displayId: string;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalShiftGroup {
  module: ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalModule;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt: Date;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDto {
  /** @format uuid */
  handedOverUserId?: string | null;
  /** @format uuid */
  id: string;
  invigilatorShift: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalInvigilatorShift[];
  report?: string | null;
  room: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalRoom;
  shiftGroup: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalShiftGroup;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalDepartment {
  displayId?: string | null;
  faculty: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalFaculty;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalFaculty {
  displayId?: string | null;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalInvigilatorShift {
  /** @format uuid */
  id: string;
  invigilator: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalUser;
  /** @format int32 */
  orderIndex: number;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalModule {
  displayId: string;
  faculty: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalFaculty;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalRoom {
  displayId: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalShiftGroup {
  departmentAssign: boolean;
  /** @format uuid */
  id: string;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method: ESMDomainEnumsExamMethod;
  module: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalModule;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt: Date;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalUser {
  department: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalDepartment;
  fullName: string;
  /** @format uuid */
  id: string;
  invigilatorId?: string | null;
}

export interface ESMApplicationExaminationsQueriesGetRelatedExaminationsRelatedExaminationDto {
  displayId: string;
  /** @format uuid */
  id: string;
  name: string;
}

export interface ESMApplicationExaminationsQueriesGetStatisticGetStatisticDto {
  displayId?: string | null;
  /** @format date-time */
  endAt?: Date | null;
  /** @format uuid */
  id: string;
  name: string;
  /** @format int32 */
  numberOfCandidates: number;
  /** @format int32 */
  numberOfInvigilators: number;
  /** @format int32 */
  numberOfModules: number;
  /** @format int32 */
  numberOfModulesOver: number;
  /** @format int32 */
  numberOfShifts: number;
  /** @format int32 */
  numberOfShiftsOver: number;
  /** @format date-time */
  startAt?: Date | null;
  /** @format double */
  timePercent: number;
}

export interface ESMApplicationFacultiesCommandsCreateCreateCommand {
  displayId?: string | null;
  name: string;
}

export interface ESMApplicationFacultiesCommandsUpdateUpdateRequest {
  displayId: string;
  name: string;
}

export interface ESMApplicationFacultiesQueriesGetAllGetAllDto {
  departments: ESMApplicationFacultiesQueriesGetAllGetAllDtoInternalDepartment[];
  displayId?: string | null;
  /** @format uuid */
  id: string;
  name: string;
}

export interface ESMApplicationFacultiesQueriesGetAllGetAllDtoInternalDepartment {
  displayId?: string | null;
  /** @format uuid */
  id: string;
  name: string;
}

export interface ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto {
  assignNumerate: Record<string, ESMDomainDtosExaminationShiftGroupDataCell>;
  departmentAssign: boolean;
  /** @format uuid */
  id: string;
  /** @format int32 */
  invigilatorsCount: number;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method: ESMDomainEnumsExamMethod;
  module: ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDtoInternalModule;
  /** @format int32 */
  roomsCount: number;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt: Date;
}

export interface ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDtoInternalFaculty {
  name: string;
}

export interface ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDtoInternalModule {
  displayId: string;
  faculty: ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDtoInternalFaculty;
  name: string;
}

export interface ESMApplicationGroupsCommandsUpdateTemporaryNameToTeacherUpdateTemporaryNameToTeacherRequest {
  userId: string;
}

export interface ESMApplicationModulesCommandsCreateCreateCommand {
  departmentId?: string | null;
  displayId: string;
  facultyId: string;
  name: string;
}

export interface ESMApplicationModulesCommandsImportImportCommand {
  files: File[];
}

export interface ESMApplicationRoomsCommandsCreateCreateCommand {
  /** @format int32 */
  capacity?: number | null;
  displayId: string;
}

export interface ESMApplicationShiftsCommandsUpdateUpdateRequest {
  handoverTeacherId?: string | null;
  report?: string | null;
}

export interface ESMApplicationTeachersCommandsUpdateUpdateRequest {
  departmentId?: string | null;
  email: string;
  fullName: string;
  isMale: boolean;
  teacherId?: string | null;
}

export interface ESMApplicationTeachersQueriesGetGetDto {
  /** @format date-time */
  createdAt: Date;
  department: ESMDomainDtosDepartmentDepartmentSummary;
  email?: string | null;
  faculty: ESMDomainDtosFacultyFacultySummary;
  fullName: string;
  /** @format uuid */
  id: string;
  invigilatorId?: string | null;
  isMale: boolean;
  phoneNumber?: string | null;
  userName: string;
}

export type ESMDomainCommonBaseAuditableEntity = ESMDomainCommonBaseEntity & {
  /** @format date-time */
  created: Date;
  /** @format uuid */
  createdBy?: string | null;
  /** @format date-time */
  lastModified?: Date | null;
  /** @format uuid */
  lastModifiedBy?: string | null;
};

export interface ESMDomainCommonBaseEntity {
  domainEvents: ESMDomainCommonBaseEvent[];
  /** @format uuid */
  id: string;
}

export type ESMDomainCommonBaseEvent = object;

export interface ESMDomainDtosDepartmentDepartmentSummary {
  displayId?: string | null;
  faculty: ESMDomainDtosFacultyFacultySummary;
  /** @format uuid */
  id: string;
  name: string;
}

export interface ESMDomainDtosExaminationExaminationSummary {
  /** @format date-time */
  createdAt: Date;
  /** @format uuid */
  createdBy: string;
  description?: string | null;
  displayId: string;
  /** @format date-time */
  expectEndAt?: Date | null;
  /** @format date-time */
  expectStartAt?: Date | null;
  /** @format uuid */
  id: string;
  name: string;
  /**
   *
   *
   * 0 = None
   *
   * 1 = Idle
   *
   * 2 = Setup
   *
   * 4 = AssignFaculty
   *
   * 8 = AssignInvigilator
   *
   * 16 = Closed
   */
  status: ESMDomainEnumsExaminationStatus;
  /** @format date-time */
  updatedAt?: Date | null;
}

export interface ESMDomainDtosExaminationShiftGroupDataCell {
  /** @format int32 */
  actual: number;
  /** @format int32 */
  calculated: number;
  /** @format int32 */
  maximum: number;
}

export interface ESMDomainDtosFacultyFacultySummary {
  displayId?: string | null;
  /** @format uuid */
  id: string;
  name: string;
}

export interface ESMDomainDtosGeneratedToken {
  /** @format date-time */
  expiration: Date;
  token: string;
}

export interface ESMDomainDtosModuleModuleSimple {
  /** @format int32 */
  credits: number;
  displayId: string;
  faculty: ESMDomainDtosFacultyFacultySummary;
  /** @format uuid */
  id: string;
  name: string;
}

export interface ESMDomainDtosRoomRoomSummary {
  /** @format int32 */
  capacity?: number | null;
  displayId: string;
  /** @format uuid */
  id: string;
}

export interface ESMDomainDtosUserUserSimple {
  /** @format date-time */
  createdAt: Date;
  email: string;
  fullName: string;
  /** @format uuid */
  id: string;
  invigilatorId?: string | null;
  isMale: boolean;
}

export interface ESMDomainDtosUserUserSummary {
  /** @format date-time */
  createdAt: Date;
  department: ESMDomainDtosDepartmentDepartmentSummary;
  email?: string | null;
  faculty: ESMDomainDtosFacultyFacultySummary;
  fullName: string;
  /** @format uuid */
  id: string;
  invigilatorId?: string | null;
  isMale: boolean;
  phoneNumber?: string | null;
  role: string;
  userName: string;
}

export interface ESMDomainEntitiesCandidate {
  candidateShift: ESMDomainEntitiesCandidateShift[];
  /** @maxLength 20 */
  displayId: string;
  examinationModules: ESMDomainEntitiesCandidateExaminationModule[];
  /** @format uuid */
  id: string;
  isStudent: boolean;
  /** @maxLength 100 */
  name: string;
  /** @format date-time */
  updatedAt: Date;
}

export interface ESMDomainEntitiesCandidateExaminationModule {
  candidate: ESMDomainEntitiesCandidate;
  /** @format uuid */
  candidateId: string;
  /** @format date-time */
  createAt: Date;
  /** @format date-time */
  deletedAt?: Date | null;
  examination: ESMDomainEntitiesExamination;
  /** @format uuid */
  examinationId: string;
  /** @format uuid */
  id: string;
  module: ESMDomainEntitiesModule;
  /** @format uuid */
  moduleId: string;
}

export interface ESMDomainEntitiesCandidateShift {
  candidate: ESMDomainEntitiesCandidate;
  /** @format uuid */
  candidateId: string;
  /** @format uuid */
  id: string;
  /** @format int32 */
  orderIndex: number;
  shift: ESMDomainEntitiesShift;
  /** @format uuid */
  shiftId: string;
}

export type ESMDomainEntitiesDepartment = ESMDomainCommonBaseAuditableEntity & {
  departmentShiftGroups: ESMDomainEntitiesDepartmentShiftGroup[];
  /** @maxLength 20 */
  displayId?: string | null;
  faculty: ESMDomainEntitiesFaculty;
  /** @format uuid */
  facultyId?: string | null;
  /** @maxLength 100 */
  name: string;
  teachers: ESMDomainEntitiesTeacher[];
};

export interface ESMDomainEntitiesDepartmentShiftGroup {
  department: ESMDomainEntitiesDepartment;
  /** @format uuid */
  departmentId?: string | null;
  facultyShiftGroup: ESMDomainEntitiesFacultyShiftGroup;
  /** @format uuid */
  facultyShiftGroupId: string;
  /** @format uuid */
  id: string;
  /** @maxLength 100 */
  temporaryInvigilatorName?: string | null;
  user: ESMDomainIdentityApplicationUser;
  /** @format uuid */
  userId?: string | null;
}

export type ESMDomainEntitiesExamination =
  ESMDomainCommonBaseAuditableEntity & {
    candidatesOfModule: ESMDomainEntitiesCandidateExaminationModule[];
    /** @format date-time */
    createdAt: Date;
    /** @maxLength 200 */
    description?: string | null;
    /** @maxLength 20 */
    displayId?: string | null;
    events: ESMDomainEntitiesExaminationEvent[];
    /** @format date-time */
    expectEndAt?: Date | null;
    /** @format date-time */
    expectStartAt?: Date | null;
    /** @maxLength 100 */
    name: string;
    shiftGroups: ESMDomainEntitiesShiftGroup[];
    /**
     *
     *
     * 0 = None
     *
     * 1 = Idle
     *
     * 2 = Setup
     *
     * 4 = AssignFaculty
     *
     * 8 = AssignInvigilator
     *
     * 16 = Closed
     */
    status: ESMDomainEnumsExaminationStatus;
    /** @format date-time */
    updatedAt?: Date | null;
  };

export interface ESMDomainEntitiesExaminationData {
  /** @format int32 */
  candidatesCount?: number | null;
  /** @format int32 */
  credit?: number | null;
  /** @format date-time */
  date?: Date | null;
  /** @maxLength 100 */
  department?: string | null;
  departmentAssign?: boolean | null;
  /** @format date-time */
  endAt?: Date | null;
  errors: Record<
    string,
    | ESMDomainEntitiesExaminationDataError
    | ESMDomainEntitiesExaminationDataErrorT
    | null
  >;
  examination: ESMDomainEntitiesExamination;
  /** @format uuid */
  examinationId: string;
  /** @maxLength 100 */
  faculty?: string | null;
  /** @format uuid */
  id: string;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method: ESMDomainEnumsExamMethod;
  /** @maxLength 200 */
  moduleClass?: string | null;
  /** @maxLength 20 */
  moduleId?: string | null;
  /** @maxLength 100 */
  moduleName?: string | null;
  /** @maxLength 50 */
  rooms?: string | null;
  /** @format int32 */
  roomsCount?: number | null;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt?: Date | null;
  suggestions: Record<
    string,
    SystemCollectionsGenericKeyValuePairSystemStringSystemString[] | null
  >;
}

export interface ESMDomainEntitiesExaminationDataError {
  message: string;
}

export type ESMDomainEntitiesExaminationDataErrorT =
  ESMDomainEntitiesExaminationDataError & {
    data?: T[] | null;
  };

export interface ESMDomainEntitiesExaminationEvent {
  /** @format date-time */
  createAt: Date;
  examination: ESMDomainEntitiesExamination;
  /** @format uuid */
  examinationId: string;
  /** @format uuid */
  id: string;
  /**
   *
   *
   * 0 = None
   *
   * 1 = Idle
   *
   * 2 = Setup
   *
   * 4 = AssignFaculty
   *
   * 8 = AssignInvigilator
   *
   * 16 = Closed
   */
  status: ESMDomainEnumsExaminationStatus;
}

export type ESMDomainEntitiesFaculty = ESMDomainCommonBaseAuditableEntity & {
  departments: ESMDomainEntitiesDepartment[];
  /** @maxLength 20 */
  displayId?: string | null;
  facultyShiftGroups: ESMDomainEntitiesFacultyShiftGroup[];
  /** @maxLength 100 */
  name: string;
  teachers: ESMDomainEntitiesTeacher[];
};

export interface ESMDomainEntitiesFacultyShiftGroup {
  /** @format int32 */
  calculatedInvigilatorsCount: number;
  departmentShiftGroups: ESMDomainEntitiesDepartmentShiftGroup[];
  faculty: ESMDomainEntitiesFaculty;
  /** @format uuid */
  facultyId: string;
  /** @format uuid */
  id: string;
  /** @format int32 */
  invigilatorsCount: number;
  shiftGroup: ESMDomainEntitiesShiftGroup;
  /** @format uuid */
  shiftGroupId: string;
}

export interface ESMDomainEntitiesInvigilatorShift {
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  deletedAt?: Date | null;
  /** @format uuid */
  id: string;
  invigilator: ESMDomainIdentityApplicationUser;
  /** @format uuid */
  invigilatorId?: string | null;
  /** @format int32 */
  orderIndex: number;
  /** @format int32 */
  paid: number;
  shift: ESMDomainEntitiesShift;
  /** @format uuid */
  shiftId: string;
}

export interface ESMDomainEntitiesModule {
  candidatesOfExamination: ESMDomainEntitiesCandidateExaminationModule[];
  /** @format int32 */
  credits: number;
  department: ESMDomainEntitiesDepartment;
  /** @format uuid */
  departmentId?: string | null;
  /** @maxLength 20 */
  displayId: string;
  /** @format int32 */
  durationInMinutes: number;
  faculty: ESMDomainEntitiesFaculty;
  /** @format uuid */
  facultyId: string;
  /** @format uuid */
  id: string;
  /** @maxLength 100 */
  name: string;
}

export interface ESMDomainEntitiesRoom {
  /** @format int32 */
  capacity?: number | null;
  /** @maxLength 20 */
  displayId: string;
  /** @format uuid */
  id: string;
  shift: ESMDomainEntitiesShift[];
}

export interface ESMDomainEntitiesShift {
  candidateShift: ESMDomainEntitiesCandidateShift[];
  /** @format int32 */
  candidatesCount: number;
  /** @format int32 */
  examsCount: number;
  handedOverUser: ESMDomainIdentityApplicationUser;
  /** @format uuid */
  handedOverUserId?: string | null;
  /** @format uuid */
  id: string;
  invigilatorShift: ESMDomainEntitiesInvigilatorShift[];
  /** @format int32 */
  invigilatorsCount: number;
  /** @maxLength 10000 */
  report?: string | null;
  room: ESMDomainEntitiesRoom;
  /** @format uuid */
  roomId?: string | null;
  shiftGroup: ESMDomainEntitiesShiftGroup;
  /** @format uuid */
  shiftGroupId: string;
}

export interface ESMDomainEntitiesShiftGroup {
  departmentAssign: boolean;
  examination: ESMDomainEntitiesExamination;
  /** @format uuid */
  examinationId: string;
  facultyShiftGroups: ESMDomainEntitiesFacultyShiftGroup[];
  /** @format uuid */
  id: string;
  /** @format int32 */
  invigilatorsCount: number;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method: ESMDomainEnumsExamMethod;
  module: ESMDomainEntitiesModule;
  /** @format uuid */
  moduleId: string;
  /** @format int32 */
  roomsCount: number;
  /** @format int32 */
  shift?: number | null;
  shifts: ESMDomainEntitiesShift[];
  /** @format date-time */
  startAt: Date;
}

export type ESMDomainEntitiesTeacher = ESMDomainCommonBaseAuditableEntity & {
  department: ESMDomainEntitiesDepartment;
  /** @format uuid */
  departmentId?: string | null;
  examinations: ESMDomainEntitiesExamination[];
  faculty: ESMDomainEntitiesFaculty;
  /** @format uuid */
  facultyId?: string | null;
  /** @maxLength 100 */
  fullName: string;
  handedOverShifts: ESMDomainEntitiesShift[];
  invigilatorShifts: ESMDomainEntitiesInvigilatorShift[];
  isMale: boolean;
  /** @maxLength 20 */
  teacherId?: string | null;
  user: ESMDomainIdentityApplicationUser;
  /** @format uuid */
  userId: string;
};

/**
 *
 *
 * 0 = Select
 *
 * 1 = Write
 *
 * 2 = Practice
 *
 * 3 = Oral
 *
 * 4 = Report1
 *
 * 5 = Report2
 * @format int32
 */
export enum ESMDomainEnumsExamMethod {
  Select = 0,
  Write = 1,
  Practice = 2,
  Oral = 3,
  Report1 = 4,
  Report2 = 5,
}

/**
 *
 *
 * 0 = None
 *
 * 1 = Idle
 *
 * 2 = Setup
 *
 * 4 = AssignFaculty
 *
 * 8 = AssignInvigilator
 *
 * 16 = Closed
 * @format int32
 */
export enum ESMDomainEnumsExaminationStatus {
  None = 0,
  Idle = 1,
  Setup = 2,
  AssignFaculty = 4,
  AssignInvigilator = 8,
  Closed = 16,
}

export interface ESMDomainIdentityApplicationUser {
  /** @format int32 */
  accessFailedCount: number;
  concurrencyStamp?: string | null;
  email?: string | null;
  emailConfirmed: boolean;
  /** @format uuid */
  id: string;
  lockoutEnabled: boolean;
  /** @format date-time */
  lockoutEnd?: Date | null;
  normalizedEmail?: string | null;
  normalizedUserName?: string | null;
  passwordHash?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed: boolean;
  securityStamp?: string | null;
  teacher: ESMDomainEntitiesTeacher;
  twoFactorEnabled: boolean;
  userName?: string | null;
}

export type GetAllFacultyData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationFacultiesQueriesGetAllGetAllDto;

export type GetAllGroupsData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDto;

export type GetAllShiftsData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto;

export type GetAvailableInvigilatorsInShiftGroupData =
  ESMApplicationCommonModelsResultESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsDto;

export type GetEventsData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainEntitiesExaminationEvent;

export type GetGroupsByFacultyIdData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDto;

export type GetHandoverDataData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDto;

export type GetMySummaryInfoData =
  ESMApplicationCommonModelsResultESMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto;

export type GetRelatedData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetRelatedExaminationsRelatedExaminationDto;

export interface GetRelatedQuery {
  IsActive?: boolean;
}

export type GetShiftsData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto;

export type GetStatisticData =
  ESMApplicationCommonModelsResultESMApplicationExaminationsQueriesGetStatisticGetStatisticDto;

export type GetSummaryData =
  ESMApplicationCommonModelsResultESMDomainDtosExaminationExaminationSummary;

export type GetTeachersData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableESMApplicationTeachersQueriesGetGetDto;

export interface GetTeachersQuery {
  /** @format uuid */
  FacultyId?: string;
  IsFaculty?: boolean;
  IsInvigilator?: boolean;
}

export type GetTemporaryDataData =
  ESMApplicationCommonModelsResultESMApplicationCommonModelsPaginatedListESMDomainEntitiesExaminationData;

export interface GetTemporaryDataQuery {
  examinationId: string;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
}

export type GetUserData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainDtosUserUserSummary;

export type ImportDepartmentData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export interface ImportDepartmentPayload {
  Files?: File[];
}

export type ImportExaminationData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type ImportExaminationModuleData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export interface ImportExaminationPayload {
  /** @format binary */
  File: File;
}

export type ImportRoomData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export interface ImportRoomPayload {
  /** @format binary */
  File: File;
}

export type LoginData =
  ESMApplicationCommonModelsResultESMDomainDtosGeneratedToken;

export type ResetPasswordData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export interface ResetPasswordQuery {
  userId?: string;
}

export type SearchData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableESMDomainDtosUserUserSummary;

export interface SearchQuery {
  FullName?: string;
}

export interface SystemCollectionsGenericKeyValuePairSystemStringSystemString {
  key: string;
  value: string;
}

/**
 *
 *
 * 100 = Continue
 *
 * 101 = SwitchingProtocols
 *
 * 102 = Processing
 *
 * 103 = EarlyHints
 *
 * 200 = OK
 *
 * 201 = Created
 *
 * 202 = Accepted
 *
 * 203 = NonAuthoritativeInformation
 *
 * 204 = NoContent
 *
 * 205 = ResetContent
 *
 * 206 = PartialContent
 *
 * 207 = MultiStatus
 *
 * 208 = AlreadyReported
 *
 * 226 = IMUsed
 *
 * 300 = Ambiguous
 *
 * 301 = Moved
 *
 * 302 = Redirect
 *
 * 303 = RedirectMethod
 *
 * 304 = NotModified
 *
 * 305 = UseProxy
 *
 * 306 = Unused
 *
 * 307 = RedirectKeepVerb
 *
 * 308 = PermanentRedirect
 *
 * 400 = BadRequest
 *
 * 401 = Unauthorized
 *
 * 402 = PaymentRequired
 *
 * 403 = Forbidden
 *
 * 404 = NotFound
 *
 * 405 = MethodNotAllowed
 *
 * 406 = NotAcceptable
 *
 * 407 = ProxyAuthenticationRequired
 *
 * 408 = RequestTimeout
 *
 * 409 = Conflict
 *
 * 410 = Gone
 *
 * 411 = LengthRequired
 *
 * 412 = PreconditionFailed
 *
 * 413 = RequestEntityTooLarge
 *
 * 414 = RequestUriTooLong
 *
 * 415 = UnsupportedMediaType
 *
 * 416 = RequestedRangeNotSatisfiable
 *
 * 417 = ExpectationFailed
 *
 * 421 = MisdirectedRequest
 *
 * 422 = UnprocessableEntity
 *
 * 423 = Locked
 *
 * 424 = FailedDependency
 *
 * 426 = UpgradeRequired
 *
 * 428 = PreconditionRequired
 *
 * 429 = TooManyRequests
 *
 * 431 = RequestHeaderFieldsTooLarge
 *
 * 451 = UnavailableForLegalReasons
 *
 * 500 = InternalServerError
 *
 * 501 = NotImplemented
 *
 * 502 = BadGateway
 *
 * 503 = ServiceUnavailable
 *
 * 504 = GatewayTimeout
 *
 * 505 = HttpVersionNotSupported
 *
 * 506 = VariantAlsoNegotiates
 *
 * 507 = InsufficientStorage
 *
 * 508 = LoopDetected
 *
 * 510 = NotExtended
 *
 * 511 = NetworkAuthenticationRequired
 * @format int32
 */
export enum SystemNetHttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,
  Ambiguous = 300,
  Moved = 301,
  Redirect = 302,
  RedirectMethod = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  RedirectKeepVerb = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestUriTooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}

export type T = object;

export type UpdateDepartmentData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateExaminationData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateExamsCountData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateExamsCountPayload = Record<string, number>;

export type UpdateFacultyData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateInfoData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateShiftData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateShiftExaminationData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateShiftExaminationPayload = any;

export type UpdateTeacherAssignmentData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateTeacherAssignmentPayload = Record<
  string,
  ESMApplicationExaminationsCommandsUpdateTeacherAssignmentUpdateTeacherAssignmentDto
>;

export type UpdateTemporaryNameToTeacherData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData =
  | ESMApplicationCommonModelsResultSystemBoolean
  | ESMApplicationCommonModelsResult;

export type UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupPayload = any;
