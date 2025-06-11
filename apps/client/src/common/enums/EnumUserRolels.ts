export enum EnumUserRole {
    ADMIN = 0,
    TEACHER = 1,
    STUDENT = 2,

    // Unlogged role
    GUEST = 3
}

export const mapRoleKeyToVal = {
    'admin': EnumUserRole.ADMIN,
    'teacher': EnumUserRole.TEACHER,
    'student': EnumUserRole.STUDENT,
    'guest': EnumUserRole.GUEST
}