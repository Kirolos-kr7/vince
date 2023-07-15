<template>
  <div class="flex flex-col my-8" v-if="isLoaded">
    <div class="block min-w-[250px] m-3" v-if="totalProducts > 0">
      <div
        class="flex flex-wrap justify-between gap-x-5 sm:px-5 items-baseline"
      >
        <div class="flex gap-x-2 items-center">
          <select
            v-model="sortBy"
            @change="reSort($event)"
            class="outline-none px-1 py-0.5 bg-transparent font-bioRhyme"
          >
            <option value="name/asc">Relevance</option>
            <option value="upDate/desc">Newest</option>
            <option value="price/asc">Price L to H</option>
            <option value="price/desc">Price H to L</option>
          </select>
        </div>
        <span class="font-bioRhyme">{{
          fetched + ' from ' + totalProducts
        }}</span>
      </div>
    </div>
    <span
      class="h-px w-1/3 mx-auto bg-gray-300 sm:hidden"
      v-if="totalProducts > 0"
    ></span>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:px-5">
      <template v-for="product in products" :key="product.ID">
        <Product :product="product" />
      </template>
    </div>
    <div
      v-if="fetched === totalProducts && products.length > 0 && isLoaded"
      class="mx-auto mt-8 font-medium"
    >
      No More Products
    </div>

    <PopInButton
      v-if="fetched !== totalProducts && isLoaded"
      @click="emits('fetchMoreData')"
      val="More Products"
      :isDark="true"
      class="!mt-8 mx-auto !px-16 xs:!px-28"
    />
  </div>
  <div v-else class="my-48">
    <Loader />
  </div>
  <transition name="fade">
    <div class="my-40" v-if="isLoaded && products.length == 0">
      <NF />
    </div>
  </transition>
</template>

<script setup>
import Product from '../components/Product.vue'
import Loader from '../components/Loader.vue'
import NF from '../components/NF.vue'
import PopInButton from '../components/PopInButton.vue'

import { useRoute, useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

let props = defineProps(['products', 'isLoaded', 'totalProducts', 'fetched'])
let emits = defineEmits(['fetchData', 'fetchMoreData'])
let route = useRoute()
let router = useRouter()
let sortBy = ref()

onMounted(() => {
  let sort = route.query.sortBy
  let dir = route.query.dir

  if (sort === 'upDate' && dir === 'desc') {
    sortBy.value = 'upDate/desc'
  } else if (sort === 'price' && dir === 'asc') {
    sortBy.value = 'price/asc'
  } else if (sort === 'price' && dir === 'desc') {
    sortBy.value = 'price/desc'
  } else {
    sortBy.value = 'name/asc'
  }
})

const reSort = (e) => {
  let val = e.target.value,
    currRoute = route.path
  sortBy.value = val

  let url = new URL(window.location)

  if (val === 'name/asc') {
    url.searchParams.delete('sortBy')
    url.searchParams.delete('dir')
    router.push(currRoute + url.search)
  } else if (val === 'upDate/desc') {
    url.searchParams.set('sortBy', 'upDate')
    url.searchParams.set('dir', 'desc')
    router.push(currRoute + url.search)
  } else if (val === 'price/asc') {
    url.searchParams.set('sortBy', 'price')
    url.searchParams.delete('dir')
    router.push(currRoute + url.search)
  } else if (val === 'price/desc') {
    url.searchParams.set('sortBy', 'price')
    url.searchParams.set('dir', 'desc')
    router.push(currRoute + url.search)
  }
}
</script>
