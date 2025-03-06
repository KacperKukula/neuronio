<template>
  <button class="simpleButton">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export enum ButtonType {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset'
}

export default defineComponent({
    props: {
        type: {
            type: String as PropType<ButtonType>,
            default: ButtonType.BUTTON
        }
    }
});
</script>

<style lang="scss" scoped>
@use 'sass:list';

.simpleButton {
    border: none;
    background-color: transparent;
    padding: 1.2rem 1.8rem;
    position: relative;
    color: white;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50px;
        border: 10px solid transparent;
        background: conic-gradient( from 0deg, $rainbow, list.nth($rainbow, 1) ) border-box;
        mask:
            linear-gradient(#000 0 0) padding-box, 
            linear-gradient(#000 0 0);
        mask-composite: exclude;
    }

    &:hover {

        &::before {
            animation: spin 2s linear infinite;

            @keyframes spin {
                0% {
                    background: conic-gradient(from 0deg, $rainbow, list.nth($rainbow, 1) ) border-box;
                }
                100% {
                    background: conic-gradient(from 360deg, $rainbow, list.nth($rainbow, 1) ) border-box;
                }
            }
        }
    }
}
</style>