<template>
    <Dialog v-model:visible="isBlockToDeleteId" modal :header="$t('courses.deleteBlockHeader')" :style="{ width: '25rem' }">
        <p>{{ $t('courses.deleteBlockContent') }}</p>
        <div class="flex gap-3 mt-6">
            <Button :label="$t('common.delete')" icon="pi pi-trash" variant="outlined" severity="danger" iconPos="right" @click="$emit('block-delete-proceed')" />
            <Button :label="$t('common.back')" icon="pi pi-undo" variant="outlined" severity="contrast" iconPos="right" @click="$emit('block-delete-back')" />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';

const props = defineProps<{
    blockToDeleteId: number|undefined|null
}>()

defineEmits([
    'block-delete-proceed',
    'block-delete-back'
])

const isBlockToDeleteId: ComputedRef<boolean> = computed(() => !!props.blockToDeleteId);
</script>

<style scoped>
</style>