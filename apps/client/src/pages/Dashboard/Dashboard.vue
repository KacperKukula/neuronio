<template>
    <div class="dashboard">
        😒 Nothing here? Ugh - dashboard

        <Button label="Warn" severity="warn" rounded />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
    name: 'Dashboard',
    components: {
        Button,
    },
});
</script>

<style scoped style="scss">
.dashboard {
    margin-top: 5rem;
    height: 4rem;
}
</style>