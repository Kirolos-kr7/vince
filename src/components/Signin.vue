<template>
  <form @submit.prevent="">
    <div class="relative">
      <input
        type="text"
        class="inputField peer"
        placeholder="Username"
        v-model="userName"
      />
      <label class="labelInput">Username</label>
    </div>
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
    <div class="relative">
      <input
        type="text"
        class="inputField peer"
        placeholder="Reenter Password"
        v-model="password2"
      />
      <label class="labelInput">Reenter Password</label>
    </div>
    <span
      class="block mt-2 cursor-pointer py-2 font-medium text-gray-600 text-sm"
      @click="$emit('login')"
    >
      Already signed in ?
    </span>
    <PopInButton val="Sign In" @click.="signIn" />
  </form>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { computed, onMounted, watch } from '@vue/runtime-core'
import { auth } from '../firebase'
import PopInButton from '../components/PopInButton.vue'
import { store } from '../store'

let emit = defineEmits(['login', 'updateUser']),
  userName = ref(''),
  email = ref(''),
  password = ref(''),
  password2 = ref(''),
  UN_REGEX = /^[a-z0-9-_]{3,}$/,
  E_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  PW_REGEX = /^[A-Za-z0-9]\w{7,}$/

const signIn = () => {
  if (isValid()) {
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        user.user
          .updateProfile({
            displayName: userName.value,
          })
          .then(() => {
            emit('updateUser')
          })
      })
      .catch((err) => console.log(err))
  }
}

const isValid = () => {
  if (!userName.value.match(UN_REGEX)) {
    showMsg(
      'Username is not valid \nAtleast three characters (small, numbers, -, _)',
    )
    return false
  }
  if (!email.value.match(E_REGEX)) {
    showMsg('E-mail is not valid')
    return false
  }
  if (!password.value.match(PW_REGEX)) {
    showMsg('Password is not valid (minimum 7 characters)')
    return false
  }
  if (password.value !== password2.value) {
    showMsg('Passwords does not match')
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
