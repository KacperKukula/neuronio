<template>
    <div>
        <FloatLabel variant="on" class="w-full">
            <label for="on_label">Opis:</label>
            <Editor v-model="data.text" editorStyle="height: 320px" />
        </FloatLabel>

        <div class="grid grid-cols-2 gap-2 py-4">

            <!--ALL DEFINITIONS-->
            <div :class="'defsTable'" class="grid grid-cols-[5rem_1fr_15rem] gap-2 rounded-lg">
                <span class="font-bold px-3 py-2">Id</span>
                <span class="font-bold px-3 py-2">Keyword</span>
                <span class="font-bold px-3 py-2 flex justify-center">Action</span>
    
                <template v-for="(fdef, inx) in getFilteredDefs()" :key="inx">
                    <!--FIRST COLUMN-->
                    <span class="px-3 py-2">{{ fdef.id }}</span>
                    <!--SECOND COLUMN-->
                    <p class="px-3 py-2">{{ fdef.keyword }}</p>
                    <!--THIRD COLUMN-->
                    <div class="flex justify-center">
                        <Button :label="`${ $t('common.add') }`" severity="success" icon="pi pi-plus" @click="addDef(fdef)" />
                    </div>
                </template>
            </div>

            <!--ADDED DEFINITIONS-->
            <div :class="'defsTable'" class="grid grid-cols-[5rem_1fr_15rem] gap-2 rounded-lg">
                <span class="font-bold px-3 py-2">Id</span>
                <span class="font-bold px-3 py-2">Keyword</span>
                <span class="font-bold px-3 py-2 flex justify-center">Action</span>
    
                <template v-for="(adef, inx) in addedDefs" :key="inx">
                    <!--FIRST COLUMN-->
                    <span class="px-3 py-2">{{ adef.id }}</span>
                    <!--SECOND COLUMN-->
                    <p class="px-3 py-2">{{ adef.keyword }}</p>
                    <!--THIRD COLUMN-->
                    <div class="flex justify-center">
                        <Button :label="`${ $t('common.delete') }`" severity="danger" icon="pi pi-trash" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Data from './data/definitions.data'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { knowledgeService } from '@/services/knowledgeService';
import type { Definition } from '@/common/models/Definition';

const route = useRoute()
const courseId = route.params.id

const defs = ref<Definition[]>([])
const filteredDefs = ref<Definition[]>([])
const addedDefs = ref<Definition[]>([])

const props = defineProps<{
    data: Data;
}>()

const addDef = (def: Definition) => {
    addedDefs.value.push(def)

    // TODO: Different way to add
    props.data.definitions = addedDefs.value.map((adef) => adef.id)
}

const getFilteredDefs = () => {
    return defs.value.filter(def =>
        !addedDefs.value.some(adef => adef.id === def.id)
    );
};

onMounted(async () => {
    defs.value = await knowledgeService.getCourseDefinitions(courseId);
})
</script>

<style scoped lang="scss">
.defsTable {
    border: 2px solid $darkLighter;
}
</style>