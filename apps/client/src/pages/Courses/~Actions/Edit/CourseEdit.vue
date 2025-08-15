 <template>
    <section class="nav-top-padding w-full flex justify-center">
        <div v-if="!course">
            <p>Loading course...</p>
        </div>
        <div v-else class="courseEdit">

            <div :class="'courseEdit__support'" class="mb-4 flex">
                <FileUpload ref="fileupload" :auto="true" chooseLabel="Wybierz tło" mode="basic" accept="image/*" :maxFileSize="1000000" @select="onUpload" />

                <router-link :to="{ name: 'course-definitions', params: { id: courseId } }" v-ripple class="ml-2">
                    <Button icon="pi pi-database" label="Knowladge base" severity="info" class="ml-2" />
                </router-link>
            </div>

            <div :class="'courseEdit__hero'" class="relative flex flex-col justify-end px-5 py-6 overflow-hidden">

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
                <div :data-order="block.order"
                    v-for="(block, inx) in courseBlocks" :key="inx"
                    :class="'blockView'" class="min-h-20" >
                    
                    <div :class="`teleport-space-${block.order}`"></div>
                    <div v-if="activeOrder !== block.order" class="addBar">
                        <div class="addBar__icon" @click="addOnOrder(block.order)">
                            <i class="pi pi-plus" style="color: white; font-size: .75rem"></i>
                        </div>
                    </div>
                    <div class="blockArea">
                        <div :class="'blockArea--mark'" class="h-full"></div>

                        <!--BLOCKS - SUPPORT-->
                        <div class="blockArea--support">
                            <Button icon="pi pi-pencil" rounded variant="outlined" severity="info" aria-label="User" @click="editAction()" />
                            <Button icon="pi pi-trash" rounded variant="outlined" severity="danger" aria-label="User" @click="() => deleteBlockId = block.id" />
                        </div>
                        <BlockRenderer :block="block" />
                    </div>
                </div>
            </div>

            <!--ADDING ON THE END - PLACEHOLDER-->
            <div class="addingOnEnd">
                <div :class="'teleport-space-end'"></div>

                <div v-if="!isAddingOnEnd" :class="'addPlaceholder'" class="cursor-pointer rounded-lg" @click="addOnEnd()">
                    <i class="pi pi-plus"></i>
                </div>
            </div>

            <!--ADDING BLOCK-->
            <teleport v-if="addModuleTarget" :to="addModuleTarget">
                <div :class="'addingTile'" class="relative py-6">
                    <Button icon="pi pi-times" severity="contrast" small rounded variant="outlined"
                        class="!absolute right-3 top-3" @click="clearAdding()" />

                    <template v-if="newModule">
                        <EditModule :module="newModule" @submit="saveNewBlock" />
                    </template>

                    <template v-else>
                        <AddBlock @add="createNewModule" />
                    </template>
                </div>
            </teleport>
        </div>
    </section>

    <course-edit-dialogs 
        :blockToDeleteId="deleteBlockId"
        @block-delete-proceed="deleteAction(deleteBlockId as number)"
        @block-delete-back="deleteBlockId = undefined" />

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { courseService } from '@/services/courseService';
import { Utils } from '@/utils';
import { nextTick, onMounted, ref } from 'vue';
import { Module } from '@/common/models/Module';
import { ModuleType } from '@/common/enums/courses/ModuleTypes';
import { Course } from '@/common/models/Course';

import CourseEditDialogs from './CourseEditDialogs.vue';
import EditModule from '../../~Blocks/EditModule.vue';
import { blockService } from '@/services/blockService';
import { UploadManager } from '@/modules/upload/uploadMngr';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar.vue';
import type { Block } from '@/common/models/Block';
import BlockRenderer from '../../~Blocks/BlockRenderer.vue';
import AddBlock from './components/AddBlock.vue';

const router = useRouter()
const route = useRoute()
const courseId = route.params.id

/* COURSE DATA */
const course = ref<null|Course>()
/* BLOCK COURSE DATA */
const courseBlocks = ref<null|Block[]>()

const addModuleTarget = ref<null|string>()

const activeOrder = ref<null|number>()
const isAddingOnEnd = ref<null|boolean>(false)

const newModule = ref<null|Module>(null);
const courseBckg = ref<null|string>();

/* Id of willing to delete block */
const deleteBlockId = ref<number>()

const createNewModule = (type: ModuleType) => {
    if(!type) {
        console.warn('🎯 There is no type in createNewModule')
        return null;
    }

    newModule.value = new Module(type)
}

const saveNewBlock = async (blockCompleted: Module) => {

    const targetOrder = isAddingOnEnd.value ? (courseBlocks.value?.length + 1) : activeOrder.value;

    if (!isAddingOnEnd.value && courseBlocks.value) {
        // Zwiększ order o 1 dla bloków >= targetOrder
        for (const block of courseBlocks.value) {
            if (block.order >= targetOrder) {
                block.order += 1;
                await blockService.updateBlockOrder(block);
            }
        }
    }

    // Dodaj nowy blok z odpowiednim orderem
    blockCompleted.order = targetOrder;

    blockCompleted.course = courseId;
    await blockService.addBlock(blockCompleted);

    // Odśwież listę bloków
    await reloadBlocks();

    // Resetuj stan
    newModule.value = null;
    activeOrder.value = null;
    isAddingOnEnd.value = false;
    addModuleTarget.value = null;
}

const reloadBlocks = async () => {
    courseBlocks.value = await courseService.getCourseBlocks(courseId);
    courseBlocks.value?.sort((a, b) => a.order - b.order);
};

const onUpload = async (e: { files: File[] }) => {
    const files = e.files;

    if (files && files.length > 0) {
        courseBckg.value = await UploadManager.uploadCourseBackground(files[0], courseId);
    }
}

const addOnOrder = (order: number) => {
    clearAdding();
    activeOrder.value = order;

    addModuleTarget.value = `.teleport-space-${order}`
}

const addOnEnd = () => {
    clearAdding();
    isAddingOnEnd.value = true;

    addModuleTarget.value = `.teleport-space-end`
}

const clearAdding = () => {
    isAddingOnEnd.value = false;
    activeOrder.value = null;
    addModuleTarget.value = null;
    newModule.value = null;
}

const editAction = () => {
    
}

const deleteAction = async (blockId: number) => {
    await blockService.deleteBlock(blockId)
    deleteBlockId.value = undefined;
    reloadBlocks()
}

onMounted(async () => {
    course.value = await courseService.getCourse(courseId);

    // Get modules
    reloadBlocks()

    // Check if background image is set and if true just set it
    if(course.value?.background) courseBckg.value = UploadManager.pathToUrl(course.value.background);

    await nextTick()
})
</script>

<style lang="scss" scoped>
@use './scss/addingTile' as *;
@use './scss/blockArea' as *;
@use './scss/addBar' as *;

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

.addPlaceholder {
    min-height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed white;
    opacity: 0.45;
    transition: all .3s ease;

    &:hover {
        opacity: .8;
    }
}
</style>