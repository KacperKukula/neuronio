<template>
    <div v-if="isLoading" class="photo loading"></div>

    <slot v-else-if="!isLoading && !src" name="no-photo"></slot>

    <div v-else class="photo loaded" :style="{ backgroundImage: src ? `url('${src}')` : undefined }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
    srcPromise: Promise<string>
}>();

const src = ref<string | null>(null);
const isLoading = ref(true);

const load = async () => {
    isLoading.value = true;
    src.value = await props.srcPromise;
    isLoading.value = false;
};

onMounted(load);
watch(() => props.srcPromise, load);
</script>

<style scoped lang="scss">
.photo {
    height: 100%;
    background-size: cover;

    &.loading {
        background: linear-gradient(90deg, #a1a0a0 0%, #e4e4e4 50%, #a1a0a0 100%);
        background-size: 300% 100%;
        animation: loading 2.5s infinite linear;
    }
}

@keyframes loading {
    0% { background-position: 0; }
    100% { background-position: 300% 0; }
}
</style>