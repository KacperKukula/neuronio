<template>
    <component :is="bckgStore.backgroundComp" />
</template>

<script setup lang="ts">
import { useBackgroundStore } from '@/stores/background/store';

const bckgStore = useBackgroundStore()
</script>

<style scoped>
</style>