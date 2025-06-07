<template>
    
</template>

<script setup lang="ts">
import { useCourseStore } from '@/stores/course/store';
import { onMounted } from 'vue';

const courseStore = useCourseStore()

onMounted(async () => {
    const courses = courseStore.retriveCourses();
})
</script>

<style scoped>
</style>