<template>
    <div class="flex flex-col">
        <h2>{{ data.EXAMPLE }}</h2>
    </div>
</template>

<script lang="ts">
import Data from './data/MOD_NAME.data';

defineProps<{
    data: Data
}>();
</script>

<style lang="scss" scoped>
</style>