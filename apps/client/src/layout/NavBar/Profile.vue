<template>
    <div class="profile">

        <div class="profile__background"></div>

        <template v-if="!userStore.isLoggedIn">
            <router-link to="/login" class="profile__login" @click="loginUser">Login</router-link>
        </template>

        <template v-else>
            <Menu class="profile__menu" ref="menu" :model="menuItems" :data-show="flagMenuShow"></Menu>
        </template>


        <div class="eventInterceptor" @click="flagMenuShow = !flagMenuShow"></div>

        <div class="profile__userPhoto">
            <skeleton-photo :srcPromise="userService.getUserPhoto()">
                <template #no-photo>
                    <UserCircleIcon class="cursor-pointer stroke-1"
                        :class="{ 'unlogged': userStore.isLoggedIn }"
                        aria-haspopup="true" aria-controls="overlay_menu" />
                </template>

            </skeleton-photo>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { firebaseAuth } from '@/modules/firebase/firebaseAuth';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/userStore/UserStore';
import { ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';

import SkeletonPhoto from '@/components/SkeletonLoaded/SkeletonPhoto.vue';
import { userService } from '@/services/userService';

const router = useRouter()
const userStore = useUserStore()

const menuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user', command: () => { router.push('/profile') } },
    { label: 'Settings', icon: 'pi pi-cog', command: () => { router.push('/settings') } },
    { label: 'Logout', icon: 'pi pi-cog', command: () => { userStore.logout()} },
]
const flagMenuShow = ref(false);

const loginUser = async () => {
    router.push('/login')
};

const logoutUser = async () => {
    await firebaseAuth.signOut();
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.profile {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    cursor: pointer;

    .eventInterceptor {
        position: absolute;
        inset: 0;
        z-index: 20;
    }

    &__login {
        box-sizing: border-box;
        z-index: -1;
        height: fit-content;
        position: absolute;
        margin: auto 0;
        inset: 0;
        right: auto;

        font-size: 1.1rem;
        text-decoration: none;
        color: white;
        font-weight: 500;

        transform: translateX(-100%);
    }

    &__background {
        z-index: 0;
        position: absolute;
        inset: 0;
    }

    &__userPhoto {
        width: 2.5rem;
        padding: .2rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 1px solid $primaryGreen;

        .photo { border-radius: 50%; }
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