<template>
    <div class="profile">

        <!-- <template v-if="!isLoggedIn">
            <button @click="loginUser">Login</button>
        </template>

        <template v-else>
            <button @click="logoutUser">Logout</button>
        </template> -->

        <UserCircleIcon class="cursor-pointer"
            @click="flagMenuShow = !flagMenuShow"
            aria-haspopup="true" aria-controls="overlay_menu" />
        
        <Menu v-if="flagMenuShow" class="profile__menu" ref="menu" :model="menuItems" />

    </div>
</template>

<script lang="ts" setup>
import { firebaseAuth } from '@/modules/firebase/firebaseAuth';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

import type { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';

const router = useRouter()

const isLoggedIn: boolean = !!firebaseAuth.currentUser;

/* Profile menu */
const menuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user', command: () => { router.push('/profile') } },
    { label: 'Settings', icon: 'pi pi-cog', command: () => { router.push('/settings') } },
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
        max-height: 100%;
        display: flex;

    > svg {
        width: 2em;
        height: 2em;
    }

    ::v-deep
    &__menu {
        position: absolute;
        right: 0;
        top: calc(100% + .4rem);
    }
}

</style>