import { firebaseAuth } from "../firebase/firebaseAuth";

class SessionManager {

    isLoggedIn(): boolean {
        return !!firebaseAuth.currentUser;
    }
}

export const sessionManager = new SessionManager();