<template>
    <section :class="type">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
import type { SectionTypes } from './enums/SectionTypes';

defineProps<{
    type: SectionTypes,
}>()
</script>

<style scoped lang="scss">
section {
    padding: 1.8rem 0 2.6rem;
}

.full-width {
    width: 100%;
}

.constrained {
    width: min(100%, 1100px);
}

.fat-constrained {
    width: min(100%, 1400px);
}
</style>