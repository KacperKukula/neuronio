<template>
    <div v-if="!isActive" :class="'placeholder'" class="cursor-pointer rounded-lg" @click="activate">
        <i class="pi pi-plus"></i>
    </div>
    <div v-else :class="'addModule'" class="p-8">
        <Carousel :value="modulesArray" :numVisible="6" :numScroll="6">
            <template #item="slotProps">
                <div :class="'modulesTile'" class="cursor-pointer" @click="addModuleAction(slotProps.data.type)">
                    <div :class="'modulesTile__img'" class="w-full aspect-square">
                        <img :src="slotProps.data.image" alt="module miniature"
                            class="h-full w-full transition-transform duration-150 ease-in"/>
                    </div>
    
                    <h4>{{ slotProps.data.label }}</h4>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { modulesArray } from '@/common/ModulesMap';
import type { ModuleType } from '@/common/enums/courses/ModuleTypes';

const emit = defineEmits<{
  (e: 'add', moduleType: ModuleType): void
}>()

const isActive = ref<boolean>(false)

const activate = () => isActive.value = true

const addModuleAction = (moduleType: ModuleType) => emit('add', moduleType)
</script>

<style scoped lang="scss">

.placeholder {
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

.modulesTile {
    width: 200px;

    &__img {
        overflow: hidden;
        
        &:hover {
            > img { transform: scale(1.4); }
        }
    }
}
</style>