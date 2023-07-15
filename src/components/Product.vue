<template>
  <div
    class="
      product
      sm:border-0
      border
      p-3
      border-gray-300
      odd:border-t-0 odd:border-l-0
      even:border-r-0 even:border-l-0 even:border-t-0
    "
  >
    <div class="relative mb-3">
      <div v-show="!isImgLoaded" class="w-full min-w-full min-h-[250px]">
        <span
          class="
            font-megrim
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2 -translate-y-1/2
            text-5xl
            animate-pulse
          "
          :style="!isImgLoaded ? 'animation-duration: 1.2s' : ''"
          >V.</span
        >
      </div>

      <transition name="fade">
        <div v-show="isImgLoaded" class="bg-black">
          <router-link :to="`/p/${product.ID}`">
            <img
              :src="product.images[0]"
              :alt="product.name + 'image'"
              class="w-full h-auto mx-auto hover:opacity-90 transition-opacity"
              @load="imgLoaded"
            />
          </router-link>
        </div>
      </transition>
      <span
        v-if="
          (new Date() - props.product.upDate.toDate()) / 3600 / 1000 / 30 <
            30 &&
          product.images.length > 0 &&
          isImgLoaded
        "
        class="
          absolute
          top-0
          left-0
          px-1
          py-0.5
          bg-black
          text-[#ddd] text-xs
          font-bioRhyme font-medium
        "
        >NEW</span
      >
    </div>
    <h4 class="text-sm font-normal text-gray-500 -mb-1">
      {{ product.brand }}
    </h4>
    <router-link
      :to="`/p/${product.ID}`"
      class="
        text-xl
        font-semibold
        mb-1
        !text-black
        hover:!text-green-600
        block
        transition
        uppercase
      "
      >{{ product.name + ' - ' + product.color }}</router-link
    >
    <h5 class="font-semibold text-base my-2">{{ 'EGP ' + product.price }}</h5>

    <div
      class="
        sizes
        flex-wrap
        mt-0.5
        mb-1
        flex
        border border-gray-400
        w-[fit-content]
        divide-x divide-gray-400
      "
    >
      <button
        v-for="size in product.sizes"
        :key="size"
        class="px-2 py-1.5 transition uppercase text-xs font-medium"
        :class="selectedSize === size ? 'bg-[#82817d80] ' : ''"
        @click="selectedSize = size"
      >
        {{ size }}
      </button>
    </div>

    <PopInButton val="Add To Bag" @click="addToBag" />
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onMounted, onUnmounted } from '@vue/runtime-core'
import PopInButton from '../components/PopInButton.vue'

let props = defineProps(['product'])
let selectedSize = ref(props.product.sizes[0])
let isImgLoaded = ref(false)

const imgLoaded = () => {
  isImgLoaded.value = true
}

const addToBag = () => {
  let bag = [],
    isIn = false,
    isSameSize = false,
    cartItem = {},
    currIndex

  if (
    localStorage.getItem('bag') === null ||
    localStorage.getItem('bag') === undefined
  ) {
    bag = []
  } else {
    bag = JSON.parse(localStorage.getItem('bag'))
    bag.forEach((item, index) => {
      if (item.size === selectedSize.value) {
        isSameSize = true
        currIndex = index
        if (item.ID === props.product.ID) {
          isIn = true
          currIndex = index
        }
      }
    })
  }

  if (!isIn || !isSameSize) {
    cartItem = {
      ID: props.product.ID,
      quantity: 1,
      size: selectedSize.value,
    }
    bag.push(cartItem)
  } else {
    bag[currIndex].quantity += 1
  }

  localStorage.setItem('bag', JSON.stringify(bag))

  bag = []
  isIn = false
  cartItem = {}
  currIndex = null
}
</script>
