<template>
    <Section :type="SectionTypes.CONSTRAINED" class="w-full flex justify-center">
        <div v-if="!course">
            <p>Loading course...</p>
        </div>
        <div v-else :class="'courseView'" >

            <div :class="'courseView__hero'" class="relative flex flex-col justify-end px-5 py-6 overflow-hidden">

                <div :class="'courseEdit__hero--background'" :style="{ backgroundImage: `url(${courseBckg})` }" class="absolute bg-cover inset-0 brightness-75 z-1"></div>

                <div :class="'courseEdit__hero__content'"
                    class="relative flex flex-col gap-3 z-4">

                    <h1>{{ course.name }}</h1>
                    <p v-html="Utils.sanitize(course.description)"></p>
                </div>
            </div>

            <!--OWNER-->
            <div :class="'courseEdit__owner'" class="flex items-center py-4 gap-2">
                <ProfileAvatar />

                <p>Owner: {{ course.owner?.name }}</p>
            </div>

            <!--BLOCKS-->
            <div v-if="courseBlocks" :class="'courseEdit__modules'" class="flex flex-col gap-3 py-4">
                <div :class="'blockView'" :data-order="block.order" v-for="(block, inx) in courseBlocks" :key="inx">
                    <BlockRenderer :block="block" />
                </div>
            </div>
        </div>
    </Section>
</template>

<script lang="ts" setup>
import type { Course } from '@/common/models/Course';
import { UploadManager } from '@/modules/upload/uploadMngr';
import { courseService } from '@/services/courseService';
import { Utils } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Block } from '@/common/models/Block';

import BlockRenderer from '../../~Blocks/BlockRenderer.vue';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar.vue';
import { userService } from '@/services/userService';

import Section from '@/components/Section/Section.vue';
import { SectionTypes } from '@/components/Section/enums/SectionTypes';

const route = useRoute()
const courseId = route.params.id
/* COURSE DATA */
const course = ref<null|Course>()
/* BLOCK COURSE DATA */
const courseBlocks = ref<null|Block[]>()

const courseBckg = ref<null|string>();
const ownerAvatar = ref<null|string>()

onMounted(async () => {
    course.value = await courseService.getCourse(courseId);
    courseBlocks.value = await courseService.getCourseBlocks(courseId);

    if(course.value?.background) courseBckg.value = UploadManager.pathToUrl(course.value.background);

    ownerAvatar.value = userService.getUserProfile()
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
        background-color: $luxuryDark;
        background-size: cover;
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