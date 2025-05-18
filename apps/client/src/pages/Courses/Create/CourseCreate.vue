<template>
    <div class="createCourse my-6">
        <h1>Create Course</h1>
        
        <Form v-slot="$form" :initialValues="{}" @submit="onFormSubmit" class="createCourse__form">
            <div class="flex flex-col gap-4 mb-4">
                <h4>Nazwa</h4>
                <InputText v-model="name" type="text" placeholder="Name" fluid />

                <h4>Opis</h4>
                <Editor v-model="description" editorStyle="height: 320px" />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
            </div>

            <Participants v-model="participants" />

            <Button type="submit">Create course!</Button>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCreateCourseForm } from './useCreateCourseForm';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Participants from './components/Participants.vue';

const name = ref<string>('')
const description = ref<string>('')
const participants = ref([]);

const router = useRouter();
const { sendForm, createCourseForm } = useCreateCourseForm();

const onFormSubmit = async () => {
    const createCourseDto = createCourseForm(name.value, description.value, participants.value)
    const [error, data] = await sendForm(createCourseDto);

    console.log(error, data)

    if( error )
        console.error(error)
    else
        router.push('/dashboard')
}
</script>

<style scoped lang="scss">
.createCourse {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__form {
        width: 80%;
    }
}
</style>