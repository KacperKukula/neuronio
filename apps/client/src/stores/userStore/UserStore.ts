import { defineStore } from 'pinia'
import { User } from './model/User'
import type { UserDto } from './dtos/UserDto'
import { plainToInstance } from 'class-transformer'

const USERSTORE_NAME = 'userStore'

export const useUserStore = defineStore(USERSTORE_NAME, {
    state: () => ({
        user: null,
    }),
    actions: {
        login(user: UserDto) {
            this.clearUser();
            this.user = plainToInstance(User, user);

            console.log(this.user)
        },
        clearUser() {
            this.user = null;
        },
    },
    getters: {
        isLoggedIn(): boolean {
            return !!this.user
        },
        getUser(): User | null {
            return this.user
        }
    },
})