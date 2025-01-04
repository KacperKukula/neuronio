<template>
    <section id="login">
        <SimpleTile>
            <h1>Login</h1>
            <input type="text" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">

            <button @click="loginUser">Login</button>
        </SimpleTile>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SimpleTile from '@/components/SimpleTile/SimpleTile.vue';
import { service as firebaseService } from '@/modules/firebase/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default defineComponent({
    name: 'Login',
    components: {
        SimpleTile
    },
    setup() {
        const auth = getAuth(firebaseService);

        const email = ref<string>('');
        const password = ref<string>('');
        const errorMessage = ref<string | null>(null);

        const loginUser = async () => {

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
                const user = userCredential.user;
                console.log('User logged in:', user);
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };

        return {
            email,
            password,
            loginUser,
        }
    }
})
</script>

<style lang="scss" scoped>
#login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100svh;

    input {
        padding: 0.5em;
    }
}
</style>