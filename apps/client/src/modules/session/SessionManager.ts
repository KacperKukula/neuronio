import { userService } from "@/services/userService";
import { firebaseAuth } from "../firebase/firebaseAuth";

const TOKEN_NAME = 'access_token'

class SessionManager {

    private access_token: string | null;

    getAccessToken(): string | null {
        return this.access_token ?? sessionStorage.getItem(TOKEN_NAME);
    }

    setAccessToken(token: string): void {
        this.access_token = token;
        sessionStorage.setItem(TOKEN_NAME, token);
    }

    clearAccessToken(): void {
        this.access_token = null;
    }
}

export const sessionManager = new SessionManager();