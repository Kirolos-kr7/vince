<template>
  <div class="relative mb-8 px-5 pt-32">
    <span class="font-medium tracking-[0.3rem] text-sm text-gray-400"
      >ORDER</span
    >
    <div class="text-4xl relative break-all auto">
      <h2 class="font-bioRhyme z-10 relative">
        {{ '#' + route.params.id }}
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
        {{ '#' + route.params.id }}
      </h2>
    </div>
  </div>
  <div class="mt-8 mx-auto" v-if="isLoaded">
    <div v-if="isThere">
      <div class="px-5 py-3">
        <h2 class="font-bioRhyme font-semibold text-2xl mb-3">Order Details</h2>
        <div
          class="
            grid
            gap-x-3 gap-y-0.5
            grid-cols-[auto,1fr]
            items-baseline
            mx-auto
          "
        >
          <div class="min-w-max font-semibold">Deliver To</div>
          <div class="break-all text-gray-500">
            {{
              `${order.address.buildingNumber}  ${order.address.street}, ${order.address.area}, ${order.address.city}  ${order.address.floor} | ${order.address.flat}`
            }}
          </div>
          <div class="min-w-max font-semibold">Payment Method</div>
          <div class="break-all text-gray-500">
            {{
              order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Credit Card'
            }}
          </div>
          <div class="min-w-max font-semibold">Ordered On</div>
          <div class="break-all text-gray-500">
            {{ order.date.toDate().toDateString() }}
          </div>
          <div class="min-w-max font-semibold">Total Price</div>
          <div class="break-all text-gray-500">
            {{ order.price + order.shipping }}
          </div>
          <div class="min-w-max font-semibold">Status</div>
          <span
            class="px-1.5 py-0.5 text-sm max-w-min whitespace-nowrap"
            :class="
              order.status === 'On Delivery'
                ? 'bg-indigo-400/40'
                : order.status === 'Confirmed'
                ? 'bg-green-400/40 '
                : order.status === 'Delivered'
                ? 'bg-gray-400/40'
                : order.status === 'Pending'
                ? 'bg-red-400/40'
                : 'bg-black/40'
            "
          >
            {{ order.status }}
          </span>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
        <div
          class="
            flex
            items-center
            gap-3
            px-3
            py-3
            border border-gray-300 border-l-0 border-r-0
            md:border-l md:border-r
          "
          v-for="product in order.products"
          :key="product.ID"
        >
          <img :src="product.product.images[0]" class="w-24" />
          <div class="flex flex-col">
            <h4 class="text-xs font-normal text-gray-500 mb-0.5">
              {{ product.product.brand }}
            </h4>
            <router-link
              :to="`/p/${product.product.ID}`"
              class="
                text-xl
                font-semibold
                mb-1
                !text-black
                hover:!text-green-600
                block
                transition
                uppercase
              "
              >{{
                product.product.name + ' - ' + product.product.color
              }}</router-link
            >

            <h5 class="font-semibold text-base">
              {{ `EGP ${product.product.price * product.quantity}` }}
              <span
                v-if="product.quantity > 1"
                class="text-gray-400 text-sm font-normal"
                >{{ `${product.product.price} each` }}</span
              >
            </h5>
            <div class="flex gap-2 items-center font-medium">
              <span
                class="
                  border border-gray-500
                  px-1
                  py-0.5
                  transition
                  uppercase
                  text-xs
                  font-medium
                  bg-[#82817d80]
                "
                >{{ product.quantity }}</span
              >
              <span>x</span>
              <span
                class="
                  border border-gray-500
                  px-1
                  py-0.5
                  transition
                  uppercase
                  text-xs
                  font-medium
                  bg-[#82817d80]
                "
                >{{ product.size }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="px-5 mt-2 mb-12">
        <PopInButton
          val="Cancel Order"
          @click="cancelOrder"
          v-if="order.status === 'Pending' || order.status === 'Confirmed'"
        />
        <PopInButton val="Re Order" @click="reOrder" v-else />
      </div>
    </div>
    <div v-else class="mx-5 -mt-5 font-bioRhyme">Cannot find your order</div>
  </div>
  <div v-else class="mt-44">
    <Loader />
  </div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { db, timestamp } from '../firebase'
import Loader from '../components/Loader.vue'
import Product from '../components/Product.vue'
import PopInButton from '../components/PopInButton.vue'

const route = useRoute(),
  router = useRouter(),
  dbRef = db.collection('orders').doc(route.params.id),
  newDbRef = db.collection('orders').doc()

let order = ref(),
  isLoaded = ref(false),
  isThere = ref(false)

const getOrder = async () => {
  try {
    let res = await dbRef.get()
    order.value = res.data()
    res.exists ? (isThere.value = true) : (isThere.value = false)
    isLoaded.value = true
  } catch (err) {
    console.log(err)
    isLoaded.value = false
  }
}

onMounted(() => {
  getOrder()
})

const cancelOrder = async () => {
  try {
    isLoaded.value = false
    let res = await dbRef.update({
      status: 'Canceled',
    })
    getOrder()
  } catch (err) {
    console.log(err)
  }
}

const reOrder = () => {
  let bag = []
  order.value.products.forEach((x) => {
    let cartItem = {
      ID: x.product.ID,
      quantity: x.quantity,
      size: x.size,
    }
    bag.push(cartItem)
  })

  localStorage.setItem('bag', JSON.stringify(bag))
  router.push('/bag')
}
</script>
