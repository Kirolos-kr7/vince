<template>
  <div class="max-w-[106rem] mx-auto">
    <Navbar />
    <router-view />
    <Footer />
    <Notification />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Notification from './components/Notification.vue'
</script>

<style>
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background: #c9c9c9;
  border: 3px solid #efedea;
}

::-webkit-scrollbar-thumb:hover {
  background: #9c9494;
}

::-webkit-scrollbar-track-piece {
  margin: 3px;
}

::-webkit-scrollbar {
  background: #efedea;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
