<template>
    <div :id="`net-bg-${uniqueId}`" :class="intro ? 'net-bg-intro' : 'net-bg'"  class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { useParticleJs } from '@/composables/useParticlesJs';
import { onMounted } from 'vue';

const uniqueId = `net-bg-${Math.random().toString(36).slice(2, 10)}`;

defineProps({
    intro: {
        type: Boolean,
        default: false
    }
});

const { getParticlesJsFunction } = useParticleJs();

onMounted(() => {
    const particlesJs = getParticlesJsFunction();

    if(!particlesJs) return console.error('particlesJs not imported');

    particlesJs(`net-bg-${uniqueId}`, {
        particles: {
            number: {
                value: 160,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: 0.5,
                random: true,
            },
            size: {
                value: 3,
                random: true,
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    })
})
</script>

<style scoped>
.net-bg {
    opacity: .5;
    mask-image: linear-gradient(to bottom, transparent 0%, #000000a4 60%, black 100%);
}

.net-bg-intro {
    animation: gradientMove 20s ease-in-out infinite;
}
</style>