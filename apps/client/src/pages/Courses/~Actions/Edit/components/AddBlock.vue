<template>
    <div :class="'addModule'" class="py-2 px-8">

        <div class="flex justify-between pb-8">
            <h2 class="text-2xl font-semibold">Add a module</h2>
        </div>

        <div class="grid grid-cols-2 gap-6">
            <!--COLUMN 1 - SEARCH AND SUGGESTED -->
            <div>
                <IconField class="mb-4">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="Search" class="w-full" />
                </IconField>

                <!--SUGESTIONS-->
                <h3>Sugestions:</h3>
            </div>
            <!--COLUMN 2 - BLOCKS TO ADD -->
            <div>
                <ul :class="'blockList'" class="rounded-sm">
                    <!--BLOCKS SEARCH RESULT-->
                    <template v-for="block in blocksArray">
                        <li class="px-4 py-3" @click="addBlockAction(block.type)">
                            {{ block.dict ? $t(block.dict) : block.label }}
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { blocksArray } from '@/common/BlockMaps';
import type { ModuleType } from '@/common/enums/courses/ModuleTypes';

const emit = defineEmits<{
  (e: 'add', moduleType: ModuleType): void
}>()

const isActive = ref<boolean>(false)

const activate = () => isActive.value = true

const addBlockAction = (moduleType: ModuleType) => emit('add', moduleType)
</script>

<style scoped lang="scss">
.modulesTile {
    width: 200px;

    &__img {
        overflow: hidden;
        
        &:hover {
            > img { transform: scale(1.4); }
        }
    }
}

.blockList {
    height: 12rem;
    background-color: $darker;
    border: 1px solid $primaryDark;

    > li {
        border-bottom: 1px solid $primaryGrey;
    }

    > li:hover {
        cursor: pointer;
        filter: brightness(0.8);
    }
}
</style>