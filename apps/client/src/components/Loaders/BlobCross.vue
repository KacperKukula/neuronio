<template>
    <div class="loader"></div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.loader {
    width: 80px;
    aspect-ratio: 1;
    border: 10px solid #0000;
    box-sizing: border-box;
    background: 
    radial-gradient(farthest-side,#fff 98%,#0000) 0    0/20px 20px,
    radial-gradient(farthest-side,#fff 98%,#0000) 100% 0/20px 20px,
    radial-gradient(farthest-side,#fff 98%,#0000) 100% 100%/20px 20px,
    radial-gradient(farthest-side,#fff 98%,#0000) 0 100%/20px 20px,
    linear-gradient(#fff 0 0) 50%/40px 40px,
    #000;
    background-repeat:no-repeat;
    filter: blur(4px) contrast(10);
    animation: l12 0.8s infinite;
}
@keyframes l12 {
    100%  {background-position:100% 0,100% 100%,0 100%,0 0,center}
}
</style>