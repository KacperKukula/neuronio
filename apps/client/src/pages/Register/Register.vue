<template>
    <section id="register" class="register">
        <div class="register--background">
            <img src="/imgs/green-abstract.jpg"/>
        </div>

        <SimpleTile class="register__form">
            <h1>Register</h1>

            <Form @submit="register" class="flex flex-col gap-4 w-full">
                <FormField name="username">
                    <label for="username" class="mb-3">Username</label>
                    <InputText v-model="username" name="username" type="text" placeholder="Username" fluid />
                    <Message v-if="errors.username" severity="error" size="small" variant="simple">{{ errors.username }}</Message>
                </FormField>
                <FormField name="email">
                    <label for="email" class="mb-3">Email</label>
                    <InputText v-model="email" name="email" type="text" placeholder="Email" fluid />
                    <Message v-if="errors.email" severity="error" size="small" variant="simple">{{ errors.email }}</Message>
                </FormField>
                <FormField name="Password">
                    <label for="Password" class="mb-3">Password</label>
                    <InputText v-model="password" name="Password" type="password" placeholder="Password" fluid />
                    <Message v-if="errors.password" severity="error" size="small" variant="simple">{{ errors.password }}</Message>
                </FormField>
                <FormField name="ConfirmPassword">
                    <label for="ConfirmPassword" class="mb-3">Confirm password</label>
                    <InputText v-model="confirmPassword" name="ConfirmPassword" type="password" placeholder="Password" fluid />
                    <Message v-if="errors.confirmPassword" severity="error" size="small" variant="simple">{{ errors.confirmPassword }}</Message>
                </FormField>
                <Button type="submit" severity="secondary" label="Submit" />
            </Form>

        </SimpleTile>
    </section>
</template>

<script lang="ts" setup>
import "reflect-metadata";
import { RegisterDto } from "shared";
import { validate, ValidationError } from "class-validator";
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { plainToInstance } from 'class-transformer';
import * as z from 'zod';

import { RegisterForm } from "./model/RegisterForm";
import { AuthService } from "@/services/AuthService";
import { Form, FormField } from '@primevue/forms';

import SimpleTile from '@/components/SimpleTile/SimpleTile.vue';
import SimpleInput from "@/components/Simple/Input/SimpleInput.vue";

import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();

const serverErrors = ref<ValidationError[]>([]);

const validationSchema = toTypedSchema(
    z.object({
        username: z.string().min(1, { message: 'This is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        secondPassword: z.string().min(6, { message: 'Password must be at least 6 characters' })
    })
);

const { errors } = useForm({
  validationSchema,
});

const { value: username } = useField<string>('username');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: confirmPassword } = useField<string>('confirmPassword');

const register = async () => {

    const registerDto = new RegisterForm({
        name: username.value,
        email: email.value,
        password: password.value,
    }); 

    const errors = await validate(registerDto);

    if(errors.length)
        errors.forEach(error => serverErrors.value.push(error) );

    if(errors.length)
        console.log(registerDto, serverErrors.value)

    try {                
        const { errors }: { errors: ValidationError[] } = await AuthService.register(registerDto);

        if (!errors || errors.length === 0) {
            router.push('/login');
        } else {
            serverErrors.value = errors;
        }
        
    } catch (error) {
        console.error('Error logging in:', error);
    }
};
</script>

<style lang="scss" scoped>

.register {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100svh - $navBarHeight - $footerHeight);

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
        width: min(100%, 24rem);
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