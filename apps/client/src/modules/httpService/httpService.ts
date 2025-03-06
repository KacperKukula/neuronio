import { StaticModule } from "../abstract/StaticModule";
import { useUserStore } from "@/stores/userStore/UserStore";
import type { User } from "@/stores/userStore/model/User";
import ky from "ky";

export class HttpService extends StaticModule {

    static authorizedReq(): typeof ky {
        const userStore = useUserStore();

        const token: string | undefined = userStore.getUser?.accessToken;

        if (!token) {
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