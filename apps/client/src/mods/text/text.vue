<template>
    <div v-html="Utils.sanitize(props.data.text)" />
</template>

<script setup lang="ts">
import { Utils } from '@/utils';

const props = defineProps<{
    data: object
}>();
</script>

<style scoped>
</style>