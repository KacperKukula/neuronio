<template>
    <section id="login" class="login">
        <SimpleTile>
            <div class="login__form">
                <h1>Login</h1>

                <simple-input type="text" v-model="email" placeholder="Email" />
                <simple-input type="password" v-model="password" placeholder="Password" />
    
                <!-- <button @click="loginUser">Login</button> -->

                <simple-input type="submit" @click="loginUser" value="Login" />

                <!--TODO: -->
                <!--<simple-button>Hello world</simple-button>-->
            </div>
        </SimpleTile>
    </section>
</template>

<script lang="ts">
import "reflect-metadata";
import { defineComponent, ref } from 'vue';
import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import { firebaseAuth } from '@/modules/firebase/firebaseAuth';
import { useRouter } from 'vue-router';
import { UserDto } from '@/stores/userStore/dtos/UserDto';
import { plainToInstance } from 'class-transformer';
import { useUserStore } from '@/stores/userStore/UserStore';

import SimpleButton from "@/components/SimpleButton/SimpleButton.vue";
import SimpleTile from '@/components/SimpleTile/SimpleTile.vue';
import SimpleInput from '@/components/SimpleInput/SimpleInput.vue';

export default defineComponent({
    name: 'Login',
    components: {
        SimpleTile, SimpleInput, SimpleButton
    },
    setup() {
        const userStore = useUserStore();
        const router = useRouter();
                
        const email = ref<string>('');
        const password = ref<string>('');
        const errorMessage = ref<string | null>(null);

        const loginUser = async () => {

            try {
                const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email.value, password.value);
                const user = plainToInstance(UserDto, userCredential.user, { excludeExtraneousValues: true });
                
                userStore.login(user);

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