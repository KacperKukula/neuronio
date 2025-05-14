<template>
    <div class="createCourse">
        <h1>Create Course</h1>
        
        <Form v-slot="$form" :initialValues="{}" @submit="onFormSubmit" class="createCourse__form">
            <div class="flex flex-col gap-4 mb-4">
                <h4>Nazwa</h4>
                <InputText v-model="formData.name" type="text" placeholder="Name" fluid />

                <h4>Opis</h4>
                <Editor v-model="formData.description" editorStyle="height: 320px" />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
            </div>

            <div class="flex flex-col gap-4 mb-4">
                <h4>Add participants</h4>

                <InputText type="text" v-model="searchPhrase" />
                <div class="border-1 border-solid border-white rounded-md px-4 py-3">
                    Type to search for participants
                </div>
            </div>

            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { courseApi } from '@/api/courseApi';
import { CreateCourseDto } from 'shared';
import { UsersApi } from '@/api/usersApi';

export default defineComponent({
    setup() {
        const formData = ref({});
        const searchPhrase = ref('');
        
        const onFormSubmit = async () => {
            try {
                formData.value.code = 'dupa';
                await courseApi.createCourse(formData.value);
            } catch (error) {
                console.error(error);
            }
        }

        watch(searchPhrase, async (newPhrase: string) => {
            try {
                const response = await UsersApi.searchForUsers(newPhrase);
                console.log(response);

                return response.data;
            } catch (error) {
                console.error(error);
            }
        })

        return {
            onFormSubmit,
            formData,

            searchPhrase,
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