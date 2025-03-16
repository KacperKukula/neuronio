<template>
    <div class="createCourse">
        <h1>Create Course</h1>
        
        <Form v-slot="$form" :initialValues="{}" @submit="onFormSubmit" class="createCourse__form">
            <div class="flex flex-col gap-1">
                <InputText type="text" placeholder="Name" fluid />
                <Editor v-model="value" editorStyle="height: 320px" />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
            </div>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { courseApi } from '@/api/courseApi';
import { CreateCourseDto } from 'shared';

export default defineComponent({
    setup() {
        
        const onFormSubmit = async (values: CreateCourseDto) => {
            try {
                await courseApi.createCourse(values);
            } catch (error) {
                console.error(error);
            }
        }

        return {
            onFormSubmit
        }
    }
})
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