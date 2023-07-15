<template>
  <nav
    class="
      flex
      items-center
      justify-between
      py-8
      px-5
      fixed
      top-0
      w-full
      z-30
      max-w-[106rem]
    "
  >
    <div class="flex items-center gap-x-3">
      <button
        class="hover:!text-green-600 transition font-bioRhyme sm:hidden"
        @click="toggleMnu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
            :d="mnu ? 'M6 18L18 6M6 6l12 12' : 'M4 8h16M4 16h16'"
          ></path>
        </svg>
      </button>
      <router-link
        to="/"
        class="
          font-bioRhyme font-medium
          !text-black
          hover:!text-green-600
          transition
          text-[1.65rem]
          ls
          tracking-widest
        "
        @click="toggleMnu('hide')"
      >
        VINCE.
      </router-link>
    </div>
    <ul class="hidden gap-x-5 text-sm sm:flex">
      <li>
        <router-link
          class="
            !text-black
            font-medium
            hover:!text-green-600
            transition
            font-bioRhyme
          "
          to="/shop"
          @click="toggleMnu('hide')"
          >Shop</router-link
        >
      </li>
      <li>
        <router-link
          class="
            !text-black
            font-medium
            hover:!text-green-600
            transition
            font-bioRhyme
          "
          to="/shop/new-arrivals"
          @click="toggleMnu('hide')"
          >New Arrivals</router-link
        >
      </li>
      <li>
        <router-link
          class="
            !text-black
            font-medium
            hover:!text-green-600
            transition
            font-bioRhyme
          "
          to="/shop/women's-wear"
          @click="toggleMnu('hide')"
          >Women</router-link
        >
      </li>
      <li>
        <router-link
          class="
            !text-black
            font-medium
            hover:!text-green-600
            transition
            font-bioRhyme
          "
          to="/shop/men's-wear"
          @click="toggleMnu('hide')"
          >Men</router-link
        >
      </li>
    </ul>
    <ul class="flex gap-x-3">
      <li class="font-bioRhyme">
        <router-link
          class="hover:!text-green-600 p-0.5 transition block !text-black"
          to="/s"
          @click="toggleMnu('hide')"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </router-link>
      </li>
      <li class="font-bioRhyme">
        <router-link
          class="hover:!text-green-600 p-0.5 transition block !text-black"
          to="/bag"
          @click="toggleMnu('hide')"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </router-link>
      </li>
      <li class="font-bioRhyme">
        <router-link
          class="hover:!text-green-600 p-0.5 transition block !text-black"
          to="/account"
          @click="toggleMnu('hide')"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        </router-link>
      </li>
      <li class="font-medium">
        <div
          class="
            hover:!text-green-600
            p-0.5
            transition
            block
            !text-black
            select-none
            cursor-pointer
          "
          @click="changeLanguage"
        >
          {{ lg }}
        </div>
      </li>
    </ul>
  </nav>

  <transition name="fade">
    <div
      class="
        mnu
        fixed
        bg-[#e8e5e5]
        z-40
        top-[103px]
        w-full
        px-8
        max-h-[calc(100vh-103px)]
        h-[calc(100vh-103px)]
      "
      v-if="mnu"
    >
      <ul class="gap-y-10 text-sm flex flex-col mt-20">
        <li>
          <router-link
            class="
              !text-black
              font-semibold
              text-4xl
              hover:!text-green-600
              transition
              font-bioRhyme
            "
            to="/shop"
            @click="toggleMnu('hide')"
            >Shop</router-link
          >
        </li>
        <li>
          <router-link
            class="
              !text-black
              font-semibold
              text-4xl
              hover:!text-green-600
              transition
              font-bioRhyme
            "
            to="/shop/new-arrivals"
            @click="toggleMnu('hide')"
            >New Arrivals</router-link
          >
        </li>
        <li>
          <router-link
            class="
              !text-black
              font-semibold
              text-4xl
              hover:!text-green-600
              transition
              font-bioRhyme
            "
            to="/shop/women's-wear"
            @click="toggleMnu('hide')"
            >Women</router-link
          >
        </li>
        <li>
          <router-link
            class="
              !text-black
              font-semibold
              text-4xl
              hover:!text-green-600
              transition
              font-bioRhyme
            "
            to="/shop/men's-wear"
            @click="toggleMnu('hide')"
            >Men</router-link
          >
        </li>
      </ul>
      <div class="newsletter mt-12">
        <p class="text-gray-500 text-sm">
          Stay up to date with our newest of all
        </p>
        <form @submit.prevent="" class="flex items-baseline">
          <input
            type="text"
            class="inputField !placeholder-gray-400 !border-r-0"
            placeholder="Leave us your email"
            v-model="email"
          />
          <button
            class="
              px-3
              py-2.5
              font-semibold
              border border-solid border-black
              whitespace-nowrap
              transition
              text-sm
              z-[2]
              relative
              bg-[#ddd]
              hover:shadow-xx
            "
            @click="addToNewsletter"
          >
            Notify ME
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { db } from '../firebase'
import { store } from '../store'

let mnu = ref(false)

onMounted(async () => {
  let request = await fetch(
    'https://ipinfo.io/41.129.113.208?token=2aaf1bc4c117a1',
  )
  let res = await request.json()
  console.log(res)
  lg.value = localStorage.getItem('lg') || 'EN'
})

let toggleMnu = (e) => {
  if (e === 'hide') {
    mnu.value = false
    document.body.style.overflow = 'auto'
  } else {
    if (mnu.value === false) {
      mnu.value = true
      document.body.style.overflow = 'hidden'
    } else {
      mnu.value = false
      document.body.style.overflow = 'auto'
    }
  }
}

window.onresize = () => {
  if (window.innerWidth > 640) {
    mnu.value = false
    document.body.style.overflow = 'auto'
  }
}

let email = ref(''),
  msg = ref(''),
  state = ref(''),
  lg = ref('EN')

const addToNewsletter = () => {
  if (
    email.value.match(
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    )
  ) {
    db.collection('newsletter')
      .doc(email.value)
      .set({})
      .then(() => {
        email.value = ''
        showMsg('Added Successfully', 'success')
      })
      .catch((err) => showMsg(err, 'err'))
  } else {
    showMsg('E-mail is not valid')
  }
}

const showMsg = (m, s = 'err') => {
  let obj = { m, s }
  store.commit('showMsg', obj)
}

const changeLanguage = (e) => {
  if (lg.value === 'AR') {
    localStorage.setItem('lg', 'EN')
    lg.value = 'EN'
  } else {
    localStorage.setItem('lg', 'AR')
    lg.value = 'AR'
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
