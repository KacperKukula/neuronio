<template>
    <h4>{{ data.header }}</h4>
    <div v-html="Utils.sanitize(data.text)" />
</template>

<script setup lang="ts">
import { Utils } from '@/utils';
import Data from './data/video.data'

const props = defineProps<{
    data: Data
}>();

console.log(props.data)
</script>

<style scoped>
</style>