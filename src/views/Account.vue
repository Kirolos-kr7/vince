<template>
  <div class="relative mb-8 px-5 pt-32">
    <Vtitle text="Account" />
    <div v-if="isLoaded">
      <div v-if="!isAuthenticated">
        <span class="font-bioRhyme mt-2 block"> You are not logged in yet</span>

        <button class="btn !mt-6" @click="continueWithGoogle">
          <img src="/google_icon-icons.com_65494.svg" class="w-8 h-8 p-0.5" />
          Continue with Google
        </button>

        <div class="mt-9 relative">
          <span class="w-full border-t border-gray-300 block"></span>
          <span
            class="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2 -translate-y-1/2
              bg-primary
              px-2
              py-1
            "
            >OR</span
          >
        </div>

        <h3 class="font-bioRhyme text-lg mt-8">
          {{ !isNew ? 'Log In' : 'Sign In' }}
        </h3>

        <Signin v-if="isNew" @login="isNew = false" @updateUser="updateUser" />
        <Login v-else @signin="isNew = true" @updateUser="updateUser" />
      </div>
      <div v-else>
        <span class="font-bioRhyme mt-2 block">{{ getTimeOfDay }}</span>

        <div class="mt-8 flex flex-col sm:items-baseline">
          <PopInButton :val="'Settings'" path="/account/settings" />
          <PopInButton :val="'My Orders'" path="/account/orders" />
          <PopInButton :val="'Log Out'" @click="logout" />
        </div>
      </div>
    </div>
    <div v-else class="my-48">
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { auth, db, gProvier, getCurrentUser } from '../firebase'
import { store } from '../store'
import { useRouter } from 'vue-router'
import Login from '../components/Login.vue'
import Loader from '../components/Loader.vue'
import Signin from '../components/Signin.vue'
import Vtitle from '../components/Vtitle.vue'
import PopInButton from '../components/PopInButton.vue'

let isNew = ref(false),
  isLoaded = ref(false),
  isAuthenticated = ref(),
  router = useRouter()

onMounted(async () => {
  isAuthenticated.value = await getCurrentUser()
  auth.onAuthStateChanged((user) => {
    isAuthenticated.value = user
  })
  isLoaded.value = true
})

const continueWithGoogle = () => {
  auth
    .signInWithPopup(gProvier)
    .then((u) => {
      if (u.additionalUserInfo.isNewUser) {
        db.collection('users').doc(u.user.uid).set({
          uid: u.user.uid,
          userName: u.additionalUserInfo.profile.name,
          firstName: u.additionalUserInfo.profile.given_name,
          email: u.additionalUserInfo.profile.email,
          image: u.additionalUserInfo.profile.picture,
          phone: null,
          location: null,
        })
      }
    })
    .catch((err) => console.log(err))
}

const logout = async () => {
  auth.signOut()
  store.commit('logOut')
}

const getTimeOfDay = computed(() => {
  let hours = new Date().getHours(),
    userName =
      store.state.user?.displayName || isAuthenticated.value.displayName

  if (hours < 6) {
    return 'Good Evining ' + userName
  } else if (hours < 12) {
    return 'Good Morning ' + userName
  } else if (hours < 18) {
    return 'Good Afternoon ' + userName
  } else {
    return 'Good Evining ' + userName
  }
})

const updateUser = async () => {
  store.commit('getUser')
}
</script>
