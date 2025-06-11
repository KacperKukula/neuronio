 <template>
    <section class="w-full flex justify-center">
        <div v-if="!course">
            <p>Loading course...</p>
        </div>
        <div v-else class="courseEdit">

            <div :class="'courseEdit__support'" class="mb-4 flex">
                <FileUpload ref="fileupload" :auto="true" chooseLabel="Wybierz tło" mode="basic" accept="image/*" :maxFileSize="1000000" @select="onUpload" />
            </div>

            <div :class="'courseEdit__hero'" class="relative flex flex-col justify-end px-5 py-6 overflow-hidden">

                <div :class="'courseEdit__hero--background'" :style="{ backgroundImage: `url(${courseBckg})` }" class="absolute bg-cover inset-0 brightness-75 z-1"></div>

                <div :class="'courseEdit__hero__content'"
                    class="relative flex flex-col gap-3 z-4">

                    <h1>{{ course.name }}</h1>
                    <p>{{ Utils.sanitize(course.description) }}</p>
                </div>
            </div>

            <div :class="'courseEdit__owner'" class="flex items-center py-4 gap-2">
                <ProfileAvatar />

                <p>Owner: {{ course.owner?.name }}</p>
            </div>

            <AddModule @add="createNewModule" />

            <template v-if="newModule">
                <EditModule :module="newModule" @submit="saveNewModule" />
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { courseService } from '@/services/courseService';
import { Utils } from '@/utils';
import { onMounted, ref } from 'vue';
import { Module } from '@/common/models/Module';
import { ModuleType } from '@/common/enums/courses/ModuleTypes';
import { Course } from '@/common/models/Course';

import AddModule from './components/AddModule.vue';
import EditModule from '../../Modules/EditModule.vue';
import { blockService } from '@/services/blockService';
import { UploadManager } from '@/modules/upload/uploadMngr';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar.vue';

const route = useRoute()
const courseId = route.params.id
const course = ref<null|Course>(null)

const newModule = ref<null|Module>(null);
const courseBckg = ref<null|string>()

const createNewModule = (type: ModuleType) => {
    if(!type) {
        console.warn('🎯 There is no type in createNewModule')
        return null;
    }

    newModule.value = new Module(type)
}

const saveNewModule = (blockCompleted: Module) => {
    blockCompleted.order = 1
    blockCompleted.course = courseId

    blockService.addBlock(blockCompleted)
}

const onUpload = async (e: { files: File[] }) => {
    const files = e.files;

    if (files && files.length > 0) {
        courseBckg.value = await UploadManager.uploadCourseBackground(files[0], courseId);
    }
}

onMounted(async () => {
    course.value = await courseService.getCourse(courseId);

    // Check if background image is set
    if(course.value?.background)
    courseBckg.value = UploadManager.pathToUrl(course.value.background);
})
</script>

<style lang="scss" scoped>
.courseEdit {
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