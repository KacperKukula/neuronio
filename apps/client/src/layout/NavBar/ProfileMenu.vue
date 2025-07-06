<template>
    <div :class="'profile'" class="gap-3">

        <template v-if="!userStore.isLoggedIn">
            <router-link to="/login" class="profile__login" @click="loginUser">Login</router-link>
        </template>

        <template v-else>
            <Menu class="profile__menu" ref="menu" :model="menuItems" :data-show="flagMenuShow"></Menu>
        </template>

        <div class="profile__userPhoto" @click="flagMenuShow = !flagMenuShow">

            <!--@error="e => console.log('IMG ERROR', e, userStore.user?.photoUrl)"-->
            <img v-if="userStore.user?.photoUrl" :src="UploadManager.pathToUrl(userStore.user?.photoUrl)" 
                class="rounded-full" />

            <UserCircleIcon v-else class="cursor-pointer stroke-1"
                :class="{ 'unlogged': userStore.isLoggedIn }"
                aria-haspopup="true" aria-controls="overlay_menu" />

            <!-- <skeleton-photo :srcPromise="userService.getUserPhoto()" >
                <template #no-photo>
                    <UserCircleIcon class="cursor-pointer stroke-1"
                        :class="{ 'unlogged': userStore.isLoggedIn }"
                        aria-haspopup="true" aria-controls="overlay_menu" />
                </template>

            </skeleton-photo> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/userStore/UserStore';
import type { MenuItem } from 'primevue/menuitem';
import { UploadManager } from '@/modules/upload/uploadMngr';
import CommonPathsConst from '@/router/CommonPathsConst';

const router = useRouter()
const userStore = useUserStore()

const menuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user', command: () => { router.push('/profile') } },
    { label: 'Settings', icon: 'pi pi-cog', command: () => { router.push('/preferences') } },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => { 
            userStore.logout();
            router.push(CommonPathsConst.LOGIN)
        }
    },
]
const flagMenuShow = ref(false);

const loginUser = async () => {
    router.push('/login')
};
</script>

<style lang="scss" scoped>
.profile {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .eventInterceptor {
        position: absolute;
        inset: 0;
        z-index: 20;
    }

    &__userPhoto {
        width: 2.5rem;
        padding: .2rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 1px solid $primaryGreen;
    }

    > svg {
        position: relative;
        z-index: 2;
        width: 3rem;
        height: 3rem;
    }

    &.unlogged > svg {
        fill: red !important;
    }

    ::v-deep
    &__menu {
        position: absolute;
        right: 0;
        top: calc(100% + .4rem);

        &[data-show="true"] {
            display: block;
        }

        &[data-show="false"] {
            display: none;
        }
    }
}

</style>