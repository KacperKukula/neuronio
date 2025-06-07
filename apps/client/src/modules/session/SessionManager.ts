import { userService } from "@/services/userService";
import { firebaseAuth } from "../firebase/firebaseAuth";

const TOKEN_NAME = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

class SessionManager {

    private access_token: string | undefined;
    private refresh_token: string | undefined;

    getAccessToken(): string | null {
        return this.access_token ?? sessionStorage.getItem(TOKEN_NAME);
    }

    getRefreshToken(): string | null {
        return this.refresh_token ?? sessionStorage.getItem(REFRESH_TOKEN);
    }

    setRefreshToken(token: string): void {
        this.refresh_token = token;
        sessionStorage.setItem(REFRESH_TOKEN, token);
    }

    setAccessToken(token: string): void {
        this.access_token = token;
        sessionStorage.setItem(TOKEN_NAME, token);
    }

    clearTokens(): void {
        this.access_token = undefined;
        sessionStorage.removeItem(TOKEN_NAME);

        this.refresh_token = undefined;
        sessionStorage.removeItem(REFRESH_TOKEN)
    }
}

export const sessionManager = new SessionManager();