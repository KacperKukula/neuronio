import { defineStore } from "pinia";
import { ref } from "vue";

const VISUALS = 'visuals'

export const useCounterStore = defineStore(VISUALS, () => {
    
    // Loading
    const globalLoad = ref<boolean>(false)

    const setGlobalLoad = (val: boolean) => {
        globalLoad.value = val;
    }

    return {
        globalLoad,
        setGlobalLoad,
    }
    
})