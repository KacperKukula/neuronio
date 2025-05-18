import type { EnumUserRole } from "@/common/enums/EnumUserRolels";
import { Expose } from "class-transformer";

export class User {
    @Expose()
    email?: string;

    @Expose()
    role?: EnumUserRole;
}