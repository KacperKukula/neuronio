<template>
    <div class="profile">

        <div class="profile__background"></div>

        <router-link to="/login"class="profile__login">Login</router-link>

        <!-- <template v-if="!isLoggedIn">
            <button @click="loginUser">Login</button>
        </template>

        <template v-else>
            <button @click="logoutUser">Logout</button>
        </template> -->

        <UserCircleIcon class="cursor-pointer"
            :class="{ 'unlogged': userStore.isLoggedIn }"
            @click="flagMenuShow = !flagMenuShow"
            aria-haspopup="true" aria-controls="overlay_menu" />
        
        <template v-if="userStore.isLoggedIn">
            <Menu v-if="flagMenuShow" class="profile__menu" ref="menu" :model="menuItems"></Menu>
        </template>
        <template v-else>
            <Menu v-if="flagMenuShow" class="profile__menu" ref="menu" :model="menuItems2"></Menu>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { firebaseAuth } from '@/modules/firebase/firebaseAuth';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/userStore/UserStore';
import { ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';

const router = useRouter()
const userStore = useUserStore()

const menuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user', command: () => { router.push('/profile') } },
    { label: 'Settings', icon: 'pi pi-cog', command: () => { router.push('/settings') } },
]
const menuItems2: MenuItem[] = [
    { label: 'Login', icon: 'pi pi-user', command: () => { router.push('/login') } },
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
        background-color: $primaryDark;
    }

    > svg {
        position: relative;
        z-index: 2;
        width: 2em;
        height: 2em;
    }

    &.unlogged > svg {
        fill: red !important;
    }

    ::v-deep
    &__menu {
        position: absolute;
        right: 0;
        top: calc(100% + .4rem);
    }
}

</style>