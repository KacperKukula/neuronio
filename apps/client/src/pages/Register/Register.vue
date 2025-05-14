<template>
    <section id="register" class="register">
        <div class="register--background">
            <img src="/imgs/green-abstract.jpg"/>
        </div>

        <SimpleTile class="register__form">
            <h1>Register</h1>

            <Form v-slot="$form" :validateOnBlur="true" @submit="register" class="flex flex-col gap-4 w-60">
                <FormField v-slot="$field" name="username">
                    <InputText v-model="registerForm.name" name="username" type="text" placeholder="Username" fluid />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
                </FormField>
                <FormField v-slot="$field" name="email">
                    <InputText v-model="registerForm.email" name="email" type="text" placeholder="Email" fluid />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
                </FormField>
                <FormField v-slot="$field" name="passwd1">
                    <InputText v-model="registerForm.firstPsswdTry" name="passwd1" type="text" placeholder="First password" fluid />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error.message }}</Message>
                </FormField>
                <FormField v-slot="$field" name="passwd2">
                    <InputText v-model="registerForm.secondPsswdTry" name="passwd2" type="text" placeholder="Second password" fluid />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $form.lastName.error.message }}</Message>
                </FormField>
                <Button type="submit" severity="secondary" label="Submit" />
            </Form>
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
import { RegisterForm } from "./model/RegisterForm";

import { Form } from '@primevue/forms';
import { FormField } from '@primevue/forms';
import InputText from "primevue/inputtext";
import Message from "primevue/message";

import SimpleButton from "@/components/SimpleButton/SimpleButton.vue";
import SimpleTile from '@/components/SimpleTile/SimpleTile.vue';
import SimpleInput from '@/components/SimpleInput/SimpleInput.vue';
import { RegisterDto } from "shared";
import { validate } from "class-validator";
import { AuthService } from "@/services/AuthService";

export default defineComponent({
    name: 'Login',
    components: {
        SimpleTile, SimpleInput, SimpleButton, InputText, FormField, Message
    },
    setup() {
        const userStore = useUserStore();
        const router = useRouter();

        const registerForm = ref(new RegisterForm())
        
        const register = async () => {

            //TODO: 
            const { firstPsswdTry, secondPsswdTry, ...cleanedForm } = registerForm.value;

            const registerDto = plainToInstance(RegisterDto, cleanedForm);
            registerDto.password = firstPsswdTry;
            const errors = await validate(registerDto);

            if(errors.length)
                return console.error('Credentials not valid');

            try {
                // const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email.value, password.value);
                // const user = plainToInstance(UserDto, userCredential.user, { excludeExtraneousValues: true });
                
                const resp = await AuthService.register(registerDto)
                console.log(resp)

                // if(!errors.length) router.push('/login');

                router.push('/login');
                
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };

        return {
            register,
            registerForm
        }
    }
})
</script>

<style lang="scss" scoped>

.register {
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
        padding: 3rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    input {
        padding: 0.5em;
    }
}
</style>