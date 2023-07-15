<template>
  <footer
    class="!bg-cover"
    style="
      background: url('/circle-scatter-haikei.svg') center center no-repeat;
    "
    :class="bottomSpace ? 'mb-16' : ''"
  >
    <div class="p-5 border-b border-t border-gray-300">
      <h2 class="font-bioRhyme text-3xl font-semibold">Newsletter</h2>
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
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 my-2 p-5">
      <ul>
        <li class="text-gray-500 font-medium mb-1.5 uppercase">Categories</li>
        <li>
          <router-link
            class="block text-sm hover:text-gray-500 hover:font-medium"
            to="/shop/men's-wear"
            >Men's Wear</router-link
          >
        </li>
        <li>
          <router-link
            class="block text-sm hover:text-gray-500 hover:font-medium"
            to="/shop/women's-wear"
            >Women's Wear</router-link
          >
        </li>
      </ul>
      <ul>
        <li class="text-gray-500 font-medium mb-1.5 uppercase">Collections</li>
        <li>
          <router-link
            class="block text-sm hover:text-gray-500 hover:font-medium"
            to="/shop/summer-21"
            >Summer 21</router-link
          >
        </li>
        <li>
          <router-link
            class="block text-sm hover:text-gray-500 hover:font-medium"
            to="/shop/winter-21"
            >Winter 21</router-link
          >
        </li>
      </ul>

      <ul>
        <li class="text-gray-500 font-medium mb-1.5 uppercase">Website</li>
        <li>
          <router-link
            class="block text-sm hover:text-gray-500 hover:font-medium"
            to="/"
            >What is VINCE?</router-link
          >
        </li>
        <li>
          <router-link
            class="block text-sm hover:text-gray-500 hover:font-medium"
            to="/contact"
            >Contact us</router-link
          >
        </li>
        <li>
          <router-link
            class="block text-sm hover:text-gray-500 hover:font-medium"
            to="/faqs"
            >FAQs</router-link
          >
        </li>
      </ul>
    </div>
    <div class="font-bioRhyme mx-5 pb-5">
      Designed and Developed by
      <a
        href="https://kirolos.codes"
        class="font-semibold font-bioRhyme"
        target="_blank"
        >KIROLOS</a
      >
    </div>
  </footer>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { db } from '../firebase'
import { store } from '../store'
let router = useRouter()

let email = ref(''),
  msg = ref(''),
  state = ref(''),
  bottomSpace = ref(false)

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

onMounted(() => {
  if (router.currentRoute.value.path.split('/')[1] === 'p') {
    bottomSpace.value = true
  }
})
</script>
