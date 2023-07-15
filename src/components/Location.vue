<template>
  <h3 class="font-semibold text-lg font-bioRhyme">Delivery Location</h3>
  <p class="text-gray-400 text-sm">Where to deliver your order?</p>

  <div
    class="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5"
    v-if="loc"
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
        selectedLocation === 'current'
          ? 'bg-black/[0.06] border border-dashed border-black'
          : ''
      "
      @click="selectedLocation = 'current'"
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        ></path>
      </svg>
      <span>Current Location</span>
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
        selectedLocation === 'new'
          ? 'bg-black/[0.06] border border-dashed border-black'
          : ''
      "
      @click="selectedLocation = 'new'"
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
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
      </svg>
      <span>New Location</span>
    </div>
  </div>

  <form
    @submit.prevent=""
    class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3 mt-4"
    v-if="selectedLocation === 'new'"
  >
    <div class="relative">
      <select
        class="inputField peer capitalize"
        placeholder="City"
        v-model="city"
        @change="updateAreas"
      >
        <template v-for="city in Object.keys(areas)" :key="city">
          <option :value="city">{{ city }}</option>
        </template>
      </select>
      <label class="labelInput">City</label>
      <svg
        class="
          absolute
          w-5
          h-5
          right-3
          top-7
          pointer-events-none
          peer-focus:rotate-90
          transition-all
        "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
    <div class="relative">
      <select
        class="inputField peer capitalize"
        placeholder="City"
        v-model="area"
      >
        <template v-for="area in areas[city]" :key="area">
          <option :value="area">{{ area }}</option>
        </template>
      </select>
      <label class="labelInput">Area</label>
      <svg
        class="
          absolute
          w-5
          h-5
          right-3
          top-7
          pointer-events-none
          peer-focus:rotate-90
          transition-all
        "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
    <div class="relative">
      <input
        type="text"
        class="inputField peer"
        placeholder="Street"
        v-model="street"
      />
      <label class="labelInput">Street</label>
    </div>
    <div class="relative">
      <input
        type="text"
        class="inputField peer"
        placeholder="Building Number"
        v-model="buildingNumber"
      />
      <label class="labelInput">Building Number</label>
    </div>
    <div class="relative">
      <input
        type="text"
        class="inputField peer"
        placeholder="Floor"
        v-model="floor"
      />
      <label class="labelInput">Floor</label>
    </div>
    <div class="relative">
      <input
        type="text"
        class="inputField peer"
        placeholder="Flat"
        v-model="flat"
      />
      <label class="labelInput">Flat</label>
    </div>
  </form>
  <PopInButton
    val="Add Location"
    class="!mt-4"
    v-if="selectedLocation === 'new'"
    @click="addLocation"
  />
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import PopInButton from '../components/PopInButton.vue'
import { db } from '../firebase'
import { store } from '../store'

const areas = ref({
  Cairo: [
    'Ain Shams',
    '15 May',
    'Abdeen',
    'Al Azbakeya',
    'Al Basatine',
    'Al Khalifa',
    'Al Materiah',
    'Al Mokattam',
    'Al Nozha',
    'Al Sahel',
    'Al Salam',
    'Al Sayeda Zeinab',
    'Al Sharabiya',
    'Amiriya',
    'Bab El Shaareya',
    'Boulak',
    'Dar Al Salaam',
    'EL Marg',
    'EL Tebeen',
    'El Maasara',
    'El Mousky',
    'El Waily',
    'El Zaitoun',
    'El Zawia El Hamra',
    'Hadayek El Kobba',
    'Heliopolis',
    'Helwan',
    'Maadi',
    'Manshaet Nasser',
    'Masr Elgedida',
    'Miser El Qdema',
    'Nasr City',
    'Rawd Al Faraj',
    'Shoubra',
    'Tora',
  ],
  Giza: [
    'Dokki',
    'Agouza',
    'Kism Al Jizah',
    'Bulaq ad Dakrur',
    'Imbabah',
    'Haram',
    'Omrania',
    'Monib',
    'Kafr Tuhurmus',
  ],
})

const props = defineProps(['loc']),
  emit = defineEmits(['updateUser'])

let selectedLocation = ref(),
  city = ref('Cairo'),
  area = ref(areas.value[city.value][0]),
  street = ref(''),
  buildingNumber = ref(''),
  floor = ref(''),
  flat = ref(''),
  err = ref('')

const N_REGEX = /^\d*[1-9]+\d*$/

onMounted(async () => {
  selectedLocation.value = (await props.loc) ? 'current' : 'new'
})

const addLocation = () => {
  if (isValid()) {
    db.collection('users')
      .doc(store.state.user.uid)
      .update({
        location: {
          buildingNumber: buildingNumber.value,
          street: street.value,
          area: area.value,
          city: city.value,
          floor: floor.value,
          flat: flat.value,
        },
      })
      .then(() => {
        buildingNumber.value = ''
        street.value = ''
        city.value = Object.keys(areas.value)[0]
        area.value = areas.value[city.value][0]
        floor.value = ''
        flat.value = ''

        emit('updateUser')
      })
      .catch((err) => console.log(err))
  }
}

const updateAreas = () => {
  area.value = areas.value[city.value][0]
}

const isValid = () => {
  if (street.value === '') {
    showMsg('Enter a valid street name')
    return false
  }
  if (!buildingNumber.value.match(N_REGEX)) {
    showMsg('Enter a valid building number')
    return false
  }
  if (!floor.value.match(N_REGEX)) {
    showMsg('Enter a valid floor number')
    return false
  }
  if (!flat.value.match(N_REGEX)) {
    showMsg('Enter a valid flat number')
    return false
  }
  err.value = ''
  return true
}

const showMsg = (m, s = 'err') => {
  let obj = { m, s }
  store.commit('showMsg', obj)
}
</script>
