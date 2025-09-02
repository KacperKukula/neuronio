import { ref, type Component } from 'vue'
import { defineStore } from 'pinia'

import GradientBckg from '@/components/Backgrounds/variants/GradientBckg.vue';
import type { Background } from '@/common/models/Background';

const BACKGROUNDSTORE_NAME = 'backgroundStore';
const DEFAULT_COMPONENT = GradientBckg;

export const useBackgroundStore = defineStore(BACKGROUNDSTORE_NAME, () => {
    const currentBckgComp = ref<Component>(DEFAULT_COMPONENT)
    const currentBckgName = ref<string>('default')

    function changeBackground(newBckg: Background) {
        currentBckgComp.value = newBckg.component;
        currentBckgName.value = newBckg.name;
    }

    function changePreferedBackground() {

    }

    return {
        currentBckgComp,
        currentBckgName,
        changeBackground,
        changePreferedBackground
    }
})