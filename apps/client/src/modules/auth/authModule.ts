import { useUserStore } from "@/stores/userStore/UserStore";
import { sessionManager } from "@/modules/session/SessionManager";
import { SingletonModule } from "../abstract/SingletonModule";
import { authService } from "@/services/authService";
import type { LoginDto } from "shared";
import { userService } from "@/services/userService";

class AuthModule extends SingletonModule {

    constructor() { super() }

    userStore = useUserStore()

    signOut() {
        this.userStore.clearUser()
        sessionManager.clearAccessToken()    
    }

    login(loginDto: LoginDto) {

        try {
            const { user, access_token } = await authService.login(loginDto)
            sessionManager.setAccessToken(access_token)
            this.userStore.login(user)

            userService.getCurrentUser()

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
}

export const authModule = new AuthModule();