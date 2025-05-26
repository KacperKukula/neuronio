import { defineStore } from 'pinia'
import { User } from './model/User'
import type { UserDto } from './dtos/UserDto'
import { plainToInstance } from 'class-transformer'
import { sessionManager } from '@/modules/session/SessionManager'
import { userService } from '@/services/userService'
import { Utils } from '@/utils'
import { useRouter } from 'vue-router'
import type { LoginDto } from 'shared'
import { AuthModule } from '@/modules/auth/authModule'

const USERSTORE_NAME = 'userStore'

export const useUserStore = defineStore(USERSTORE_NAME, {
    state: () => ({
        user: null as User | null,
        isLoading: false as boolean
    }),
    actions: {
        async loadUser() {
            const router = useRouter()

            this.isLoading = true;

            const [error, data] = await Utils.catchError( userService.getCurrentUser() )

            if(error || !data) {
                this.clearUserData()
                router.push('/login')
            }
            
            this.user = plainToInstance(User, data, { excludeExtraneousValues: true });
        },
        async login(loginDto: LoginDto): Promise<User> {
            const user = await AuthModule.getInstance().login(loginDto)

            this.user = user;

            return user;
        },
        logout() {
            const router = useRouter()

            this.clearUserData()
            router.push('/login')
        },
        clearUserData() {
            this.user = null;
            sessionManager.clearAccessToken();
        },
    },
    getters: {
        /**
         * Main endpoint to check if the user is logged in or not.
         * @returns 
         */
        isLoggedIn(): boolean { return !!this.user },

        /**
         * Returns the user object if logged in, otherwise null.
         * @returns User | null
         */
        getUser(): User | null {
            return this.user
        }
    },
})