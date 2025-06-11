<template>
    <div :class="'editModule'" class="flex flex-col p-6 gap-5">

        <!--NAMING-->
        <FloatLabel variant="on" class="w-full">
            <label for="on_label">Name</label>
            <InputText type="text" v-model="module.name" class="w-full" />
        </FloatLabel>
    
        <!--EDITING COMPONENT-->
        <component v-if="editingComp" :is="editingComp" :data="props.module.data" />

        <!--SUBMIT-->
        <Button label="Submit" class="w-fit" @click="submit" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed, ref } from 'vue'
import { Module } from '@/common/models/Module'

const name = ref<string>('');

const props = defineProps<{
    module: Module
}>()

const emit = defineEmits<{
    (e: 'submit', module: Module): void
}>()

if (!props.module.data) {
    const modData = await import(`@/mods/${props.module.type}/data/${props.module.type}.data.ts`)
    props.module.data = new modData.default()
}

const editingComp = computed(() => {
    if (!props.module?.type) {
        console.warn('🐌 Module doesn\'t provide type prop')
        return null
    }
    return defineAsyncComponent(() =>
        import(`@/mods/${props.module.type}/${props.module.type}.edit.vue`)
    )
})

const submit = () => {
    emit('submit', props.module);
}
</script>