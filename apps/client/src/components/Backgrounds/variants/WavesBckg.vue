<template>
    <div :class="intro ? 'wave-bg-intro' : 'wave-bg'"  class="w-full h-full"></div>
</template>

<script setup lang="ts">
defineProps({
    intro: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.wave-bg {
    background: linear-gradient(120deg, #6a82fb, #fc5c7d, #43cea2, #185a9d);
    background-size: 400% 400%;
    animation: gradientMove 20s ease-in-out infinite;
    opacity: .7;

    mask-image: linear-gradient(to bottom, transparent 0%, #000000a4 50%, black 100%);
}

.wave-bg-intro {
    background: linear-gradient(120deg, #6a82fb, #fc5c7d, #43cea2, #185a9d);
    animation: gradientMove 20s ease-in-out infinite;
}

@keyframes gradientMove {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>