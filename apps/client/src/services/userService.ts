import ky from "ky";
import { HttpService } from "@/modules/httpService/httpService";
import { LoginDto } from 'shared';
import type { User } from "@/stores/userStore/model/User";

class UserService extends HttpService {

    async getCurrentUser(): Promise<{ user: User }> {
        return this.authorizedReq(false).post('users/getCurrentUser').json();
    }
}

export const userService = new UserService();