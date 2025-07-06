<template> 
    <div :class="'definition-add'" class="grid gap-4 p-12 w-fill items-center rounded-2xl">
        
        <div class="flex flex-col gap-2">
            <label for="username">Keyword</label>
            <InputText id="username" v-model="keyword" aria-describedby="username-help" />
            <Message size="small" severity="secondary" variant="simple">Enter your username to reset your password.</Message>
        </div>

        <div class="flex flex-col gap-2">
            <label for="username">Definition</label>
            <Editor v-model="definition" editorStyle="height: 320px" />
        </div>

        <Button icon="pi pi-plus" label="Wyślij" severity="succes" variant="filled" rounded aria-label="Add" @click="addAction()" />
    </div>
</template>

<script setup lang="ts">
import { knowledgeService } from '@/services/knowledgeService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits(['add'])

const keyword = ref<string>()
const definition = ref<string>()

const addAction = () => {
    emit('add', {
        keyword: keyword.value,
        definition: definition.value
    })
}
</script>

<style lang="scss" scoped>
.definition-add {
    background-color: $primaryDark;
    grid-template-columns: 1fr max-content 200px;
    border: 3px solid $darkLighter;
}
</style>