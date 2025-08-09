<template>
  <NavBar class="z-20" />

  <!-- <Dialog class="z-30" /> -->

  <AlertArea />

  <main class="z-1">
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <!-- Default -->
        <template #default>
          <component :is="Component" :key="viewKey" @reload="reload" />
        </template>

        <!-- Loading -->
        <template #fallback>
          <div class="w-full flex justify-center items-center pt-18">
            <RadarLoader />
          </div>
        </template>
      </suspense>
    </router-view>

  </main>
  
  <LangSwitch v-if="!userStore.isLoggedIn" class="fixed b-0 l-0 z-5" />
  
  <Footer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useUserStore } from './stores/userStore/UserStore';
import RadarLoader from '@/components/Loaders/RadarLoader.vue';
import NavBar from '@/layout/NavBar/NavBar.vue';
import Footer from '@/layout/Footer.vue';
import LangSwitch from './components/LangSwitch/LangSwitch.vue';
import { Interactions } from './common/events/Interactions';

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

main {
  min-height: calc(100svh - $footerHeight);
}
</style>
