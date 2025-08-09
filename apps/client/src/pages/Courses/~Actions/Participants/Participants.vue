<template>
    <section :class="'participants'" class="nav-top-padding">
        <div class="flex flex-col gap-4 m-4">
            <h4>Add participants</h4>
            <InputText type="text" v-model="searchPhrase" />
            <div class="border-1 border-solid border-white rounded-md px-4 py-3">
                <DataTable v-if="Array.isArray(searchResult)" :value="searchResult" tableStyle="min-width: 50rem">
                    <Column field="photo" header="Photo">
                        <template #body="slotProps">
                            <img class="w-10" :src="slotProps.data.photoUrl ? UploadUtils.pathToUrl(slotProps.data.photoUrl) : null" />
                        </template>
                    </Column>
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
            <DataTable :value="participants" tableStyle="min-width: 50rem">
                <Column field="photo" header="Photo">
                    <template #body="slotProps">
                        {{ slotProps.data.avatar }}
                        <ProfileAvatar  />
                    </template>
                </Column>
                <Column field="email" header="Email"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="actions" header="Remove">
                    <template #body="slotProps">
                        <Button @click="removeParticipant(slotProps.data)" label="Remove" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </section>
</template>

<script setup lang="ts">
import { UploadUtils } from '@/modules/upload/UploadUtils';
import { participantsService } from '@/services/participantsService';
import { userService } from '@/services/userService';
import type { User } from '@/stores/userStore/model/User';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar.vue';


const route = useRoute()
const courseId = route.params.id

const searchPhrase = ref('');
const searchResult = ref<User[] | string>('Type to search for participants');

const participants = ref<User[]|null>()

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
                return !participants.value.some((participant: User) => participant.id === user.id);
            });
        }
    } catch (error) {
        console.error(error);
    }
})

const addParticipant = (participant: any) => {
    participants.value.push(participant)
    searchResult.value = searchResult.value.filter((user: User) => user.id !== participant.id);
    participantsService.addParticipant(courseId, participant.id)
};

const removeParticipant = (participant: any) => {
    participants.value = participants.value.filter((user: User) => user.id !== participant.id);
    participantsService.removeParticipant(courseId, participant.id)
}

onMounted(async () => {
    participants.value = await participantsService.getParticipants(courseId);
})
</script>

<style scoped>
section.participants {
    margin: 0 auto;
    width: min(100%, 1200px);
}
</style>