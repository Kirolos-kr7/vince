<template>
  <div class="relative mb-8 px-5 pt-32">
    <VTitle text="FAQs" />
  </div>

  <div class="mb-8 mt-14">
    <transition-group>
      <div
        v-for="dd in dds"
        :key="dd"
        class="
          px-5
          py-3
          border-t border-gray-300
          last-of-type:border-b
          hover:bg-green-100/50
          transition
        "
        :class="dd.s ? 'bg-green-100/50' : ''"
        @click="toggle(dd)"
      >
        <div class="flex items-center justify-between gap-x-5">
          <h3 class="font-medium">
            {{ dd.q }}
          </h3>
          <svg
            class="min-w-[1.5rem] min-h-[1.5rem] h-6 w-6 transition-all"
            :class="dd.s ? '-rotate-90' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </div>
        <div v-if="dd.s" class="mt-3 text-gray-500">
          {{ dd.a }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import VTitle from '../components/Vtitle.vue'

let dds = ref([
  {
    q: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nostrum quos quod dolorem molestiae minus veritatis illo aliquid idassumenda?',
    s: false,
  },
  {
    q: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nostrum quos quod dolorem molestiae minus veritatis illo aliquid idassumenda?',
    s: false,
  },
  {
    q: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nostrum quos quod dolorem molestiae minus veritatis illo aliquid idassumenda?',
    s: false,
  },
  {
    q: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nostrum quos quod dolorem molestiae minus veritatis illo aliquid idassumenda?',
    s: false,
  },
])

const toggle = (t) => {
  dds.value.forEach((dd) => {
    if (dd === t) {
      dd.s = !dd.s
    } else {
      dd.s = false
    }
  })
}
</script>
