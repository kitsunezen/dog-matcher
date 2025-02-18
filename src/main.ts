import './assets/reset.css'
import './assets/main.css'
// import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
// const vuetify = createVuetify({
//   components,
//   directives,
// })
// import vuetify from './plugins/vuetify';

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(vuetify)

app.mount('#app')
