<template>
  <div class="text-5xl relative">
    <h2 class="font-bioRhyme z-10 relative">{{ text }}</h2>
    <h2
      class="
        font-bioRhyme
        text-transparent
        absolute
        top-1
        translate-x-2
        select-none
        z-0
      "
      style="-webkit-text-stroke: 1px #d7d7d7"
    >
      {{ text }}
    </h2>
  </div>
</template>

<script setup>
const props = defineProps({
  text: { type: String, required: true },
})
</script>
