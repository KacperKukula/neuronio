<template>
    <section id="login" class="login">
        <SimpleTile>
            <div class="login__form">
                <h1>Login</h1>

                <simple-input type="text" v-model="loginForm.name" placeholder="Username" />
                <simple-input type="password" v-model="loginForm.password" placeholder="Password" />
    
                <!-- <button @click="loginUser">Login</button> -->

                <simple-input type="submit" @click="loginUser" value="Login" />

                <!--TODO: -->
                <!--<simple-button>Hello world</simple-button>-->

                <router-link to="/register">Register now</router-link>
            </div>
        </SimpleTile>
    </section>
</template>

<script lang="ts">
import "reflect-metadata";
import { defineComponent, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore/UserStore';

import { authService } from "@/services/authService";
import { LoginDto } from "shared";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { sessionManager } from "@/modules/session/SessionManager";
import { userService } from "@/services/userService";

import SimpleButton from "@/components/SimpleButton/SimpleButton.vue";
import SimpleTile from '@/components/SimpleTile/SimpleTile.vue';
import SimpleInput from '@/components/SimpleInput/SimpleInput.vue';

export default defineComponent({
    name: 'Login',
    components: {
        RouterLink, SimpleTile, SimpleInput, SimpleButton
    },
    setup() {
        const userStore = useUserStore();
        const router = useRouter();

        const loginForm = ref(new LoginDto())

        const loginUser = async () => {
            const loginDto = plainToInstance(LoginDto, loginForm.value);
            const errors = await validate(loginDto);
            if(errors.length)
                return console.error('Credentials not valid');

            try {
                const { user, access_token } = await authService.login(loginDto)
                sessionManager.setAccessToken(access_token)
                userStore.login(user)

                userService.getCurrentUser()
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };

        return {
            // User
            loginForm,

            // Actions
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