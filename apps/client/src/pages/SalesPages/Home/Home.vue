<template>
    <section :id="'hero'" class="h-svh flex items-center justify-center">
        <div :class="'content'" class="flex flex-col items-center text-center">
            <h1 class="mb-4">
                {{ $t('salesPages.home.hero_header') }}
            </h1>
            <p class="w-4/5">{{ $t('salesPages.home.hero_text') }}</p>
        </div>
    </section>

    <section :id="'about'" class="h-svh relative" ref="about">
        <h2>Poczuj moc uczenia się</h2>
        
        <div :class="'blob-playground'" class="absoulute inset-0 z-1 blur-lg">
            <div :class="'blob'" ref="blob" class="aspect-square rounded-full bg-stone-700 transition-opacity duration-500 "></div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useFollowings } from '@/composables/useFollowings';
import { onMounted, useTemplateRef } from 'vue';

const blobEl = useTemplateRef('blob')
const aboutEl = useTemplateRef('about')

const { initCursorlight } = useFollowings();

onMounted(() => {
    if (!blobEl.value || !aboutEl.value)
        throw new Error('Template refs not initialized');

    initCursorlight(aboutEl.value, blobEl.value)});
</script>

<style scoped lang="scss">
#hero {
    .content {
        width: min(80%, 100rem);
    }
}

#about {
    background: $darker;
    overflow: hidden;

    .blob { width: 20rem; }
}
</style>