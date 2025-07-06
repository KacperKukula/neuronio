<template>
    <h4>{{ data.header }}</h4>
    <div v-html="Utils.sanitize(data.text)" />

    <iframe :src="data.link" width="600" height="400"></iframe>
</template>

<script setup lang="ts">
import { Utils } from '@/utils';
import Data from './data/video.data'

const props = defineProps<{
    data: Data
}>();
</script>

<style scoped>
</style>