<template>
    <main>
        <section id="hero">
            <h1>Science change the world</h1>
        </section>

        <section id="our-mission">
            <h1>That's why we are here</h1>
        </section>
    </main>
</template>

<script setup lang="ts">
import NavBar from '@/layout/NavBar/NavBar.vue';

</script>

<style lang="scss" scoped>
section {
    &#hero {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100svh;

        &::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            background: linear-gradient(90deg, #00e078, #2231ff, #00e078);
            background-size: 400% 100%;
    
            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.2));
            mask-repeat: no-repeat;
            mask-size: cover;
            animation: backgroundSlide 1m linear infinite;
        }
    }
    &#our-mission {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100svh;
    }
}

@keyframes backgroundSlide {
    0% {
        background-position: 0% center;
    }
    100% {
        background-position: 400% center;
    }
}
</style>