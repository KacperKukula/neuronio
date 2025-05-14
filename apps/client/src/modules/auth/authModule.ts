import { useUserStore } from "@/stores/userStore/UserStore";
import { sessionManager } from "@/modules/session/SessionManager";
import { SingletonModule } from "../abstract/SingletonModule";
import { AuthService } from "@/services/AuthService";
import type { LoginDto } from "shared";
import { userService } from "@/services/userService";

export class AuthModule extends SingletonModule {

    constructor() { super() }

    userStore = useUserStore();

    signOut() {
        this.userStore.clearUser()
        sessionManager.clearAccessToken()    
    }

    async login(loginDto: LoginDto) {

        const { user, access_token } = await AuthService.login(loginDto)
        sessionManager.setAccessToken(access_token)
        this.userStore.login(user)

        userService.getCurrentUser()
    };
}