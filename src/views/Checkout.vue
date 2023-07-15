<template>
  <div class="relative mb-8 px-5 pt-32">
    <div class="text-5xl relative">
      <h2 class="font-bioRhyme z-10 relative">Checkout</h2>
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
        Checkout
      </h2>
    </div>
    <div class="mt-2" v-if="isLoaded">
      <div v-if="bag.length < 1">
        <span class="font-bioRhyme">Bag is Empty</span>
        <PopInButton
          val="Continue Shopping"
          class="!block !mt-4 !mb-44"
          @click="router.push('/shop')"
        />
      </div>
      <span class="font-bioRhyme" v-else>
        {{
          bag.length > 0
            ? bag.length === 1
              ? '1 item'
              : `${bag.length} items`
            : 'Bag is Empty'
        }}</span
      >
    </div>
  </div>

  <div v-if="isLoaded">
    <div v-if="bag !== null && bag !== undefined && bag.length > 0">
      <!-- <div class="border-t border-gray-300 mt-8 mb-4"></div>
      <div class="mx-6">
        <h3 class="font-semibold text-lg font-bioRhyme">Payment Method</h3>
        <p class="text-gray-400 text-sm">Select a payment method</p>
        <div
          class="
            flex flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
            mt-5
          "
        >
          <div
            class="
              w-full
              sm:w-1/2
              text-center
              py-3
              px-4
              cursor-pointer
              hover:bg-black/[0.04]
              font-medium
              transition
              flex
              items-center
              justify-center
            "
            :class="
              selectedPM === 'cod'
                ? 'bg-black/[0.06] border border-dashed border-black'
                : ''
            "
            @click="selectedPM = 'cod'"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <span>Cash On Delivery</span>
          </div>
          <div
            class="
              w-full
              sm:w-1/2
              text-center
              py-3
              px-4
              cursor-pointer
              hover:bg-black/[0.04]
              font-medium
              transition
              flex
              items-center
              justify-center
            "
            :class="
              selectedPM === 'cc'
                ? 'bg-black/[0.06] border border-dashed border-black'
                : ''
            "
            @click="selectedPM = 'cc'"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              ></path>
            </svg>
            <span>Credit Card</span>
          </div>
        </div>
      </div> -->

      <div class="border-t border-gray-300 mt-8 mb-4"></div>
      <div class="mx-6">
        <Location :loc="user?.location" @updateUser="updateUser" />
      </div>
      <div class="border-t border-gray-300 mt-8 mb-4"></div>
      <div
        class="
          grid
          gap-x-3 gap-y-0.5
          grid-cols-[auto,1fr]
          items-baseline
          mt-8
          px-5
        "
      >
        <div v-if="user?.location" class="font-semibold text-lg min-w-max">
          Deliver to
        </div>
        <span v-if="user?.location">{{ getLocation(user?.location) }}</span>
        <div class="font-semibold text-lg min-w-max">Payment</div>
        <span>{{
          selectedPM === 'cod' ? 'Cash On Delivery' : 'Credit Card'
        }}</span>
        <h2 class="font-semibold text-lg min-w-max">Sub Total</h2>
        <span>{{ subTotal }}</span>
        <h2 class="font-semibold text-lg min-w-max">Shipping</h2>
        <span>{{ 50 }}</span>
        <h2 class="font-semibold text-lg min-w-max">Total</h2>
        <span>{{ subTotal + 50 }}</span>
      </div>

      <PopInButton
        :val="selectedPM == 'cod' ? 'Place Order' : 'Proceed To Payment'"
        class="!block mx-5 !mb-10"
        @click="placeOrder"
      />
    </div>
  </div>
  <div v-else class="my-48">
    <Loader />
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { db, getCurrentUser, timestamp } from '../firebase'
import { store } from '../store'
import axios from 'axios'

import PopInButton from '../components/PopInButton.vue'
import Location from '../components/Location.vue'
import Loader from '../components/Loader.vue'

let products = ref([]),
  bag = ref(),
  isLoaded = ref(false),
  router = useRouter(),
  selectedPM = ref('cod'),
  isAuthenticated = ref(),
  user = ref()

onMounted(() => {
  bag.value = JSON.parse(localStorage.getItem('bag'))
  if (bag.value !== null && bag.value !== undefined && bag.value.length > 0) {
    isLoaded.value = false
    bag.value.forEach((x, index) => {
      db.collection('products')
        .doc(x.ID)
        .get()
        .then((res) => {
          products.value[index] = bag.value[index]
          products.value[index].product = res.data()
        })
        .then(async () => {
          db.collection('users')
            .doc(await store.state.user.uid)
            .get()
            .then((res) => {
              user.value = res.data()
              isLoaded.value = true
            })
        })
        .catch((err) => console.log(err))
    })
  }
})

const subTotal = computed(() => {
  let total = 0
  products.value.forEach((item) => {
    total += item.quantity * item.product?.price
  })
  return total
})

const placeOrder = async () => {
  let docRef = db.collection('orders').doc()
  isAuthenticated.value = await getCurrentUser()
  docRef
    .set({
      userName: isAuthenticated.value.displayName,
      email: isAuthenticated.value.email,
      uid: isAuthenticated.value.uid,
      ID: docRef.id,
      products: products.value,
      date: timestamp.now(),
      paymentMethod: selectedPM.value,
      status: 'Pending',
      address: user.value.location,
      price: subTotal.value,
      shipping: 50,
    })
    .then(() => {
      router.push('/account/orders/' + docRef.id)
      localStorage.setItem('bag', JSON.stringify([]))
    })
    .catch((err) => console.log(err))
}

// const placeOrder = async () => {
//   if (selectedPM.value === 'cod') {
//     order()
//   } else {
//     let orderPayload = []
//     products.value.forEach((product) => {
//       orderPayload.push({ ID: product.ID, quantity: product.quantity })
//     })

//     axios
//       .post('http://localhost:4242/create-checkout-session', {
//         orderPayload,
//         user: {
//           userName: user.value.userName,
//           email: user.value.email,
//           uid: user.value.uid,
//           location: user.value.location,
//         },
//       })
//       .then((response) => {
//         // localStorage.setItem('bag', [])
//         setTimeout(() => {
//           window.location = response.data
//         }, 3000)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// }

const updateUser = async () => {
  db.collection('users')
    .doc(await store.state.user.uid)
    .get()
    .then((res) => {
      user.value = res.data()
    })
    .catch((err) => console.log(err))
}

const getLocation = (x) => {
  return `${x.buildingNumber}  ${x.street}, ${x.area}, ${x.city}  ${x.floor} | ${x.flat}`
}
</script>
