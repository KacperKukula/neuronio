import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
