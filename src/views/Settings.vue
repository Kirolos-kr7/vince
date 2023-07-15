<template>
  <div class="relative mb-8 px-5 pt-32">
    <Vtitle text="Settings" />
    <div v-if="isLoaded">
      <form @submit.prevent="updateUserData" class="mt-8">
        <div class="relative">
          <input
            type="text"
            class="inputField peer"
            placeholder="Full Name"
            v-model="userData.userName"
          />
          <label class="labelInput">Full Name</label>
        </div>
        <PopInButton val="Update" class="!mt-4" />
      </form>
    </div>
    <div v-else class="my-48">
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { auth, db } from '../firebase'
import { store } from '../store'
import Loader from '../components/Loader.vue'
import PopInButton from '../components/PopInButton.vue'
import Vtitle from '../components/Vtitle.vue'

let isLoaded = ref(false),
  userData = ref(),
  dbRef = db.collection('users').doc(store.state.user.uid)

const getUserData = async () => {
  try {
    let res = await dbRef.get()
    userData.value = res.data()
    isLoaded.value = true
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getUserData()
})

const updateUserData = async () => {
  isLoaded.value = false
  await dbRef.update({
    userName: userData.value.userName,
    email: userData.value.email,
  })
  await auth.currentUser.updateProfile({
    displayName: userData.value.userName,
  })

  store.commit('setUser', {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  isLoaded.value = true
}
</script>
