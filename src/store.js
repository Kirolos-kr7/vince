import { useRouter } from 'vue-router'
import { createStore } from 'vuex'
import { auth } from './firebase'

export const store = createStore({
  state() {
    return {
      user: undefined,
      message: '',
      state: '',
    }
  },
  mutations: {
    async getUser(state) {
      if (
        localStorage.getItem('user') !== null &&
        localStorage.getItem('user') !== undefined &&
        localStorage.getItem('user') !== ''
      ) {
        state.user = await JSON.parse(localStorage.getItem('user'))
      }
    },
    setUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    showMsg(state, obj) {
      if (obj.m != '') {
        state.message = obj.m
        state.state = obj.s
        setTimeout(() => {
          state.message = ''
          state.state = ''
        }, 2200)
      }
    },
    logOut() {
      store.commit('setUser', null)
      auth.signOut()
    },
  },
})
