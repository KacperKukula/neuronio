<template>
  <NavBar />

  <main>
    <div v-if="isLoading">Ładowanie...</div>

    <RouterView v-else v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>
    
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavBar from '@/layout/NavBar/NavBar.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from './stores/userStore/UserStore';

const userStore = useUserStore()
const isLoading = ref(true);

onMounted(async () => {
  await userStore.loadUser();
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
  padding-top: calc($navBarHeight + .3rem);
}
</style>
