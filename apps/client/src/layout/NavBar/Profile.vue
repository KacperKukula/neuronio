<template>
    <div class="profile">

        <template v-if="!isLoggedIn">
            <button @click="loginUser">Login</button>
        </template>

        <template v-else>
            <button @click="logoutUser">Logout</button>
        </template>

        <UserCircleIcon />
    </div>
</template>

<script setup lang="ts">
import { firebaseAuth } from '@/modules/firebase/firebaseAuth';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

const router = useRouter()

const isLoggedIn: boolean = !!firebaseAuth.currentUser;

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
    max-height: 100%;
    display: flex;

    > svg {
        width: 2em;
        height: 2em;
    }
}
</style>