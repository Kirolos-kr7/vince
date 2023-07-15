<template>
  <div
    class="border-t border-transparent md:border-gray-400 py-4"
    v-if="products.length > 0"
  >
    <h2 class="text-3xl font-semibold font-bioRhyme mx-5 mb-3">
      More Products
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:px-5">
      <template v-for="product in products" :key="product.ID">
        <Product :product="product" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import Product from '../components/Product.vue'
import { db } from '../firebase'
let props = defineProps(['product'])
let allProducts = ref([])
let products = ref([])

const getRelatedProducts = () => {
  allProducts.value.forEach((product) => {
    if (product.ID !== props.product.ID) {
      if (products.value.length < 4) {
        if (props.product.name.includes(product.name)) {
          products.value.push(product)
        }
      }
    }
  })
}

db.collection('products')
  .get()
  .then((res) => {
    res.forEach((product) => {
      allProducts.value.push(product.data())
    })
  })
  .then(() => {
    getRelatedProducts()
  })
  .catch((err) => console.log(err))
</script>
