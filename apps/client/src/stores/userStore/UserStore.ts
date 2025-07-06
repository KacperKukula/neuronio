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
import { UploadManager } from '@/modules/upload/uploadMngr'

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
            this.clearUserData()
        },
        clearUserData() {
            this.user = null;
            sessionManager.clearTokens();
        },
    },
    getters: {
        /**
         * Main endpoint to check if the user is logged in or not.
         * @returns 
         */
        isLoggedIn(): boolean { return !!this.user },
        /**
         * Gets user url photo
         * @returns 
         */
        getUserAvatar(): string|null {
            return this.user?.photoUrl ? UploadManager.pathToUrl(this.user.photoUrl + `?t=${Date.now()}`) : null;
        }
    },
})