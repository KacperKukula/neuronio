import { StaticModule } from "../abstract/StaticModule";
import { useUserStore } from "@/stores/userStore/UserStore";
import type { User } from "@/stores/userStore/model/User";
import ky from "ky";
import { sessionManager } from "../session/SessionManager";

export class HttpService extends StaticModule {

    authorizedReq(throwErr: boolean = true): typeof ky {
        const token: string | null = sessionManager.getAccessToken();

        if (!token) throw new Error('No token found');
 
        return ky.create({
            prefixUrl: 'http://localhost:3000',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            throwHttpErrors: throwErr,
        });
    }
}