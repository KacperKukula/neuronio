import { useUserStore } from "@/stores/userStore/UserStore";
import { sessionManager } from "@/modules/session/SessionManager";
import { SingletonModule } from "../abstract/SingletonModule";
import { AuthService } from "@/services/AuthService";
import type { LoginDto } from "shared";
import { userService } from "@/services/userService";
import type { User } from "@/stores/userStore/model/User";

export class AuthModule extends SingletonModule {

    constructor() { super() }

    userStore = useUserStore();

    signOut() {
        this.userStore.clearUserData()
        sessionManager.clearTokens()
    }

    async login(loginDto: LoginDto): Promise<User> {

        const { user, access_token, refresh_token } = await AuthService.login(loginDto)

        sessionManager.setAccessToken(access_token)
        sessionManager.setRefreshToken(refresh_token)

        userService.getCurrentUser()

        return user;
    };
}