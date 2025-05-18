<template>
    <div class="creator">
        <div v-if="!courseCopy" class="loading">Loading ...</div>

        <template v-else>
            <h2>{{ courseCopy.name }}</h2>
            <div v-html="safeDesc"></div>
        </template>

        <div v-if="editedModule" class="creator__edit py-4">
            <h4>Nazwa modułu</h4>
            <InputText type="text" v-model="editedModule.name" class="w-full"/>
            
            <Button label="Zapisz" @click="saveModule" />
        </div>
        
        <div class="creator__support flex">
            <Button icon="pi pi-plus" severity="success" rounded aria-label="Add" @click="createNewModule" />

            <Dropdown
                :options="courseModulesEntriesArr"
                v-model="suppModuleType"
                optionLabel="value.name"
                optionValue="key"
                placeholder="Wybierz moduł" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { courseModulesEntriesArr } from './model/CourseModuelsEntries';
import { Course } from '@/common/models/Course';
import { useCourseStore } from '@/stores/course/store';
import { instanceToInstance } from 'class-transformer';
import { computed, onMounted, ref } from 'vue';
import DOMPurify from 'dompurify';
import { ModuleType } from '@/common/enums/courses/ModuleTypes';
import { useCourseCreator } from './useCourseCreator';
import { Module } from '@/common/models/courses/Module';

const courseStore = useCourseStore();
const {
    createModule,
    sendModule
} = useCourseCreator();

/* Data */
const courseCopy = ref<Course|null>(null);
let courseId: number|null = null;

/* New module */
const suppModuleType = ref<ModuleType|null>(null)

/* Editing and new modules */
const editedModule = ref<Module|null>(null)

const safeDesc = computed(() => {
    return DOMPurify.sanitize(courseCopy.value?.description ?? '').replace(/&nbsp;/g, ' ');
});

const createNewModule = () => {
    if(!suppModuleType.value) return;
    editedModule.value = createModule(suppModuleType.value, new Course(courseId))
}

const saveModule = async () => {
    await sendModule(editedModule.value)
}

onMounted(() => {
    courseCopy.value = instanceToInstance<Course>(courseStore.selectedCourse);
    courseId = courseCopy.value.id
});
</script>

<style scoped lang="scss">
.creator {
    
    &__support {
        gap: .4rem;
        padding: .6rem 1.2rem;
    }
}
</style>