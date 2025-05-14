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

            <ul class="clist">
                <li v-for="(course, inx) in courses" :key="inx"
                    class="clist__element" 
                    :class="{ 'selected': selectedCourse == course }"
                    @click="selectCourse(inx)">

                    {{ `${course.icon ?? ''} ${course.name}` }}
                </li>
            </ul>
        </div>  
        <div class="courses__display"></div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedCourse = ref();
const courses = ref([
    { name: 'New York', icon: '🧠' },
    { name: 'Rome', icon: '🧠' },
    { name: 'London', icon: '🧠' },
    { name: 'Istanbul', icon: '🧠' },
    { name: 'Paris', icon: '🧠' }
]);

const selectCourse = (inx: number) => {
    selectedCourse.value = courses.value[inx]
}
</script>

<style lang="scss">
.courses {
    height: 100svh;
    display: flex;
    width: 100%;

    &__list {
        width: 330px;
        
        .clist {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: .2rem;

            &__element {
                position: relative;
                padding: 1rem 2rem;
                border-radius:.6rem;
                background-color: transparent;
                cursor: pointer;

                transition: all .4s ease;

                &:hover { background-color: $darkLighter; }
                &.selected { background-color: $primaryGreen; }
            }
        }
    }

    &__display {
        width: 100%;
        flex-grow: 1;
    }
}
</style>