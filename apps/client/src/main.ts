import "reflect-metadata";

import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

import { createMemoryHistory, createRouter } from 'vue-router'
import { firebaseAuth } from '@/modules/firebase/firebaseAuth'
import { routes } from './router/routes'
import { createPinia } from "pinia";
import { useUserStore } from "./stores/userStore/UserStore";

const pinia = createPinia()

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

// router.beforeEach(() => {

//   import('@/modules/firebase/firebaseAuth')

//   console.log(firebaseAuth.currentUser)
// });

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
