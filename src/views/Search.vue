<template>
  <div class="relative mb-8 px-5 pt-32">
    <div class="text-5xl relative break-all">
      <h2 class="font-bioRhyme z-10 relative">
        Search {{ route.query.q ? 'for ' : '' }}
        <div class="font-bioRhyme break-all inline-block">
          {{ route.query.q ? route.query.q : '' }}
        </div>
      </h2>
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
        Search {{ route.query.q ? 'for ' : '' }}
        <div class="font-bioRhyme break-all inline-block">
          {{ route.query.q ? route.query.q : '' }}
        </div>
      </h2>
    </div>
    <input
      type="text"
      class="inputField !mt-6 !placeholder-gray-400"
      placeholder="Search brand, size, color or whatever you want"
      @keyup.enter="search"
      v-model="searchValue"
    />
  </div>
  <Products
    :products="products"
    :isLoaded="isLoaded"
    :totalProducts="totalProducts"
    :fetched="fetched"
    @fetchMoreData="fetchMoreData"
    @fetchData="fetchData"
  />
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../firebase'

import Products from '../components/Products.vue'

let allProducts = ref([]),
  filteredProducts = ref([]),
  products = ref([]),
  sortBy = ref(),
  route = useRoute(),
  router = useRouter(),
  stoppedAt = ref({}),
  totalProducts = ref(0),
  fetched = ref(0),
  isLoaded = ref(false),
  searchValue = ref(''),
  limit = ref(2)

let SortItOut = () => {
  let sort = route.query.sortBy
  let dir = route.query.dir

  if (sort === 'upDate' && dir === 'desc') {
    sortBy.value = 'upDate/desc'
  } else if (sort === 'price' && dir === 'desc') {
    sortBy.value = 'price/desc'
  } else if (sort === 'price') {
    sortBy.value = 'price/asc'
  } else {
    sortBy.value = 'name/asc'
  }
}

const fetchData = () => {
  isLoaded.value = false
  allProducts.value = []
  filteredProducts.value = []
  products.value = []
  stoppedAt.value = {}
  fetched.value = 0
  totalProducts.value = 0
  limit.value = 2

  let sortDir = sortBy.value.split('/')

  db.collection('products')
    .orderBy(sortDir[0], sortDir[1])
    .get()
    .then((res) => {
      res.forEach((product) => {
        allProducts.value.push(product.data())
      })
      getProducts()
    })
    .catch((err) => console.log(err))
}

const getProducts = () => {
  allProducts.value.forEach((product) => {
    if (searchValue.value === '') {
      filteredProducts.value.push(product)
      if (products.value.length < limit.value) {
        products.value.push(product)
        fetched.value += 1
        totalProducts.value = allProducts.value.length
      }
    } else {
      if (
        product.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        product.color.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchValue.value.toLowerCase()) ||
        product.sizes.includes(searchValue.value.toLowerCase())
      ) {
        filteredProducts.value.push(product)
        if (products.value.length < limit.value) {
          products.value.push(product)
          fetched.value += 1
        }
        totalProducts.value += 1
      }
    }
    fetched.value = products.value.length
    isLoaded.value = true
  })
}

onMounted(() => {
  searchValue.value = route.query.q || ''
  SortItOut()
  fetchData()
})

const fetchMoreData = () => {
  limit.value += 2
  filteredProducts.value.forEach((product) => {
    if (!products.value.includes(product)) {
      if (products.value.length < limit.value) {
        products.value.push(product)
        fetched.value += 1
      }
    }
  })
}

const search = () => {
  let url = new URL(window.location.href)
  url.searchParams.set('q', searchValue.value)
  router.push(url.toString())
}

watch(route, () => {
  SortItOut()
  fetchData()
})
</script>
