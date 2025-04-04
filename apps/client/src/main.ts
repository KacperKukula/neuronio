import "reflect-metadata";

import { createApp } from 'vue'
import App from './App.vue'

/* ROUTER */
import { createMemoryHistory, createRouter } from 'vue-router'
import { firebaseAuth } from '@/modules/firebase/firebaseAuth'
import { routes } from './router/routes'

/* STORES */
import { createPinia } from "pinia";
import { useUserStore } from "./stores/userStore/UserStore";

/* LIBRARIES */
import PrimeVue from 'primevue/config';

/* CINFIGS */
import PrimeConf from '@/conf/prime.config'

/* STYLES */
import './style.scss'

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
    .use(PrimeVue, PrimeConf)
    .mount('#app')