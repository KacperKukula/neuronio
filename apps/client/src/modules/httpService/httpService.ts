import { StaticModule } from "../abstract/StaticModule";
import { useUserStore } from "@/stores/userStore/UserStore";
import type { User } from "@/stores/userStore/model/User";
import ky from "ky";
import { sessionManager } from "../session/SessionManager";

export class HttpService extends StaticModule {

    authorizedReq(throwErr: boolean = true): typeof ky {
        const token: string | null = sessionManager.getAccessToken();

        console.log('😊', token)

        if (!token && throwErr) {
            throw new Error('User not logged in');
        }
 
        return ky.create({
            prefixUrl: 'http://localhost:3000',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}