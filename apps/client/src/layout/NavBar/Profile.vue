<template>
    <div class="profile">

        <template v-if="!isLoggedIn">
            <button @click="loginUser">Login</button>
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

console.log(isLoggedIn, firebaseAuth.currentUser);
const loginUser = async () => {
    router.push('/login')
};

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