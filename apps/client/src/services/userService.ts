import ky from "ky";
import { HttpService } from "@/modules/httpService/httpService";
import type { User } from "@/stores/userStore/model/User";
import type { UpdateUserProfileDto } from "shared";

class UserService extends HttpService {

    async getCurrentUser(): Promise<{ user: User }> {
        return await this.authorizedReq().post('users/getCurrentUser').json();
    }

    async searchForUsers(searchPhrase: string): Promise<string> {
        return await this.authorizedReq(false).post('users/searchForUsers', { json: { search: searchPhrase } }).json();
    }

    async getUserPhoto(): Promise<string> {
        return await this.authorizedReq(false).post('users/userPhoto').text();
    }

    async getUserProfile(): Promise<User> {
        return await this.authorizedReq(false).post(`users/profile`).json();
    }

    async updateUserProfile(userProfile: UpdateUserProfileDto): Promise<User> {
        return await this.authorizedReq(false).put(`users/profile`, { json: userProfile }).json();
    }

    /* USER AVATAR */

    async uploadAvatar(formData: FormData) {
        return await this.authorizedReq(false).post('users/avatar', { body: formData }).text();
    }
}

export const userService = new UserService();