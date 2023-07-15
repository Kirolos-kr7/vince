<template>
  <div class="relative mb-8 px-5 pt-32">
    <span
      class="font-medium tracking-[0.3rem] text-sm text-gray-400 -mb-1 block"
      >COLLECTION</span
    >
    <Vtitle
      :text="route.params.collection.replaceAll('-', ' ').toLowerCase()"
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
import Loader from '../components/Loader.vue'
import NF from '../components/NF.vue'
import Vtitle from '../components/Vtitle.vue'

let products = ref([]),
  sortBy = ref(),
  route = useRoute(),
  stoppedAt = ref({}),
  totalProducts = ref(0),
  fetched = ref(0),
  isLoaded = ref(false)

const fetchData = () => {
  isLoaded.value = false
  products.value = []
  stoppedAt.value = {}
  fetched.value = 0

  let sortDir = sortBy.value.split('/')

  db.collection('products')
    .limit(2)
    .orderBy(sortDir[0], sortDir[1])
    .where(
      'collection',
      'array-contains',
      route.params.collection.replaceAll('-', ' ').toLowerCase(),
    )
    .get()
    .then((res) => {
      res.forEach((product) => {
        products.value.push(product.data())
      })
      fetched.value += res.docs.length
      stoppedAt.value = res.docs[res.docs.length - 1]
      isLoaded.value = true
    })
    .catch((err) => console.log(err))
}

const getProductsSize = () => {
  totalProducts.value = 0
  db.collection('products')
    .where(
      'collection',
      'array-contains',
      route.params.collection.replaceAll('-', ' ').toLowerCase(),
    )
    .get()
    .then((res) => {
      totalProducts.value = res.size
    })
    .catch((err) => console.log(err))
}

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

onMounted(() => {
  SortItOut()
  getProductsSize()
  fetchData()
})

const fetchMoreData = () => {
  let sortDir = sortBy.value.split('/')

  db.collection('products')
    .limit(2)
    .orderBy(sortDir[0], sortDir[1])
    .where(
      'collection',
      'array-contains',
      route.params.collection.replaceAll('-', ' ').toLowerCase(),
    )
    .startAfter(stoppedAt.value)
    .get()
    .then((res) => {
      res.forEach((product) => {
        products.value.push(product.data())
      })
      fetched.value += res.docs.length
      stoppedAt.value = res.docs[res.docs.length - 1]
    })
    .catch((err) => console.log(err))
}

watch(route, () => {
  if (route.params.collection) {
    SortItOut()
    getProductsSize()
    fetchData()
  }
})
</script>
