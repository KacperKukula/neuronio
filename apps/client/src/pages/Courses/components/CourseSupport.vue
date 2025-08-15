<template>
    <div class="flex gap-2">
        <Button size="small" variant="outlined" label="Show" icon="pi pi-arrow-right" severity="contrast" @click="viewAction" />

        <template v-if="PriviligesManager.hasPrivsForMin(EnumUserRole.TEACHER)">
            <Button size="small" variant="outlined" label="Edit" icon="pi pi-pencil" severity="info" @click="editAction" />
            <Button size="small" variant="outlined" label="Participants" icon="pi pi-user" severity="help" @click="participantsAction" />
            <Button size="small" variant="outlined" label="Delete" icon="pi pi-trash" severity="danger" @click="() => deleteDialogVisible = true" />
        </template>
        
    </div>
    <!--DIALOGS-->
    <DeleteCourseDialog
        v-model:visible="deleteDialogVisible"
        :delete-fnc="deleteAction"
        :back-fnc="() => deleteDialogVisible = false" />
</template>

<script setup lang="ts">
import { EnumUserRole } from '@/common/enums/EnumUserRolels';
import { PriviligesManager } from '@/modules/priviliges/priviligesManager';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DeleteCourseDialog from '@/pages/Courses/Dialogs/DeleteCourseDialog.vue';
import { courseService } from '@/services/courseService';

const router = useRouter();

const deleteDialogVisible = ref(false);

const props = defineProps<{
    courseId: string;
}>();

const viewAction = () => router.push(`/courses/view/${props.courseId}`);
const editAction = () => router.push(`/courses/edit/${props.courseId}`);
const participantsAction = () => router.push(`/courses/participants/${props.courseId}`)
const deleteAction = () => {

    courseService.deleteCourse(props.courseId)

    router.go(0); //Refreshes the site
}
</script>

<style scoped>
</style>