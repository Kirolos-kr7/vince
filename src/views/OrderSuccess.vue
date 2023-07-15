<template>
  <div class="relative mb-8 px-5 pt-32">
    <span class="font-medium tracking-[0.3rem] text-sm text-gray-400"
      >ORDERED SUCCESSFULLY</span
    >
    <Vtitle :text="'#' + route.params.id" />
  </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import Vtitle from '../components/Vtitle.vue'

const route = useRoute()
const orderExists = useRoute()

const order = async (userData, products, price) => {
  await orderRef
    .set({
      userName: userData.userName,
      email: userData.email,
      uid: userData.uid,
      ID: orderRef.id,
      products: products,
      date: timestamp.now(),
      paymentMethod: 'cc',
      status: 'Pending',
      address: userData.location,
      price: price,
      shipping: 50,
    })
    .then(() => {
      console.log('Ordered Successfully')
    })
    .catch((err) => console.log(err))
}

onMounted(() => {
  db.collection('orders')
    .doc(route.params.id)
    .get()
    .then((res) => {
      console.log(res.exists)
      console.log(window.location.origin)
    })
    .catch((err) => console.log(err))
})
</script>
