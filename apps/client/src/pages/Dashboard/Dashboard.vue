<template>
    <div>
        😒 Nothing here? Ugh

        <button @click="fetchData">{{ apiText }}</button>
    </div>
</template>

<script setup lang="ts">
import { HttpService } from '@/modules/httpService/httpService';
import { ref } from 'vue';

const apiText = ref('Click me to fetch data');

const fetchData = async () => {
    apiText.value = 'Loading...';
    const response: Response = HttpService.authorizedReq().get('');
};

</script>

<style lang="scss" scoped>
div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
}
</style>