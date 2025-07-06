import { mapRoleKeyToVal, type EnumUserRole } from "@/common/enums/EnumUserRolels";
import { useUserStore } from "@/stores/userStore/UserStore";

export class PriviligesManager {
    static hasPrivsForMin(minPriv: EnumUserRole) {
        const userStore = useUserStore()

        return mapRoleKeyToVal[userStore.user?.role] <= minPriv
    }
}