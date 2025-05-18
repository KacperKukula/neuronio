import type { CreateCourseDto } from "shared";
import { beApiClient } from "./abstract/beApiClient";
import ky from "ky";

export class UsersApi extends beApiClient {

    static async searchForUsers(searchPhrase: string): Promise<string> {
        return await ky.post(this.apiUrl + 'users/searchForUsers', { json: { search: searchPhrase } }).json();
    }
}