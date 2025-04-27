<template>
    <section class="courses">
        <div class="courses__list">
            <!-- <Listbox v-model="selectedCity" :options="cities" optionLabel="name">
                <template #option="slotProps">
                    <div class="flex gap-1">
                        <span>{{ slotProps.option.icon }}</span>
                        <div>{{ slotProps.option.name }}</div>
                    </div>
                </template>
            </Listbox> -->

            <ul>

            </ul>
        </div>  
        <div class="courses__display"></div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY', icon: '🧠' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
</script>

<style lang="scss">
.courses {
    height: 100svh;
    display: flex;
    width: 100%;

    &__list {
        width: 330px;
        
    }

    &__display {
        width: 100%;
        flex-grow: 1;
    }
}
</style>