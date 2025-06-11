<template>
    <div class="flex flex-col gap-4 mb-4">
        <h4>Add participants</h4>
        <InputText type="text" v-model="searchPhrase" />
        <div class="border-1 border-solid border-white rounded-md px-4 py-3">
            <DataTable v-if="Array.isArray(searchResult)" :value="searchResult" tableStyle="min-width: 50rem">
                <Column field="email" header="Email"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="actions" header="Actions">
                    <template #body="slotProps">
                        <Button @click="addParticipant(slotProps.data)" label="Add" />
                    </template>
                </Column>
            </DataTable>

            <h4 v-else>Type to search for participants</h4>
        </div>
    </div>

    <div class="paricipants">
        <h4>Participants</h4>
        <DataTable :value="props.modelValue" tableStyle="min-width: 50rem">
            <Column field="photo" header="Photo"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="actions" header="Remove">
                <template #body="slotProps">
                    <Button @click="removeParticipant(slotProps.data)" label="Remove" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { userService } from '@/services/userService';
import type { User } from '@/stores/userStore/model/User';
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: any[]
}>();

const searchPhrase = ref('');
const searchResult = ref<User[] | string>('Type to search for participants');

watch(searchPhrase, async (newPhrase: string) => {

    if(newPhrase.length === 0) {
        searchResult.value = 'Type to search for participants';
        return;
    }
    
    try {
        searchResult.value = await userService.searchForUsers(newPhrase);

        // Filter out already added participants
        if (Array.isArray(searchResult.value)) {
            searchResult.value = searchResult.value.filter((user: User) => {
                return !props.modelValue.some((participant: User) => participant.id === user.id);
            });
        }
    } catch (error) {
        console.error(error);
    }
})

const addParticipant = (participant: any) => {
    props.modelValue.push(participant)
    searchResult.value = searchResult.value.filter((user: User) => user.id !== participant.id);
};

const removeParticipant = (participant: any) => {
    props.modelValue = props.modelValue.filter((user: User) => user.id !== participant.id);
    searchResult.value.push(participant);
}

</script>

<style scoped>
</style>