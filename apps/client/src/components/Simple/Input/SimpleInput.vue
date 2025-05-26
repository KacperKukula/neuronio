<template>
    <input v-model="internalValue" class="simpleInput" :type="type" :placeholder="placeholder" @input="updateValue"/>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'SimpleInput',
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const internalValue = ref(props.value);

        watch(() => props.value, (newValue) => {
            internalValue.value = newValue;
        });

        const updateValue = () => {
            emit('update:value', internalValue.value);
        };

        return {
            internalValue,
            updateValue
        };
    }
})
</script>

<style lang="scss" scoped>
@use "./style.scss" as *;
</style>