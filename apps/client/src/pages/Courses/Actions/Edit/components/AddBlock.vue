<template>
    <div :class="'addModule'" class="py-12 px-4">

        <Carousel :value="blocksArray" :numVisible="6" :numScroll="6">
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
import { blocksArray } from '@/common/ModulesMap';
import type { ModuleType } from '@/common/enums/courses/ModuleTypes';

const emit = defineEmits<{
  (e: 'add', moduleType: ModuleType): void
}>()

const isActive = ref<boolean>(false)

const activate = () => isActive.value = true

const addModuleAction = (moduleType: ModuleType) => emit('add', moduleType)
</script>

<style scoped lang="scss">
.addModule {
    background-color: $darkLighter;
    border-radius: $borderLarge;
    border: 1px solid $primaryGrey;
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