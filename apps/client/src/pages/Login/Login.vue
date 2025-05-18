<template>
    <section id="login" class="login">
        <div class="login--background">
            <img src="/imgs/green-abstract.jpg"/>
        </div>

        <SimpleTile>
            <div class="login__form">
                <h1>Login</h1>

                <Form v-slot="$form" :validateOnBlur="true" @submit="loginUser" class="flex flex-col gap-4 w-60">
                    <FormField v-slot="$field" name="username">
                        <InputText v-model="loginForm.name" name="username" type="text" placeholder="Username" fluid />
                    </FormField>

                    <FormField v-slot="$field" name="password">
                        <Password v-model="loginForm.password" :feedback="false" placeholder="Password" class="w-full" inputClass="w-full"/>
                    </FormField>

                    <Button type="submit" severity="secondary" label="Submit" />
                </Form>

                <Message v-if="serverErr" severity="error" size="small" variant="simple">{{ serverErr.message }}</Message>

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

import { LoginDto } from "shared";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import SimpleButton from "@/components/SimpleButton/SimpleButton.vue";
import SimpleTile from '@/components/SimpleTile/SimpleTile.vue';
import SimpleInput from '@/components/SimpleInput/SimpleInput.vue';
import { Utils } from "@/lib";
import { AuthModule } from "@/modules/auth/authModule";

export default defineComponent({
    name: 'Login',
    components: {
        RouterLink, SimpleTile, SimpleInput, SimpleButton
    },
    setup() {
        const userStore = useUserStore();
        const router = useRouter();

        const loginForm = ref(new LoginDto())
        const serverErr = ref<Error>()

        const loginUser = async () => {
            const loginDto = plainToInstance(LoginDto, loginForm.value);
            const valErrors = await validate(loginDto);
            if(valErrors.length)
                return console.error('Credentials not valid');

            // try {
            //     await login();
            //     router.push('/dashboard');
            // } catch (e) { console.error(e); }

            const [error, data] = await Utils.catchError( AuthModule.getInstance().login(loginDto) )

            serverErr.value = error;

            router.push('/dashboard');
        };

        return {
            // User
            loginForm,

            // Actions
            loginUser,

            serverErr
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

    &--background {
        z-index: -1;
        position: absolute;
        inset: 0;
        filter: brightness(.8);

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

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