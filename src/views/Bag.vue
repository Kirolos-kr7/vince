<template>
  <div class="relative mb-8 px-5 pt-32">
    <Vtitle text="Bag" />
    <div class="mt-2" v-if="isLoaded">
      <div v-if="products.length < 1">
        <span class="font-bioRhyme">Bag is Empty</span>
        <PopInButton
          val="Continue Shopping"
          class="!block !mt-4 !mb-44"
          @click="router.push('/shop')"
        />
      </div>
      <span class="font-bioRhyme" v-else>
        {{
          products.length > 0
            ? products.length === 1
              ? '1 item'
              : `${products.length} items`
            : 'Bag is Empty'
        }}</span
      >
    </div>
  </div>

  <div class="grid md:grid-cols-[2.5fr,1fr] mb-5" v-if="isLoaded">
    <div
      v-if="products.length > 0"
      class="
        flex flex-col
        justify-center
        gap-2
        border border-solid border-gray-300 border-r-0
        md:border-r
      "
    >
      <div
        v-for="(x, index) in products"
        :key="x"
        class="
          flex flex-col
          gap-3
          py-3
          px-5
          items-start
          border-b border-solid border-gray-300
          last-of-type:border-b-0
        "
      >
        <div class="flex flex-row gap-3">
          <img :src="x.product.images[0]" class="w-[4.5rem] my-auto" />
          <div class="flex flex-col gap-1">
            <h4 class="text-sm font-normal text-gray-500 -mb-2">
              {{ x.product.brand }}
            </h4>
            <div class="flex gap-x-2 items-center flex-wrap">
              <h3 class="font-medium text-lg">
                {{ x.product.name + ' - ' + x.product.color }}
              </h3>
              <div
                class="
                  border border-gray-500
                  px-1
                  py-0.5
                  transition
                  uppercase
                  text-xs
                  font-medium
                  bg-[#82817d38]
                "
              >
                {{ x.size }}
              </div>
            </div>
            <div class="font-medium flex items-center gap-3">
              <button @click="decQuantity(index)">
                <svg
                  class="
                    w-5
                    h-5
                    hover:text-gray-500
                    transition
                    cursor-pointer
                    p-0.5
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
              <span>{{ x.quantity }}</span>

              <button @click="incQuantity(index)">
                <svg
                  class="
                    w-5
                    h-5
                    hover:text-gray-500
                    transition
                    cursor-pointer
                    p-0.5
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center w-full">
          <h5 class="text-lg font-medium">
            {{ `EGP ${x.product.price * x.quantity}` }}
            <span
              v-if="x.quantity > 1"
              class="text-gray-400 text-sm font-normal"
              >{{ `${x.product.price} each` }}</span
            >
          </h5>
          <svg
            @click="removeItem(index)"
            class="
              w-5
              h-5
              hover:text-red-400
              transition
              cursor-pointer
              p-0.5
              text-red-600
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div
      v-if="products.length > 0"
      class="
        border border-solid border-gray-300 border-l-0
        pt-3
        pb-1.5
        border-t-0 border-r-0
        md:border-t
        mb-10
        md:mb-0
      "
    >
      <div class="flex justify-between gap-3 px-5 mb-2">
        <h2 class="font-semibold">Sub Total</h2>
        <span>{{ subTotal }}</span>
      </div>
      <div class="flex justify-between gap-3 px-5 mb-2">
        <h2 class="font-semibold">Delivery</h2>
        <span>50</span>
      </div>
      <div class="h-px w-full bg-gray-300 mb-2"></div>
      <div class="flex justify-between gap-3 px-5">
        <h2 class="font-semibold">Total</h2>
        <span>{{ 50 + subTotal }}</span>
      </div>

      <PopInButton
        val="Proceed to checkout"
        class="!mt-4 !block max-w-[fit-content] !mx-auto"
        path="/checkout"
        @click="
          isAuthenticated ? router.push('/checkout') : router.push('/account')
        "
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
import { db, getCurrentUser } from '../firebase'
import Loader from '../components/Loader.vue'
import PopInButton from '../components/PopInButton.vue'
import Vtitle from '../components/Vtitle.vue'

let products = ref([]),
  isLoaded = ref(false),
  router = useRouter(),
  isAuthenticated = ref()

onMounted(() => {
  let bag = JSON.parse(localStorage.getItem('bag'))
  if (bag !== null && bag.length > 0) {
    bag.forEach((x, index) => {
      db.collection('products')
        .doc(x.ID)
        .get()
        .then((res) => {
          products.value[index] = bag[index]
          products.value[index].product = res.data()
          isLoaded.value = true
        })
        .then(async () => {
          isAuthenticated.value = await getCurrentUser()
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem('bag')
        })
    })
  } else {
    isLoaded.value = true
  }
})

const incQuantity = (index) => {
  let bag = JSON.parse(localStorage.getItem('bag'))
  bag.forEach((item, i) => {
    if (item.size === products.value[index].size) {
      if (item.ID === products.value[index].ID) {
        bag[i].quantity += 1
        products.value[index].quantity += 1
      }
    }
  })
  localStorage.setItem('bag', JSON.stringify(bag))
}

const decQuantity = (index) => {
  if (products.value[index].quantity > 1) {
    let bag = JSON.parse(localStorage.getItem('bag'))
    bag.forEach((item, i) => {
      if (item.size === products.value[index].size) {
        if (item.ID === products.value[index].ID) {
          bag[i].quantity -= 1
          products.value[index].quantity -= 1
        }
      }
    })
    localStorage.setItem('bag', JSON.stringify(bag))
  }
}

const removeItem = (index) => {
  let bag = JSON.parse(localStorage.getItem('bag'))
  products.value.splice(index, 1)
  bag.splice(index, 1)
  localStorage.setItem('bag', JSON.stringify(bag))
}

const subTotal = computed(() => {
  let total = 0
  products.value.forEach((item) => {
    total += item.quantity * item.product?.price
  })
  return total
})
</script>
