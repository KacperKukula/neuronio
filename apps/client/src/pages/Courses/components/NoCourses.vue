<template>
    <section class="w-full flex flex-col items-center">
        <h2 class="mb-5">No courses available.</h2>

        <!-- <template class="createCourse">
        </template> -->
        <span class="mb-6">Do you want to create one?</span>
        <Button label="Add course" icon="pi pi-plus" @click="createCourseAction"></Button>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const createCourseAction = () => router.push('/create-course');
</script>

<style scoped>
</style>