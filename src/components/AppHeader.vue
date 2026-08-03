<template>
  <header class="floating-appbar" :class="{ 'is-scrolled': isScrolled }">
    <nav aria-label="Main navigation" class="nav-inner">
      <!-- LEFT NAV (desktop) -->
      <div class="desktop-nav left-nav">
        <button
          v-for="item in leftItems"
          :key="item.id"
          class="nav-btn"
          :class="{ active: activeId === item.id }"
          @click="scrollTo(item.id)"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- CENTER LOGO -->
      <a class="logo" href="#about" @click.prevent="scrollTo('about')">
        <v-avatar aria-hidden="true" color="#FD853A" size="32">
          <span class="text-white font-weight-bold">MP</span>
        </v-avatar>

        <span class="logo-text pl-2">MPejana</span>
      </a>

      <!-- RIGHT NAV (desktop) -->
      <div class="desktop-nav right-nav">
        <button
          v-for="item in rightItems"
          :key="item.id"
          class="nav-btn"
          :class="{ active: activeId === item.id }"
          @click="scrollTo(item.id)"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- MOBILE MENU BUTTON -->
      <button
        aria-controls="mobile-nav"
        :aria-expanded="mobileOpen"
        aria-label="Toggle navigation menu"
        class="mobile-menu-btn"
        @click="mobileOpen = !mobileOpen"
      >
        <v-icon color="white" size="28">
          {{ mobileOpen ? 'mdi-close' : 'mdi-menu' }}
        </v-icon>
      </button>
    </nav>

    <!-- MOBILE DRAWER -->
    <transition name="slide">
      <div
        v-show="mobileOpen"
        id="mobile-nav"
        class="mobile-drawer"
      >
        <button
          v-for="item in allItems"
          :key="item.id"
          class="mobile-nav-btn"
          :class="{ active: activeId === item.id }"
          @click="onMobileClick(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useScrollSpy } from '@/composables/useScrollSpy'

  const leftItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
  ]

  const rightItems = [
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact Me' },
  ]

  const allItems = [
    { id: 'about', label: 'About' },
    ...leftItems,
    ...rightItems,
  ]

  const { activeId, scrollTo } = useScrollSpy(allItems.map(i => i.id), 96)

  const mobileOpen = ref(false)
  const isScrolled = ref(false)

  function onMobileClick (id: string) {
    mobileOpen.value = false
    scrollTo(id)
  }

  function onScroll () {
    isScrolled.value = window.scrollY > 20
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
</script>

<style scoped>
.floating-appbar {
  width: min(1100px, calc(100% - 32px));
  margin: 16px auto;
  background-color: rgba(0, 0, 0, 0.92);
  border-radius: 50px;
  height: var(--header-height);
  position: sticky;
  top: 16px;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.25s ease, background-color 0.25s ease;
}

.floating-appbar.is-scrolled {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.logo-text {
  font-weight: 700;
  font-size: 1.1rem;
}

.desktop-nav {
  display: flex;
  align-items: center;
}

.nav-btn {
  text-transform: none;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
  border: none;
  border-radius: 30px;
  min-height: 44px;
  padding: 0 20px;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-btn:hover,
.nav-btn:focus-visible {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-btn.active {
  color: white;
  background-color: rgba(255, 122, 47, 0.2);
}

.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
}

.mobile-menu-btn:hover,
.mobile-menu-btn:focus-visible {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-drawer {
  display: none;
  position: absolute;
  top: calc(100% + 12px);
  left: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.96);
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  flex-direction: column;
  gap: 4px;
}

.mobile-nav-btn {
  text-align: left;
  text-transform: none;
  font-weight: 500;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
  border: none;
  border-radius: 14px;
  padding: 14px 18px;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.mobile-nav-btn:hover,
.mobile-nav-btn:focus-visible,
.mobile-nav-btn.active {
  color: white;
  background-color: rgba(255, 122, 47, 0.2);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn,
  .mobile-drawer {
    display: flex;
  }
}
</style>
