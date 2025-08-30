<template>
    <section :class="type">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
import type { SectionTypes } from './enums/SectionTypes';

defineProps<{ type: SectionTypes }>()
</script>

<style scoped lang="scss">
.full-width {
    width: 100%;
}

.constrained {
    width: min(100%, 1100px);
}
</style>