import { PermissionConstant } from '@tss/constants';
import { Role } from '@tss/types';

export class PermissionHelper {
  static isTeacher(permissions: number[]): boolean {
    return permissions.includes(
      PermissionConstant.REQUEST_CHANGE_TEACHING_SCHEDULE,
    );
  }

  static isDepartmentHead(permissions: number[]): boolean {
    return permissions.includes(
      PermissionConstant.SEE_DEPARTMENT_TEACHING_SCHEDULE,
    );
  }

  static isRoomManager(permissions: number[]): boolean {
    return permissions.includes(PermissionConstant.MANAGE_ROOM);
  }

  static getRole(permissions: number[]): Role {
    if (PermissionHelper.isRoomManager(permissions)) {
      return 'roomManager';
    }
    if (PermissionHelper.isDepartmentHead(permissions)) {
      return 'departmentHead';
    }
    return 'teacher';
  }
}
