<template>
    <FloatLabel variant="on" class="w-full">
        <label for="on_label">Link</label>
        <InputText type="text" v-model="data.link" class="w-full" />
    </FloatLabel>

    <FloatLabel variant="on" class="w-full">
        <label for="on_label">Header</label>
        <InputText type="text" v-model="data.header" class="w-full" />
    </FloatLabel>

    <Editor v-model="data.text" editorStyle="height: 220px" />
</template>

<script setup lang="ts">
import Data from './data/video.data'

defineProps<{
    data: Data;
}>()
</script>