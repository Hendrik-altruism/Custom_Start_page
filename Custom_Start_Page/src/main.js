import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { openDB } from './assets/indexedDB'

const app = createApp(App)

app.use(router)

app.mount('#app')

window.onload = openDB;
