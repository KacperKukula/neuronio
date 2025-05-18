<template>
    <section class="profile">
        <div class="profile__content">

            <div class="profile__photo">
                
                <div class="profilePhoto">
                    <skeleton-photo :srcPromise="userService.getUserPhoto()" />
                </div>
            </div>
            <div class="profile__credentials">
                <Form v-slot="$form" @submit="sendForm">
                    <div class="flex">
                        <FormField v-slot="$field" name="name" initialValue="" class="w-1/2">
                            <h4>Name</h4>
                            <InputText v-model="userProfileForm.name" name="name" type="text" placeholder="Name" fluid class="w-1/2" :disabled="contentLoading"/>
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
                        </FormField>

                        <FormField v-slot="$field" name="surname" initialValue="" class="w-1/2">
                            <h4>Surname</h4>
                            <InputText v-model="userProfileForm.surname" name="surname" type="text" placeholder="Surname" fluid class="w-1/2" :disabled="contentLoading"/>
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
                        </FormField>
                    </div>

                    <Button type="submit" class="mt-4" :disabled="contentLoading">
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

import { userService } from '@/services/userService';
import { useUserStore } from '@/stores/userStore/UserStore';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserProfileForm } from './model/UserProfileForm';

import SkeletonPhoto from '@/components/SkeletonLoaded/SkeletonPhoto.vue';
import { UpdateUserProfileDto } from 'shared';

const contentLoading = ref(true);
const userProfileForm = ref<UserProfileForm>(new UserProfileForm());

const sendForm = async () => {
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
        display: grid;
        grid-template-columns: 1fr 3fr;
        width: min(1600px, 100%);
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

            .photo {
                width: 85%;
                height: 85%;
                background-size: cover;
                border-radius: 50%;
            }
        }

    }
}
</style>