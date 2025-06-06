import { EnumUserRole } from "./enums/EnumUserRolels";

const ADMIN = EnumUserRole.ADMIN;
const TEACHER = EnumUserRole.TEACHER;
const STUDENT = EnumUserRole.STUDENT;

export enum Feature {
    CREATE_COURSE = 'create_course',
    MANAGE_COURSE = 'manage_course',
}

export const PermissionsMap = {
    [Feature.CREATE_COURSE]: [ADMIN, TEACHER],
    [Feature.MANAGE_COURSE]: [ADMIN, TEACHER],
};