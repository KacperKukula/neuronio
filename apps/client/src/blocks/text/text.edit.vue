<template>
    <Editor v-model="data.text" editorStyle="height: 320px" />
</template>

<script setup lang="ts">
import Data from './data/text.data'

defineProps<{
    data: Data;
}>()
</script>