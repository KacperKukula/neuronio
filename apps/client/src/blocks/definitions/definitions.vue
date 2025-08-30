<template>
    <div :class="'formated-text'" class="flex flex-col">
        <p v-html="Utils.sanitize(data.text)"></p>
        
        <div v-if="moduleState === DefinitionModuleState.NOT_ACTIVE"
            :class="'defs-tile defs-tile--nonactive'" class="w-full flex justify-center p-8 bg-stone-700">

            <Button label="Activate definitions" @click="activateModule" />
        </div>
        
        <div v-else :class="'defs-tile defs-tile--active'" class="bg-stone-700">

            <!--NO CONTENT-->
            <template v-if="moduleState === DefinitionModuleState.NO_CONTENT">
                <NoContent />
            </template>

            <!--ACTIVE RUN-->
            <template v-if="moduleState === DefinitionModuleState.ACTIVE">
                <div class="flex justify-center py-8">
                    <DefCard :front="activeDef?.keyword" :back="activeDef?.definition" />
                </div>
    
                <div class="w-full grid grid-cols-2 overflow-hidden">
                    <button :class="['answerButton', 'answerButton--positive']" class="place-items-center py-4" @click="nextDefinition(true)">
                        {{ $t('modules.definitions.answerPositive') }}
                    </button>
                    <button :class="['answerButton', 'answerButton--negative']" class="place-items-center py-4" @click="nextDefinition(false)">
                        {{ $t('modules.definitions.answerNegative') }}
                    </button>
                </div>
            </template>

            <!--RUN ENDED, STATS-->
            <template v-else-if="moduleState === DefinitionModuleState.ENDED">
                <EndedRun :runData="run" @reset="resetRun()" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Utils } from '@/utils';
import { Definition } from '@/common/models/Definition';
import { knowledgeService } from '@/services/knowledgeService';

import Data from './data/definitions.data'
import DefCard from './components/DefCard.vue';
import RunData from './data/definition.run';
import { DefinitionModuleState } from './enums/DefinitionModuleState';
import NoContent from './components/NoContent.vue';
import EndedRun from './components/EndedRun.vue';

const randomizedDefs = ref<Definition[]>()

const moduleState = ref(DefinitionModuleState.NOT_ACTIVE);

/* Currently active definition for user */
const activeDef = ref<Definition>()

/* All data of the run */
const run = ref<RunData>()

/* Show reverse of the card */
const show = ref<boolean>(false)

const props = defineProps<{
    data: Data
}>();

const activateModule = async () => {
    moduleState.value = DefinitionModuleState.STAND_BY

    const rawDefs = await knowledgeService.getDefinitions(props.data.definitions)
    
    if(!rawDefs.length) {
        moduleState.value = DefinitionModuleState.NO_CONTENT;
        return;
    }

    // Set up new run
    run.value = new RunData(rawDefs.length);    
    randomizedDefs.value = randomizePosition(rawDefs);
    activeDef.value = randomizedDefs.value[0];

    moduleState.value = DefinitionModuleState.ACTIVE;
}

const nextDefinition = (scored: boolean) => {
    if ( !run.value ) return console.error('💀 Run is null')

    // If scored add +1 to score
    if( scored ) run.value.score++;

    // If 0 - the end of run
    const counter = run.value.nextStep();

    console.log(counter)

    if( !counter ) return ( moduleState.value = DefinitionModuleState.ENDED )

    activeDef.value = randomizedDefs.value?.[counter]

    console.log(run.value)
}

const randomizePosition = (defArr: Definition[]) => {
    const arr = [...defArr];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const resetRun = async () => {
    const rawDefs = await knowledgeService.getDefinitions(props.data.definitions)

    randomizedDefs.value = randomizePosition(rawDefs);
    activeDef.value = randomizedDefs.value[0];

    // Set up new run
    run.value = new RunData(rawDefs.length);    
    randomizedDefs.value = randomizePosition(rawDefs);
    activeDef.value = randomizedDefs.value[0];

    moduleState.value = DefinitionModuleState.ACTIVE;
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_coursesVars.scss' as *;
@use './scss/tileStyle.scss';

.answerButton {
    cursor: pointer;

    &--positive {
        &:hover { background-color: $moduleGoNext; }
    }

    &--negative {
        &:hover { background-color: $moduleGoBack; }
    }
}
</style>