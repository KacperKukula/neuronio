<template>
    <component :is="comp" :data="props.block.data" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

const props = defineProps({
    block: Object
})

const comp = computed(() => {
    if (!props.block?.type) {
        console.warn('🐌 Module doesn\'t provide type prop')
        return null
    }
    return defineAsyncComponent(() =>
        import(`@/mods/${props.block.type}/${props.block.type}.vue`)
    )
})

</script>

<style scoped lang="scss">
</style>