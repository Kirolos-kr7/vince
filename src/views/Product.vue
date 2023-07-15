<template>
  <div v-if="isLoaded">
    <div
      class="
        flex flex-col
        md:flex-row md:w-10/12
        mx-auto
        md:border-l md:border-r md:border-gray-400
        min-h-screen
      "
    >
      <div
        class="
          md:max-w-[300px] md:max-h-screen md:sticky md:top-0
          lg:min-w-[400px]
          md:border-r md:border-gray-400
          flex-shrink-0
          min-h-[300px]
          relative
        "
        v-if="product.images?.length === 1"
      >
        <span
          v-show="!isImgLoaded"
          class="
            font-megrim
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2 -translate-y-1/2
            text-5xl
            mt-36
          "
          >V.</span
        >
        <transition name="fade">
          <img
            :src="product.images[0]"
            v-show="isImgLoaded"
            @load="isImgLoaded = true"
            class="
              min-w-[300px]
              sm:min-w-[auto]
              h-auto
              md:w-full md:mt-36
              border-t border-b border-gray-400
            "
          />
        </transition>
      </div>
      <div
        v-else
        class="
          flex-shrink-0
          imgScroll
          flex
          md:flex-col
          gap-3
          md:max-w-[300px]
          lg:min-w-[400px]
          h-auto
          overflow-x-auto
          min-h-[300px]
          md:max-h-screen md:sticky md:top-0 md:border-r md:border-gray-400
        "
      >
        <span
          v-show="!isImgLoaded"
          class="
            font-megrim
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2 -translate-y-1/2
            text-5xl
          "
          >V.</span
        >
        <template v-for="image in product.images" :key="image">
          <transition name="fade">
            <img
              :src="image"
              v-show="isImgLoaded"
              @load="isImgLoaded = true"
              class="min-w-[300px] sm:min-w-[auto] h-auto md:w-full"
            />
          </transition>
        </template>
      </div>
      <div
        class="flex flex-col px-5 md:my-36 md:border-t md:border-gray-400 pt-4"
      >
        <h4 class="text-base font-normal text-gray-500 -mb-1">
          {{ product.brand }}
        </h4>
        <div class="text-2xl font-semibold !text-black block transition mb-4">
          {{ product.name + ' - ' + product.color }}
        </div>

        <p class="text-gray-700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
          quas minus repellendus facere adipisci sunt iste reiciendis, nobis ad
          sequi nulla quisquam aperiam necessitatibus ea quod quo impedit. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <h5 class="font-semibold text-xl my-2">{{ 'L.E ' + product.price }}</h5>

        <div
          class="
            sizes
            flex-wrap
            mt-0.5
            mb-1
            hidden
            md:flex
            border border-gray-400
            divide-x divide-gray-400
            w-[fit-content]
          "
        >
          <button
            v-for="size in product.sizes"
            :key="size"
            class="px-2 py-1.5 transition uppercase text-xs font-medium"
            :class="selectedSize === size ? 'bg-[#82817d80] ' : ''"
            @click="selectedSize = size"
          >
            {{ size }}
          </button>
        </div>

        <PopInButton
          val="Add To Bag"
          class="btn max-w-max !px-8 !mt-5 !hidden md:!inline-block"
          @click="addToBag"
        />

        <!-- Dropdown Lists -->
        <div class="-mx-5 mt-5">
          <div
            class="
              border border-l-0 border-r-0 border-gray-400
              last-of-type:border-b
              border-b-0
            "
            v-for="(accordion, index) in accordions"
            :key="accordion"
          >
            <div>
              <button
                @click="accordions[index].state = !accordions[index].state"
                class="
                  hover:bg-secondary
                  w-full
                  flex
                  gap-x-5
                  items-center
                  py-3
                  px-5
                  justify-between
                  cursor-pointer
                "
              >
                <h3 class="font-semibold text-lg">{{ accordion.title }}</h3>

                <div class="relative w-5 h-5">
                  <span
                    class="
                      absolute
                      w-0.5
                      h-5
                      rounded-2xl
                      bg-black
                      block
                      transition-all
                      duration-500
                    "
                    :class="!accordion.state ? '' : 'rotate-[270deg]'"
                  ></span>
                  <span
                    class="
                      absolute
                      w-0.5
                      h-5
                      rounded-2xl
                      bg-black
                      block
                      rotate-90
                    "
                  ></span>
                </div>
              </button>
              <div
                class="overflow-hidden transition-all duration-500"
                :class="accordion.state ? 'max-h-96' : 'max-h-0'"
              >
                <p class="mt-1 mb-3 mx-5 text-gray-700">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  harum sunt sapiente voluptatibus reprehenderit, atque dicta
                  numquam hic quidem! Accusamus harum eaque repudiandae vero
                  alias omnis error quod voluptates ut saepe, est quasi aut
                  totam. Fugiat quos ex ipsam error voluptatem itaque! Accusamus
                  doloremque reiciendis pariatur quas ea rerum porro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MoreProducts :product="product" />

    <!-- Bottom Purchase -->
    <div
      class="
        md:hidden
        fixed
        bottom-0
        w-full
        bg-primary
        border-t border-gray-400
        z-30
        grid grid-cols-2
      "
    >
      <div class="relative">
        <select
          name=""
          id=""
          class="uppercase bg-transparent appearance-none w-full h-full px-4"
        >
          <template v-for="size in product.sizes" :key="size">
            <option value="">{{ size }}</option>
          </template>
        </select>
        <svg
          class="
            w-6
            h-6
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            pointer-events-none
            hover:bg-secondary
            cursor-pointer
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
            d="M5 15l7-7 7 7"
          ></path>
        </svg>
      </div>

      <button
        class="
          min-w-full
          px-4
          font-medium
          py-3
          border-l border-gray-400
          hover:bg-secondary
          whitespace-nowrap
        "
        @click="addToBag"
      >
        Add To Bag
      </button>
    </div>
  </div>
  <div v-else class="my-80">
    <Loader />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import Loader from '../components/Loader.vue'
import MoreProducts from '../components/MoreProducts.vue'
import PopInButton from '../components/PopInButton.vue'

let route = useRoute(),
  product = ref({}),
  selectedSize = ref(),
  isLoaded = ref(false),
  isImgLoaded = ref(false)

onMounted(async () => {
  await db
    .collection('products')
    .doc(route.params.id)
    .get()
    .then((res) => {
      product.value = res.data()
      selectedSize.value = product.value.sizes[0]
      isLoaded.value = true
    })
    .catch((err) => console.log(err))
})

const changeSize = (size) => {
  selectedSize.value = size
}

const addToBag = () => {
  let bag = [],
    isIn = false,
    isSameSize = false,
    cartItem = {},
    currIndex

  if (
    localStorage.getItem('bag') === null ||
    localStorage.getItem('bag') === undefined
  ) {
    bag = []
  } else {
    bag = JSON.parse(localStorage.getItem('bag'))
    bag.forEach((item, index) => {
      if (item.size === selectedSize.value) {
        isSameSize = true
        currIndex = index
        if (item.ID === product.value.ID) {
          isIn = true
          currIndex = index
        }
      }
    })
  }

  if (!isIn || !isSameSize) {
    cartItem = {
      ID: product.value.ID,
      quantity: 1,
      size: selectedSize.value,
    }
    bag.push(cartItem)
  } else {
    bag[currIndex].quantity += 1
  }

  localStorage.setItem('bag', JSON.stringify(bag))

  bag = []
  isIn = false
  cartItem = {}
  currIndex = null
}

let accordions = ref([
  {
    state: false,
    title: 'Description',
  },
  {
    state: false,
    title: 'Highlights',
  },
  {
    state: false,
    title: 'Reviews',
  },
])
</script>
