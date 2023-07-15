<template>
  <div
    class="
      w-11/12
      sm:w-9/12
      md:w-8/12
      lg:w-6/12
      min-h-[780px]
      mx-auto
      relative
      max-w-5xl
      pt-4
    "
  >
    <div class="absolute mt-48">
      <h1
        class="
          font-bioRhyme
          text-5xl
          font-bold
          select-none
          w-2/3
          sm:w-9/12
          md:w-10/12
          lg:w-full
        "
      >
        Premium Clothes<br />
        For Cool Prices
      </h1>
      <h1
        class="
          font-bioRhyme
          text-5xl
          font-bold
          text-transparent
          absolute
          top-0
          z-[2]
          w-2/3
          sm:w-9/12
          md:w-10/12
          lg:w-full
        "
        style="-webkit-text-stroke: 1px black"
      >
        Premium Clothes<br />
        For Cool Prices
      </h1>
      <PopInButton val="Shop Now" path="/shop" />
      <p
        class="
          font-bioRhyme
          mt-6
          absolute
          -bottom-52
          sm:bottom-auto
          w-full
          sm:w-1/2
        "
      >
        Vince is an egyptian clothing startup with a goal to break into the
        world of buisness presenting a great deal for every purchase.
      </p>
    </div>
    <transition appear name="fade">
      <img
        src="/main.webp"
        alt="homePic"
        class="
          w-60
          sm:w-80
          absolute
          left-auto
          right-0
          lg:left-1/2
          mt-40
          sm:mt-32
          z-[1]
          shadow-xl
        "
      />
    </transition>
  </div>

  <div class="px-5 py-12">
    <div class="grid md:grid-cols-2 grid-cols-1 gap-y-2">
      <div class="relative">
        <a href="/shop/summer-21">
          <div
            class="
              bg-black/0
              w-full
              h-full
              absolute
              top-0
              left-0
              hover:bg-black/5
              transition-colors
            "
          ></div>
          <img src="/3756793.png" class="select-none" />
        </a>
      </div>
      <div class="relative">
        <a href="/shop/winter-21">
          <div
            class="
              bg-black/0
              w-full
              h-full
              absolute
              top-0
              left-0
              hover:bg-black/5
              transition-colors
            "
          ></div>
          <img src="/4589890.png" class="select-none" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
let router = useRouter()
import PopInButton from '../components/PopInButton.vue'
</script>
