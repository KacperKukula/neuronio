import "reflect-metadata";

import { createApp } from 'vue'
import App from './App.vue'

/* ROUTER */
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router/routes'

/* STORES */
import { createPinia } from "pinia";
import { useUserStore } from "./stores/userStore/UserStore";

/* LIBRARIES */
import PrimeVue from 'primevue/config';
import '@/main.ts'

/* CINFIGS */
import PrimeConf from '@/conf/prime.config'
import '@/primevue.scss';

/* STYLES */
import './style.scss'
import './style.css'
import { i18n } from "./conf/i18n.config";

const pinia = createPinia()
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(i18n)
    .use(pinia)
    .use(router)
    .use(PrimeVue, PrimeConf)
    .mount('#app')