<template>
    <div class="logo-wrapper">
        <!--LOGO COLORED 1-->
        <div :class="'logo colored'" class="z-1"
            :style="{ color: color1 }">neuronio.io</div>

        <!--LOGO PLAIN-->
        <div :class="'logo'" class="relative z-2">neuronio.io</div>
            
        <!--LOGO COLORED 1-->
        <div :class="'logo colored'" class="z-1"
            :style="{ color: color2 }">neuronio.io</div>
    </div>
</template>

<script setup lang="ts">
import { getRandomColor } from '@/common/Colors';

const color1 = getRandomColor();
const color2 = getRandomColor()
</script>

<style lang="scss" scoped>
.logo-wrapper {
    position: relative;
    overflow: visible;

    &:hover {
        .logo.colored:first-child { transform: translate(-2.5px, -2.5px); }
        .logo.colored:last-child { transform: translate(2.5px, 2.5px); }
    }
}

.logo {
    box-sizing: border-box;
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    gap: 4px;
    height: 100%;

    &.colored {
        margin: auto;
        pointer-events: 0;
        position: absolute;
        inset: 0;
        transition: transform .2s ease-in-out;
    }
}
</style>