import { createApp } from 'vue'
import { initStore } from './store'
import { initRouter } from './router'
import App from './App.vue'

import 'popper.js'
import 'bootstrap'
import '@/assets/scss/index.scss'

initStore().then((store) => {
  const router = initRouter(store)

  createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
})


