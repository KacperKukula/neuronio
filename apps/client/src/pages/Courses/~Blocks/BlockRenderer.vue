<template>
    <div class="flex flex-col">
        <h3>{{ props.block.name }}</h3>

        <section class="component-zone">
            <component :is="comp" :data="props.block.data" />
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Block } from '@/common/models/Block';
import { computed, defineAsyncComponent } from 'vue';

const props = defineProps<{
    block: Block
}>();

const comp = computed(() => {
    if (!props.block?.type) {
        console.warn('🐌 Module doesn\'t provide type prop')
        return null
    }
    return defineAsyncComponent(() =>
        import(`@/blocks/${props.block.type}/${props.block.type}.vue`)
    )
})

</script>

<style scoped lang="scss">
</style>