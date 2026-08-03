<template>
  <SpeedInsights />
  <Analytics />

  <v-app>
    <AppHeader />

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />

    <transition name="fade">
      <button
        v-if="showBackToTop"
        aria-label="Back to top"
        class="back-to-top"
        @click="scrollToTop"
      >
        <v-icon size="24">mdi-arrow-up</v-icon>
      </button>
    </transition>
  </v-app>
</template>

<script setup lang="ts">
  import { Analytics } from '@vercel/analytics/vue'
  import { SpeedInsights } from '@vercel/speed-insights/vue'
  import { onMounted, onUnmounted, ref } from 'vue'

  const showBackToTop = ref(false)

  function onScroll () {
    showBackToTop.value = window.scrollY > 500
  }

  function scrollToTop () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
</script>

<style>
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #ff7a2f;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(255, 122, 47, 0.35);
  z-index: 90;
  transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.25s ease;
}

.back-to-top:hover,
.back-to-top:focus-visible {
  background: #e86a22;
  transform: translateY(-2px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
