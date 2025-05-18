<template>
    <div class="courseDisplay">
        <h2 v-if="!course">Select course</h2>

        <div v-else class="course">
            <div class="course__manage">
                <CourseManagement />
            </div>

            <div v-if="courseStore.mode === CourseMode.EDIT" class="course__edit">
                <Creator />
            </div>

            <div v-else class="course__display">
                <h2>{{ course.name }}</h2>
                <div v-html="safeDesc"></div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CourseManagement from './CourseManagement.vue';
import DOMPurify from 'dompurify';
import { useCourseStore } from '@/stores/course/store';

import { CourseMode } from '@/stores/course/mode';
import Creator from './creator/Creator.vue';

const courseStore = useCourseStore();

const props = defineProps({
    course: {
        type: Object,
        required: false,
    },
})

const safeDesc = computed(() => {
    return DOMPurify.sanitize(props.course?.description ?? '').replace(/&nbsp;/g, ' ');
});
</script>

<style lang="scss" scoped>
.course {
    max-width: 100%;

    & :deep(img),
    & :deep(table) {
        max-width: 100%;
        height: auto;
        display: block;
    }
}
</style>