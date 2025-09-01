import { ref, type Component } from 'vue'
import { defineStore } from 'pinia'

import GradientBckg from '@/components/Backgrounds/variants/GradientBckg.vue';
import NetBckg from '@/components/Backgrounds/variants/NetBckg.vue';

const BACKGROUNDSTORE_NAME = 'courseStore';
const DEFAULT_COMPONENT = NetBckg;

export const useBackgroundStore = defineStore(BACKGROUNDSTORE_NAME, () => {
  const backgroundComp = ref<Component>(DEFAULT_COMPONENT)

  return { backgroundComp }
})