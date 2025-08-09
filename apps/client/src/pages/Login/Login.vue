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

                    <Button type="submit" :loading="inProgress" severity="secondary" label="Submit" />
                </Form>

                <div class="flex flex-col gap-2 w-full">
                    <Message v-if="serverErr?.message" severity="error" size="small" variant="simple">{{ serverErr.message }}</Message>
                </div>

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
import SimpleInput from '@/components/Simple/Input/SimpleInput.vue';
import { Utils } from "@/lib";
import CommonPathsConst from "@/router/CommonPathsConst";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: 'Login',
    components: {
        RouterLink, SimpleTile, SimpleInput, SimpleButton
    },
    setup() {
        const { t } = useI18n();
        const router = useRouter();
        const userStore = useUserStore();

        const loginForm = ref(new LoginDto())
        const serverErr = ref<Error>()
        const inProgress = ref<boolean>(false)

        const loginUser = async () => {
            processing() // Setting the req is in progress
            serverErr.value = undefined;

            const loginDto = plainToInstance(LoginDto, loginForm.value);
            const valErrors = await validate(loginDto);
            if(valErrors.length)
                return console.error('Credentials not valid');

            const { error, data } = await Utils.catchNetworkError( userStore.login(loginDto) )

            data && router.push(CommonPathsConst.COURSES);

            if(!error) return; 

            if (error.response?.status === 401) {
                serverErr.value = new Error(t('errors.invalidCredentials'))
                return done()
            };

            serverErr.value = new Error(t('errors.noResponse'))
            done()
        };

        const processing = () => inProgress.value = true
        const done = () => inProgress.value = false

        return {
            // User
            loginForm,

            // Actions
            loginUser,

            serverErr,
            inProgress
        }
    }
})
</script>

<style lang="scss" scoped>
section.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100svh - $footerHeight);
}

.login {
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