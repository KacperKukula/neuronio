<template>
    <div :class="'nocontent'" class="w-full h-full flex flex-col justify-center items-center">
        <h3>{{ $t('modules.definitions.ended') }}</h3>

        <p>Your score is:</p>

        <h2>{{ `${runData.score}/${runData.length}` }}</h2>

        <Button class="my-4" :label="$t('common.tryagain')" icon="pi pi-refresh" @click="emit('reset')" />
    </div>
</template>

<script setup lang="ts">
import RunData from '../data/definition.run';

defineProps<{
    runData: RunData
}>()

const emit = defineEmits(['reset'])

</script>

<style scoped>
</style>