<template>
    <div class="coursesList">
        <!-- <Listbox v-model="selectedCity" :options="cities" optionLabel="name">
            <template #option="slotProps">
                <div class="flex gap-1">
                    <span>{{ slotProps.option.icon }}</span>
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Listbox> -->

        <ul>
            <li v-for="(course, inx) in props.courses" :key="inx"
                class="clist__element" 
                :class="{ 'selected': selectedCourse == course }"
                @click="selectCourse(course)">

                {{ `${course.icon ?? ''} ${course.name}` }}
            </li>
        </ul>
    </div>  
</template>

<script setup lang="ts">
const selectCourseEmit = defineEmits(['update:selectedCourse']);

const props = defineProps({
    courses: {
        type: Object,
        required: false
    },
    selectedCourse: {
        type: Object,
        required: false
    }
});

const selectCourse = (sCourse: any) => selectCourseEmit('update:selectedCourse', sCourse);
</script>

<style lang="scss">
.coursesList {
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: .2rem;

        li {
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
</style>