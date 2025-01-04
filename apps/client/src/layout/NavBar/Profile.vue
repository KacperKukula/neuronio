<template>
    <div class="profile">
        <UserCircleIcon />
    </div>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/outline';
</script>

<style lang="scss" scoped>
.profile {
    max-height: 100%;

    > svg {
        width: 2em;
        height: 2em;
    }
}
</style>