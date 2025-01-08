import { defineStore } from 'pinia'

const USERSTORE_NAME = 'userStore'

export const useUserStore = defineStore(USERSTORE_NAME, {
    state: () => ({
        user: null as any,
    }),
    actions: {
        setUser(user: any) {
            this.user = user
        },
        logout() {
            this.user = null
        },
    },
    getters: {
        isLoggedIn(): boolean {
            return !!this.user
        },
    },
})