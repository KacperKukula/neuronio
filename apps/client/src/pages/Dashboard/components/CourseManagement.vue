<template>
    <div class="courseManagement">
        <Button label="Edit" icon="pi pi-pencil" aria-label="Edit" severity="secondary" raised @click="editAction" />
        <Button label="View" icon="pi pi-eye" aria-label="Edit" severity="info" raised @click="editAction" />
        <Button label="Participants" icon="pi pi-user" severity="help" />
        <Button icon="pi pi-trash" aria-label="Delete" severity="danger" />
    </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '@/stores/course/store';

const courseStore = useCourseStore();

const editAction = () => courseStore.editAction();
</script>

<style lang="scss">
.courseManagement {
    display: flex;
    gap: .8rem;
    border-radius: 8px;
}
</style>