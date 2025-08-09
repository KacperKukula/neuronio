<template>
    <section :class="'profile'" class="nav-top-padding">
        <div :class="'profile__content'" class="pt-8">

            <div class="profile__photo">
                
                <div :class="'profilePhoto'"
                    class="w-full aspect-1/1 p-6">
                    
                    <label name="fileUpload" :class="'profilePhoto__display'"
                        class="w-full h-full group flex items-center justify-center shrink-1 rounded-full cursor-pointer"
                        style="background-color: black;">

                        <CameraIcon v-if="!userPhoto" class="h-2/4 w-2/4 group-hover:scale-85 transition-transform ease-out" />
                        <img v-else :src="userPhoto" class="w-full h-full object-cover rounded-full" />
                        <input name="fileUpload" type="file" accept="image/*" class="hidden" @change="onSelectedFiles" />
                    </label>
                </div>
            </div>
            <div class="profile__credentials">
                <Form v-slot="$form" @submit="sendProfileForm">
                    <div class="flex gap-4 my-4">
                        <FormField v-slot="$field" name="name" initialValue="" class="w-1/2">
                            <h4 class="mb-2">Name</h4>
                            <InputText v-model="userProfileForm.name" name="name" type="text" placeholder="Name" fluid class="w-1/2" :disabled="contentLoading"/>
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="surname" initialValue="" class="w-1/2">
                            <h4 class="mb-2">Surname</h4>
                            <InputText v-model="userProfileForm.surname" name="surname" type="text" placeholder="Surname" fluid class="w-1/2" :disabled="contentLoading"/>
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
                        </FormField>

                    </div>

                    <h2 class="mb-2">Bio</h2>
                    <Editor v-model="userProfileForm.bio" class="mb-3" editorStyle="height: 320px" />
                    
                    <FormField v-slot="$field" name="Position" initialValue="" class="w-full">
                        <h4 class="mb-2">Position</h4>
                        <InputText v-model="userProfileForm.position" name="surname" type="text" placeholder="Surname" fluid class="w-1/2" :disabled="contentLoading"/>
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
                    </FormField>

                    <Button type="submit" :disabled="contentLoading">
                        <template #default>
                            <span>Save</span>
                        </template>
                    </Button>
                </Form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CameraIcon } from "@heroicons/vue/24/outline"

import { userService } from '@/services/userService'
import { useUserStore } from '@/stores/userStore/UserStore';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserProfileForm } from './model/UserProfileForm';
import { UpdateUserProfileDto } from 'shared';
import { UploadManager } from '@/modules/upload/uploadMngr';

const emit = defineEmits(['reload'])

const userStore = useUserStore()

const contentLoading = ref(true);

const userPhoto = ref<string|null>(userStore.getUserAvatar)
const isUserPhotoLoading = ref<boolean>(true)

const userProfileForm = ref<UserProfileForm>(new UserProfileForm());

const onSelectedFiles = async (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
        userPhoto.value = await UploadManager.uploadAvatar(files[0])
        emit('reload')
    }
}

const sendProfileForm = async () => {
    contentLoading.value = true;
    
    const userProfileDto = plainToInstance(UpdateUserProfileDto, userProfileForm.value)
    await userService.updateUserProfile(userProfileDto);
    
    contentLoading.value = false;
};

onMounted(async () => {

    const userProfileResp = await userService.getUserProfile();

    userProfileForm.value = userProfileResp ?
        plainToClass(UserProfileForm, userProfileResp) : new UserProfileForm()

    contentLoading.value = false;
});

</script>

<style scoped lang="scss">
.profile {
    margin-top: 2rem;
    display: flex;
    justify-content: center;

    &__content {
        gap: 2.6rem;
        display: grid;
        grid-template-columns: 1fr 3fr;
        width: min(1300px, 100%);
    }

    &__photo {

        .profilePhoto {
            width: 100%;
            aspect-ratio: 1/1;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            border: 1px solid $primaryGreen;

            &__display {
                > svg { height: 80%; }
            }
        }

    }
}
</style>