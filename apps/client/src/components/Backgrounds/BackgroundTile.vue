<template>
    <div :class="'bckgTile'" class="relative flex items-center justify-center">
        <div :class="'bckgTile__label'" class="z-2">
            {{ bckg.name }}
        </div>

        <component :is="bckg.component" :intro="true" :class="'bckgTile__bckg'" class="absolute inset-0 z-1" />
    </div>
</template>

<script setup lang="ts">
import type { Background } from '@/common/models/Background';

const props = defineProps<{
    bckg: Background
}>()
</script>

<style lang="scss" scoped>
.bckgTile {
    overflow: hidden;
    cursor: pointer;
    width: 15rem;
    aspect-ratio: 5/4;
    border-radius: $borderMedium;
    border: 1.5px solid $lighterGrey;

    background-color: $primaryDark;

    &__label {
        opacity: 0;
        transition: opacity .3s ease-in;
    }

    &__bckg {
        transition: all .5s ease;
    }

    &:hover {
        .bckgTile__label { opacity: 1; }
        .bckgTile__bckg {
            filter: brightness(.7);
        }
    }
}
</style>