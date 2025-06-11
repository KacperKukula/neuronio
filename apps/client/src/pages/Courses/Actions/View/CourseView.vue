<template>
    <section class="w-full flex justify-center">
        <div v-if="!course">
            <p>Loading course...</p>
        </div>
        <div v-else :class="'courseView'" >

            <div :class="'courseView__hero'" class="flex flex-col justify-end px-5 py-6">

                <h1>{{ course.name }}</h1>
                <p>{{ Utils.sanitize(course.description) }}</p>
            </div>

            <p>Owner: {{ course.owner?.name }}</p>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Course } from '@/common/models/Course';
import { courseService } from '@/services/courseService';
import { Utils } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const courseId = route.params.id
const course = ref<null|Course>(null)

onMounted(async () => {
    course.value = await courseService.getCourse(courseId);
})
</script>

<style lang="scss" scoped>
.courseView {
    width: min(100%, 1600px);
    padding: 3rem 2rem;

    &__hero {
        height: min(30rem, 35svh);
        border-radius: 2rem;
        border: 1px solid white;
    }

    h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-color);
    }
    
    p {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>