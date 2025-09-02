<template>
    <component :is="bckgStore.currentBckgComp" />
</template>

<script setup lang="ts">
import { useBackgroundStore } from '@/stores/background/store';
import { watch } from 'vue';

const bckgStore = useBackgroundStore()

watch(() => bckgStore.currentBckgComp, () => console.log('💀'))
</script>

<style scoped>
</style>