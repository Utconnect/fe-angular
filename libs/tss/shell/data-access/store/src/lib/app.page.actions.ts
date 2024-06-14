import { createAction, props } from '@ngrx/store';
import { SidebarEvent } from '@tss/types';

export class TssPageAction {
  static readonly reset = createAction('[TSS/Page] Reset');
  static readonly keepLogin = createAction('[TSS/Page] Keep Login');
  static readonly getUserInfo = createAction('[TSS/Page] Get user info');
  static readonly logout = createAction('[TSS/Page] Logout');
  static readonly loadRooms = createAction('[TSS/Page] Load rooms');
  static readonly loadSchoolYear = createAction('[TSS/Page] Load school year');
  static readonly loadAcademicYear = createAction(
    '[TSS/Page] Load academic year',
  );
  static readonly setLoader = createAction(
    '[TSS/Page] Set loader',
    props<{ showLoader: boolean }>(),
  );
  static readonly setConnectToGoogle = createAction(
    '[TSS/Page] Set connect to google',
    props<{ connect: boolean }>(),
  );
  static readonly sidebarEmit = createAction(
    '[TSS/Page] Sidebar emit',
    props<{ event: SidebarEvent }>(),
  );
}
