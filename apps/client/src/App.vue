<template>
  <NavBar />

  <AlertArea />

  <main>
<router-view v-slot="{ Component }">
    <suspense timeout="0">
      <!-- Default -->
      <template #default>
        <component :is="Component" :key="viewKey" @reload="reload" />
      </template>

      <!-- Loading -->
      <template #fallback>
        <div class="w-full flex justify-center items-center">
          <RadarLoader />
        </div>
      </template>
    </suspense>
  </router-view>
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavBar from '@/layout/NavBar/NavBar.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from './stores/userStore/UserStore';
import RadarLoader from '@/components/Loaders/RadarLoader.vue';

const userStore = useUserStore()
const isLoading = ref(true);

const viewKey = ref(0);

const reload = () => viewKey.value++

onMounted(async () => {
  userStore.loadUser()
  
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
