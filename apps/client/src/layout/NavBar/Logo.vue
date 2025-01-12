<template>
    <div class="logo">
        <BeakerIcon />

        BrainLab
    </div>
</template>

<script setup lang="ts">
import { BeakerIcon } from '@heroicons/vue/24/outline';

</script>

<style lang="scss" scoped>
.logo {
    box-sizing: border-box;
    padding: 6px;
    color: white;
    display: flex;
    gap: 4px;

    > svg {
        height: 1.6rem;
    }
}
</style>