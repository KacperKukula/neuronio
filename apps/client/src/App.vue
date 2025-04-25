<template>
  <NavBar />

  <main>    
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavBar from '@/layout/NavBar/NavBar.vue';
import { onMounted } from 'vue';
import { useUserStore } from './stores/userStore/UserStore';

const userStore = useUserStore()

onMounted(async () => {
  await userStore.loadUser()
  
  console.log(userStore.user)
})
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
