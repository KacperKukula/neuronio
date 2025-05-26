import { StaticModule } from "../abstract/StaticModule";
import { useUserStore } from "@/stores/userStore/UserStore";
import type { User } from "@/stores/userStore/model/User";
import ky from "ky";
import { sessionManager } from "../session/SessionManager";

export class HttpService extends StaticModule {

    static readonly API_URL = import.meta.env.VITE_API_URL;
    
    authorizedReq(throwErr: boolean = true): typeof ky {
        const token: string | null = sessionManager.getAccessToken();

        if (!token) throw new Error('No token found');
 
        return ky.create({
            prefixUrl: HttpService.API_URL,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            throwHttpErrors: throwErr,
        });
    }
}