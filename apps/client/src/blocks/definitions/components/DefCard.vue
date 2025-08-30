<template>
    <div :class="'containerDefCard'" @click="showBack = !showBack">

        <div :class="{ defCard: true, showBack: showBack }" class="rounded-lg aspect-square">

            <div :class="'defCard__front'">{{ front }}</div>

            <div :class="'defCard__back'" v-html="Utils.sanitize(back)"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Utils } from '@/utils';
import { ref } from 'vue';

defineProps<{
    front: string,
    back: string;
}>();

const showBack = ref<boolean>(false)
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_coursesVars.scss' as *;

.containerDefCard {
    width: fit-content;
    perspective: 1800px;
}

.defCard {
    width: 20rem;
    // animation: spin 3s infinite linear;
    // transform: rotateY(20deg);
    transform-style: preserve-3d;
    position: relative;
    transition: all .25s ease-out;
    cursor: pointer;

    // background-color: $moduleActivityElement;

    &__back,
    &__front {
        height: 20rem;
        width: 20rem;
        position: absolute;
        backface-visibility: hidden;
        border-radius: 1.2rem;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    &__front {
        border: 3px solid $moduleQuestion;
        transform: translateZ(-20px);
    }

    &__back {
        bottom: 100%;
        border: 3px solid $moduleAnswer;
        transform: rotateY(180deg);
    }

    &.showBack {
        transform: rotateY(180deg);   
    }
}
</style>