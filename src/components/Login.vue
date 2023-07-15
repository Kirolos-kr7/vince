<template>
  <form @submit.prevent="">
    <div class="relative">
      <input
        type="text"
        class="inputField peer"
        placeholder="E-Mail"
        v-model="email"
      />
      <label class="labelInput">E-Mail</label>
    </div>
    <div class="relative">
      <input
        type="text"
        class="inputField peer"
        placeholder="Password"
        v-model="password"
      />
      <label class="labelInput">Password</label>
    </div>
    <span
      class="block mt-2 cursor-pointer py-2 font-medium text-gray-600 text-sm"
      @click="$emit('signin')"
    >
      New Here ?
    </span>
    <PopInButton val="Log In" @click.="logIn" />
  </form>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { auth } from '../firebase'
import PopInButton from '../components/PopInButton.vue'
import { store } from '../store'

let emit = defineEmits(['signin', 'updateUser']),
  email = ref(''),
  password = ref(''),
  E_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  PW_REGEX = /^[A-Za-z0-9]\w{7,}$/,
  err = ref('')

const logIn = () => {
  if (isValid()) {
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        emit('updateUser')
      })
      .catch((err) => console.log(err))
  }
}

const isValid = () => {
  if (!email.value.match(E_REGEX)) {
    showMsg('E-mail is not valid')
    return false
  }
  if (!password.value.match(PW_REGEX)) {
    showMsg('Password is not valid (minimum 7 characters)')
    return false
  }
  err.value = ''
  return true
}

const showMsg = (m, s = 'err') => {
  let obj = { m, s }
  store.commit('showMsg', obj)
}
</script>
