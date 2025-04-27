<template>
    <div class="dashboard">
        <!-- <Button label="Warn" severity="warn" rounded /> -->

        <Courses />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';

import Courses from './components/Courses.vue';

export default defineComponent({
    name: 'Dashboard',
    components: {
        Button,
        Listbox,
        Courses
    },
});
</script>

<style scoped style="scss">
.dashboard {
    margin-top: 5rem;
    height: 4rem;


}
</style>