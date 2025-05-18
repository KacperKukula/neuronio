<template>
    <div class="dashboard">
        <!-- <Button label="Warn" severity="warn" rounded /> -->
        
        <CoursesList
            class="dashboard__list"
            :courses="courses"
            :selectedCourse="courseStore.getSelectedCourse"
            @update:selectedCourse="selectCourse" />

        <CourseDisplay
            class="dashboard__display"
            :course="courseStore.getSelectedCourse" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/userStore/UserStore';
import { courseService } from '@/services/courseService';
import { useCourseStore } from '@/stores/course/store';

import CoursesList from './components/CoursesList.vue';
import CourseDisplay from './components/CourseDisplay.vue';

const courses = ref<object[]|null>(null);

const router = useRouter()
const userStore = useUserStore();
const courseStore = useCourseStore();

const selectCourse = (course: object) => courseStore.setSelectedCourse(course);

onMounted(async () => {
    if( !userStore.isLoggedIn ) router.push('/login');
    
    courses.value = await courseStore.retriveCourses();
})
</script>

<style lang="scss">
.dashboard {
    margin-top: 5rem;

    height: 100svh;
    display: flex;
    gap: 1.6rem;
    width: 100%;

    &__list {
        width: 330px;
    }

    &__display {
        width: 100%;
        flex-grow: 1;
    }
}
</style>