import { defineStore } from 'pinia'
import { User } from './model/User'
import type { UserDto } from './dtos/UserDto'
import { plainToInstance } from 'class-transformer'
import { sessionManager } from '@/modules/session/SessionManager'
import { userService } from '@/services/userService'

const USERSTORE_NAME = 'userStore'

export const useUserStore = defineStore(USERSTORE_NAME, {
    state: () => ({
        user: null as User | null,
        isLoading: false as boolean
    }),
    actions: {
        async loadUser() {
            this.isLoading = true;
            try {
                this.user = await userService.getCurrentUser();
            }
            catch(err) { this.user = null; }
            finally { this.isLoading = false; }
        },
        login(newUser: UserDto) {
            this.user = newUser;

            // console.log('🍍', this.user, this.access_token)
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