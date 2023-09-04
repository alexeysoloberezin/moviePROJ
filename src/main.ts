import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/css/styles.scss'

import App from './App.vue'
import router from './router'

import initPrimeComponents from "@/plugins/vueprime";
import initToast from "@/plugins/toast";
import {auth, firestore} from "@/plugins/filrebase";
import {initStripe} from "@/plugins/stripe";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$auth = auth;
app.config.globalProperties.$firestore = firestore;
initPrimeComponents(app)
initToast(app)
// initStripe(app)
app.mount('#app')
