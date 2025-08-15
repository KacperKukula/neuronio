<template>
    <Dialog modal :draggable="false">
        <template #header>
            <h3>Usuwanie kursu</h3>
        </template>
        
        <p class="mb-4">Czy na pewno chcesz usunąć ten kurs?</p>
        
        <div class="flex gap-3">
            <Button severity="danger" @click="deleteFnc()">Usuwam kurs</Button>
            <Button severity="secondary" @click="backFnc()">Rozmyśliłem się!</Button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
defineProps<{
    deleteFnc: Function,
    backFnc: Function
}>()
</script>

<style scoped>
</style>