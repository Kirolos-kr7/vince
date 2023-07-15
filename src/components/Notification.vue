<template>
  <transition name="fade">
    <div
      v-if="val !== ''"
      class="
        err
        transition-all
        fixed
        bottom-3
        left-1/2
        -translate-x-1/2
        z-50
        bg-[#e5e1dc]
        border border-gray-400
        min-w-[90%]
        sm:min-w-[auto]
        max-w-prose
        px-3
        py-2
        overflow-hidden
      "
    >
      <svg
        v-if="state === 'err'"
        class="
          w-11/12
          h-11/12
          opacity-30
          z-0
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2 -translate-y-1/2
        "
        fill="#f00"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>

      <svg
        v-else
        class="
          w-11/12
          h-11/12
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2 -translate-y-1/2
          opacity-50
          z-0
          text-green-500
        "
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="relative z-10">
        {{ val }}
      </span>
    </div>
  </transition>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { store } from '../store'

let val = computed(() => {
  return store.state.message
})

let state = computed(() => {
  return store.state.state
})
</script>
