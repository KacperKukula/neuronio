<template>
    <div class="flex flex-col">
        <p v-html="Utils.sanitize(data.text)"></p>
        
        <div v-if="!active" class="w-full flex justify-center p-8 bg-stone-700">
            <Button label="Activate definitions" @click="activateModule" />
        </div>
        
        <div v-else class="p-6 bg-stone-700">

            <template v-if="!runEnd">
                <div v-if="!show" class="aspect-square h-52 bg-red-800" @click="show = true">
                    {{ activeDef?.keyword }}
                </div>
                <div v-else class="aspect-square h-52 bg-blue-800" @click="show = false">
                    {{ activeDef?.definition }}
                </div>
    
                <span>{{ `Debug: counter ${counter}` }}</span>
                <Button label="Next" @click="nextDefinition" />
            </template>

            <template v-else>
                <h2>KONIEC</h2>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Data from './data/definitions.data'
import { Utils } from '@/utils';
import { Definition } from '@/common/models/Definition';
import { knowledgeService } from '@/services/knowledgeService';

const active = ref<boolean>(false)
const definitions = ref<Definition[]>()

// Definitions active
const activeDef = ref<Definition>()
const runEnd = ref<boolean>(false)
let counter = 0;
let score = 0;

const show = ref<boolean>(false)

const props = defineProps<{
    data: Data
}>();

const activateModule = async () => {
    active.value = false

    const rawDefs = await knowledgeService.getDefinitions(props.data.definitions)
    
    definitions.value = randomizePosition(rawDefs);
    activeDef.value = definitions.value[0];
    
    active.value = true;
}

const nextDefinition = () => {
    if(++counter >= definitions.value?.length) return runEnd.value = true;
    
    show.value = false;
    activeDef.value = definitions.value[counter]
}

const randomizePosition = (defArr: Definition[]) => {
    const arr = [...defArr];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
</script>

<style lang="scss" scoped>
</style>