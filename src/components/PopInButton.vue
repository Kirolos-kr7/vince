<template>
  <router-link
    v-if="path"
    class="btn text-center"
    :class="isDark ? 'btnDark' : ''"
    :to="path"
    >{{ val }}</router-link
  >
  <button class="btn" :class="isDark ? 'btnDark' : ''" v-else>
    {{ val }}
  </button>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core'

let btns,
  props = defineProps(['val', 'path', 'isDark'])

onMounted(() => {
  btns = document.querySelectorAll('.btn')

  btns.forEach((btn) => {
    btn.addEventListener('mousedown', (e) => {
      e.target.classList.add('isReady')
    })
    btn.addEventListener('mouseup', (e) => {
      e.target.classList.remove('isReady')
    })
    btn.addEventListener('mouseleave', (e) => {
      e.target.classList.remove('isReady')
    })
    btn.addEventListener(
      'touchstart',
      (e) => {
        e.target.classList.add('isReady')
      },
      { passive: true },
    )
    btn.addEventListener(
      'touchend',
      (e) => {
        e.target.classList.remove('isReady')
      },
      { passive: true },
    )
    btn.addEventListener(
      'touchmove',
      (e) => {
        e.target.classList.remove('isReady')
      },
      { passive: true },
    )
  })
})

onMounted(() => {
  btns = document.querySelectorAll('.btn')

  btns.forEach((btn) => {
    btn.removeEventListener('mousedown', (e) => {
      e.target.classList.add('isReady')
    })
    btn.removeEventListener('mouseup', (e) => {
      e.target.classList.remove('isReady')
    })
    btn.removeEventListener('mouseleave', (e) => {
      e.target.classList.remove('isReady')
    })
    btn.removeEventListener(
      'touchstart',
      (e) => {
        e.target.classList.add('isReady')
      },
      { passive: true },
    )
    btn.removeEventListener(
      'touchend',
      (e) => {
        e.target.classList.remove('isReady')
      },
      { passive: true },
    )

    btn.removeEventListener(
      'touchmove',
      (e) => {
        e.target.classList.remove('isReady')
      },
      { passive: true },
    )
  })
})
</script>
