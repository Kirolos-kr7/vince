import { createApp } from 'vue'
import App from './App.vue'
import { auth } from './firebase'
import router from './router'
import { store } from './store'
import '../tailwind.css'

store.commit('getUser')
auth.onAuthStateChanged((user) => {
  if (user) {
    let userObj = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }
    store.commit('setUser', userObj)
  }
})

createApp(App).use(router, store).mount('#app')
