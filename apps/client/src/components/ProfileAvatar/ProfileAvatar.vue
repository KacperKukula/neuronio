<template>
    <div class="profileAvatar">
        <Avatar v-if="src" :src="src" shape="circle" />

        <template v-else>
            <UserCircleIcon />
        </template>
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar'; 
import { UserCircleIcon } from '@heroicons/vue/24/outline';

defineProps({
    src: String
})
</script>

<style scoped lang="scss">
.profileAvatar {
    max-width: 2.5rem;
    padding: .2rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid $primaryGreen;
}
</style>