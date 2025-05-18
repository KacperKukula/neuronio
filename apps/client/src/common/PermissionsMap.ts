import { EnumUserRole } from "./enums/EnumUserRolels";

const ADMIN = EnumUserRole.ADMIN;
const TEACHER = EnumUserRole.TEACHER;
const STUDENT = EnumUserRole.STUDENT;

export enum Feature {
    MANAGE_COURSE = 'manage_course',
}

export const PermissionsMap = {
    [Feature.MANAGE_COURSE]: [ADMIN, TEACHER],
};