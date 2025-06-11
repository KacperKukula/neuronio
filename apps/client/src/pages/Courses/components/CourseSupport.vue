<template>
    <div class="flex gap-2">
        <Button size="small" variant="outlined" label="Show" icon="pi pi-arrow-right" severity="contrast" @click="viewAction" />
        <Button size="small" variant="outlined" label="Edit" icon="pi pi-pencil" severity="info" @click="editAction" />
        <Button size="small" variant="outlined" label="Participants" icon="pi pi-user" severity="help" />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
    courseId: string;
}>();

const viewAction = () => router.push(`/courses/view/${props.courseId}`);
const editAction = () => router.push(`/courses/edit/${props.courseId}`);
</script>

<style scoped>
</style>