<template>
    <section class="px-4">
        <div :class="'definition-view'" v-for="def in definitions" class="flex items-center gap-4 p-4">
            <p>{{ def.keyword }}</p>

            <div v-html="Utils.sanitize(def.definition)" />

            <div :class="'definition-view__support'" class="flex gap-2 align-items">
                <Button icon="pi pi-pencil" severity="help" size="small" variant="outlined" rounded aria-label="Cancel" />
                <Button icon="pi pi-times" severity="danger" size="small" variant="outlined" rounded aria-label="Cancel" @click="deleteDef(def.id)" />
            </div>
        </div>

        <definition-add @add="addDefinition" />
    </section>

</template>

<script setup lang="ts">
import { Utils } from '@/utils';
import { knowledgeService } from '@/services/knowledgeService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { CreateDefinitionDto } from 'shared';
import type { Definition } from '@/common/models/Definition';
import DefinitionAdd from './components/DefinitionAdd.vue';

const route = useRoute()
const courseId = route.params.id

const definitions = ref<Definition[]>()

const addDefinition = async (params: { keyword: string, definition: string }) => {
    const newDef = new CreateDefinitionDto();

    newDef.courseId = courseId
    newDef.keyword = params.keyword
    newDef.definition = params.definition

    const def = await knowledgeService.createDefinition(newDef)

    await reloadDefs();
}

const deleteDef = async (id: number) => {
    await knowledgeService.deleteDef(id);
    await reloadDefs();
}

/**
 * Loads all of the definitions
 * Main functions in definitions functionality
 */
const reloadDefs = async () => definitions.value = await knowledgeService.getCourseDefinitions(courseId as string);

onMounted(async () => await reloadDefs());
</script>

<style lang="scss" scoped>
section {
    width: min(1600px, 100%);
    margin: 0 auto;
}

.definition-view {

}
</style>