<template>
    <Section :id="'hero'" :type="SectionTypes.FULL_WIDTH" :class="'courses'" class="h-svh flex items-center justify-center">
                <div :class="'content'" class="flex flex-col items-center text-center">
            <h1 class="mb-4">
                {{ $t('salesPages.home.hero_header') }}
            </h1>
            <p class="w-4/5">{{ $t('salesPages.home.hero_text') }}</p>
            <p class="mt-12 mb-6">{{ $t('salesPages.home.hero_customize') }}</p>

            <div class="flex gap-4">
                <BackgroundTile :bckg="renderedBckgMap[0]" @click="bckgStore.changeBackground(renderedBckgMap[0])" />
                <BackgroundTile :bckg="renderedBckgMap[1]" @click="bckgStore.changeBackground(renderedBckgMap[1])" />
            </div>
        </div>
    </Section>

    
    <Section :id="'about'" :type="SectionTypes.FULL_WIDTH" class="h-svh relative flex items-center justify-center" ref="about">
        <div class="flex flex-col gap-12 items-center relative z-2">
            <h2>Nauka to światło, które rozświetla mroki życia 💡</h2>
            
            <div class="flex gap-3">
                <Button asChild v-slot="slotProps" severity="secondary">
                    <RouterLink to="/login" :class="slotProps.class" class="cursor-pointer">{{ $t('common.signin') }}</RouterLink>
                </Button>
                <Button asChild v-slot="slotProps" severity="secondary">
                    <RouterLink to="/login" :class="slotProps.class" class="cursor-pointer">{{ $t('common.signup') }}</RouterLink>
                </Button>
            </div>
        </div>
        <!--blur-lg bg-stone-700-->
        <div :class="'blob-playground'" class="absolute inset-0 z--1">
            <img src="/imgs/green-abstract.jpg" class="absolute h-full inset-0 object-cover z--2" />
            
            <div :class="'shadow'" ref="shadow" class="absolute inset-0 z-0 transition-opacity"></div>
            <div :class="'blob'" ref="blob" class="aspect-square z--1 rounded-full transition-opacity duration-500 "></div>
        </div>
    </Section>
</template>

<script setup lang="ts">
import { useFollowings } from '@/composables/useFollowings';
import { onMounted, useTemplateRef } from 'vue';

import { useBackgroundStore } from '@/stores/background/store';
import Section from '@/components/Section/Section.vue';
import { SectionTypes } from '@/components/Section/enums/SectionTypes';
import BackgroundTile from '@/components/Backgrounds/BackgroundTile.vue';
import { renderedBckgMap } from '@/common/RenderedBckgMap';

const blobEl = useTemplateRef('blob')
const aboutEl = useTemplateRef('about')
const shadowEl = useTemplateRef('shadow')

const bckgStore = useBackgroundStore()

const { initCursorlight, initCursorShadowLight } = useFollowings();

onMounted(() => {
    if (!blobEl.value || !aboutEl.value)
        throw new Error('Template refs not initialized');

    initCursorShadowLight(aboutEl.value.$el, blobEl.value, shadowEl.value)
});
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

    .blob {
        width: 250%;
        height: 250%;
        background: radial-gradient(circle, transparent 0%, transparent 10%, black 15%, black 100%);
    }

    .shadow {
        background-color: black;
    }
}
</style>