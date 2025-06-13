<template>
    <section class="courses">
        <NoCourses v-if="courses.length === 0" />
        
        <template v-else>
            <h2 class="mb-6">Twoje kursy</h2>

            <DataView :value="courses">
                <template #list="slotProps">

                    <!--COURSE TILE-->
                    <div class="flex flex-col gap-4">
                        <div v-for="(item, index) in slotProps.items" :key="index" :class="'courseTile'">
                            
                            <div :class="'courseTile__img'" class="brightness-75">
                                <img :src="item.background ? UploadManager.pathToUrl(item.background) : DEFAULT_IMG_SOURCE" class="w-full h-full object-cover rounded-lg" />
                            </div>

                            <div :class="'courseTile__content'" class="p-5">
                                <h3>{{ item.name }}</h3>
                                <p class="text-surface-500 dark:text-surface-400">{{ Utils.sanitize(item.description) }}</p>
                                <CourseSupport :courseId="item.id"/>
                            </div>
                        </div>
                    </div>

                </template>
            </DataView>
        </template>
    </section>
</template>

<script setup lang="ts">
import { useCourseStore } from '@/stores/course/store';
import { useRouter } from 'vue-router';
import { Utils } from '@/utils';
import CourseSupport from './components/CourseSupport.vue';
import NoCourses from './components/NoCourses.vue';
import { UploadManager } from '@/modules/upload/uploadMngr';

const DEFAULT_IMG_SOURCE = '/imgs/no-image.png';

const courseStore = useCourseStore()
const router = useRouter();

const courses = await courseStore.retriveCourses();
</script>

<style lang="scss" scoped>
section.courses {
    width: min(100%, 1200px);
    margin: 0 auto;
}

.courseTile {

    display: grid;
    grid-template-columns: 2fr 6fr;
    height: 15rem;
    gap: 2.6rem;

    &__img {
        height: 100%;
        aspect-ratio: 16 / 12;
        background-color: rgb(22, 15, 15);
        border-radius: .8rem;
        overflow: hidden;
    }

    &__content {
        max-height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

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
}
</style>