<template>
    <section id="login" class="login">
        <SimpleTile>
            <div class="login__form">
                <h1>Login</h1>

                <simple-input type="text" v-model="email" placeholder="Email" />
                <simple-input type="password" v-model="password" placeholder="Password" />
    
                <button @click="loginUser">Login</button>
            </div>
        </SimpleTile>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SimpleTile from '@/components/SimpleTile/SimpleTile.vue';
import SimpleInput from '@/components/SimpleInput/SimpleInput.vue';
import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import { firebaseAuth } from '@/modules/firebase/firebaseAuth';
import { useRouter } from 'vue-router';
import { UserDto } from '@/stores/userStore/dtos/UserDto';
import { plainToInstance } from 'class-transformer';

export default defineComponent({
    name: 'Login',
    components: {
        SimpleTile, SimpleInput
    },
    setup() {
        const router = useRouter();
                
        const email = ref<string>('');
        const password = ref<string>('');
        const errorMessage = ref<string | null>(null);

        const loginUser = async () => {

            try {
                const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email.value, password.value);

                const newUser = plainToInstance(UserDto, userCredential.user);

                
                
                router.push('/');

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

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100svh;

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    input {
        padding: 0.5em;
    }
}
</style>