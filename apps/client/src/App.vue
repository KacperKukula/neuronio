<template>
  <NavBar class="z-20" />

  <!-- <Dialog class="z-30" /> -->

  <AlertArea />

  <!--class="py-5 px-4 flex flex-col items-center"-->

  <main :class="'page-view'">
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
import LangSwitch from './components/LangSwitch/LangSwitch.vue';
import RadarLoader from '@/components/Loaders/RadarLoader.vue';
import NavBar from '@/layout/NavBar/NavBar.vue';
import Footer from '@/layout/Footer.vue';

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
.page-view {
  margin-top: $navBarHeight;
  min-height: calc(100svh - $navBarHeight - $footerHeight);
}
</style>
