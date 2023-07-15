<template>
  <div class="relative mb-8 px-5 pt-32">
    <Vtitle text="Orders" />
    <div class="mt-2" v-if="isLoaded && orders.length < 1">
      <span class="font-bioRhyme"> No Orders Yet</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512.001"
        class="max-w-[10rem] mx-auto mt-32"
      >
        <path
          d="m345.84375 261.558594c-5.328125-5.328125-7.207031-13.195313-4.867188-20.359375l60.75-185.730469c10.6875-33.179688 41.28125-55.46875 76.144532-55.46875h14.128906c11.042969 0 20 8.953125 20 20s-8.957031 20-20 20h-14.128906c-17.441406 0-32.746094 11.15625-38.082032 27.765625l-.03125.101563-60.761718 185.769531c-4.636719 14.175781-22.601563 18.46875-33.152344 7.921875zm160.296875 244.582031c-3.90625 3.90625-9.023437 5.855469-14.144531 5.855469-5.117188 0-10.234375-1.949219-14.140625-5.855469l-136.726563-136.730469-7.355468 22.488282c-.550782 1.722656-1.1875 3.402343-1.878907 5.046874 5.582031 2.429688 10.816407 5.714844 15.535157 9.828126 12.082031 10.53125 19.335937 25.136718 20.429687 41.125 1.097656 15.992187-4.101563 31.449218-14.632813 43.527343-10.53125 12.082031-25.140624 19.335938-41.128906 20.429688-1.398437.097656-2.796875.144531-4.1875.144531-14.480468.003906-28.316406-5.167969-39.339844-14.777344-12.078124-10.53125-19.335937-25.136718-20.429687-41.125-.644531-9.453125.921875-18.710937 4.472656-27.203125l-181.757812-57.671875-9.785157 30.960938c-2.691406 8.523437-10.570312 13.976562-19.0625 13.976562-1.996093 0-4.027343-.300781-6.03125-.933594-10.53125-3.328124-16.371093-14.566406-13.046874-25.097656l9.800781-31.007812-18.75-5.949219c-10.53125-3.328125-16.371094-14.5625-13.042969-25.097656 3.328125-10.53125 14.5625-16.371094 25.09375-13.042969l244.476562 77.578125c6.269532 2 12.949219.882813 18.320313-3.160156 3.277344-2.46875 5.625-5.96875 6.890625-9.871094l.019531-.066406 13.675781-41.8125-303.554687-303.554688c-7.8125-7.8125-7.8125-20.476562 0-28.285156 7.808594-7.8125 20.472656-7.8125 28.285156 0l471.996094 471.996094c7.8125 7.808593 7.8125 20.476562 0 28.285156zm-178.1875-55.507813c-.367187-5.332031-2.785156-10.199218-6.8125-13.710937-3.671875-3.203125-8.285156-4.925781-13.109375-4.925781-.464844 0-.929688.015625-1.398438.046875-5.328124.367187-10.199218 2.785156-13.707031 6.8125-3.511719 4.027343-5.242187 9.179687-4.878906 14.507812s2.78125 10.199219 6.808594 13.710938c4.027343 3.507812 9.183593 5.238281 14.507812 4.878906 5.332031-.367187 10.199219-2.785156 13.710938-6.8125s5.242187-9.179687 4.878906-14.507813zm0 0"
        />
      </svg>
    </div>
  </div>
  <div class="my-8 mx-auto" v-if="isLoaded">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      <div
        v-for="order in orders"
        :key="order.ID"
        class="
          border border-gray-300 border-l-0 border-r-0
          md:border-l md:border-r
          px-5
          py-3
        "
      >
        <div class="grid grid-cols-[auto,1fr] gap-x-5 gap-y-0.5 mx-auto">
          <div class="min-w-max font-semibold">Order #</div>
          <div class="break-all text-gray-500">{{ order.ID }}</div>
          <div class="min-w-max font-semibold">On</div>
          <div class="text-gray-500">
            {{ order.date.toDate().toDateString() }}
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
          <div class="min-w-max font-semibold">Total Price</div>
          <div class="text-gray-500">
            {{ order.price + order.shipping }}
          </div>
          <div class="min-w-max font-semibold">Payment Method</div>
          <div class="text-gray-500">
            {{
              order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Credit Card'
            }}
          </div>
        </div>
        <div class="flex items-baseline mt-2">
          <PopInButton
            val=" View Order"
            :path="'/account/orders/' + order.ID"
          />
          <PopInButton
            val="Cancel Order"
            @click="cancelOrder(order)"
            v-if="order.status === 'Pending' || order.status === 'Confirmed'"
          />
          <PopInButton val="Re Order" @click="reOrder(order)" v-else />
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isLoaded" class="my-44">
    <Loader />
  </div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import { db } from '../firebase'
import { useRouter } from 'vue-router'
import { store } from '../store'
import Loader from '../components/Loader.vue'
import PopInButton from '../components/PopInButton.vue'
import Vtitle from '../components/Vtitle.vue'

let orders = ref([]),
  cancelDialogShown = ref(false),
  router = useRouter(),
  isLoaded = ref(false)

const getOrders = async () => {
  orders.value = []
  isLoaded.value = false
  db.collection('orders')
    .where('uid', '==', store.state.user.uid)
    .get()
    .then((res) => {
      res.forEach((order) => {
        orders.value.push(order.data())
      })
      isLoaded.value = true
    })
    .catch((err) => console.log(err))
}

onMounted(() => {
  getOrders()
})

const cancelOrder = async (order) => {
  try {
    isLoaded.value = false
    let res = await db.collection('orders').doc(order.ID).update({
      status: 'Canceled',
    })
    getOrders()
  } catch (err) {
    console.log(err)
  }
}

const reOrder = (order) => {
  let bag = []
  order.products.forEach((x) => {
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
