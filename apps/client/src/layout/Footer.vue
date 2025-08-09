<template>
    <footer class="flex justify-betwen gap-2 items-center w-full">
        @ 2025 neuron.io by Kacper Kukuła
    </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Logo from '@/components/Logo/Logo.vue';
</script>

<style scoped lang="scss">
footer {
    background-color: $luxuryDark;
    height: $footerHeight;
    padding: 0 .4rem;
    color: #bcbcbc;
    font-size: .9rem;

    hr {
        height: 0;
        width: 10rem;
        border: 1px solid $darkLighter;
        margin: none;
    }
}
</style>