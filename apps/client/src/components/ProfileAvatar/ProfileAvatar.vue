<template>
    <div class="profileAvatar">
        <!-- <Avatar v-if="src" :src="src" shape="circle" /> -->

        <UserCircleIcon class="cursor-pointer stroke-1" aria-haspopup="true" aria-controls="overlay_menu" />
    </div>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
    userId?: number
}>()
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