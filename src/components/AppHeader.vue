<template>
  <header
    ref="headerRef"
    class="floating-appbar"
    :class="{ 'is-scrolled': isScrolled, 'is-expanded': isExpanded, 'is-loaded': isLoaded }"
  >
    <nav aria-label="Main navigation" class="nav-inner">
      <!-- LEFT NAV (desktop) -->
      <div class="desktop-nav left-nav">
        <button
          v-for="item in leftItems"
          :key="item.id"
          :aria-current="activeId === item.id ? 'page' : undefined"
          class="nav-btn"
          :class="{ active: activeId === item.id }"
          :data-nav-id="item.id"
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
          :aria-current="activeId === item.id ? 'page' : undefined"
          class="nav-btn"
          :class="{ active: activeId === item.id }"
          :data-nav-id="item.id"
          @click="scrollTo(item.id)"
        >
          {{ item.label }}
        </button>

        <v-btn
          class="hire-btn"
          href="#contact"
          size="small"
          @click.prevent="scrollTo('contact')"
        >
          Hire me
        </v-btn>
      </div>

      <!-- MOBILE MENU BUTTON -->
      <button
        aria-controls="mobile-nav"
        :aria-expanded="mobileOpen"
        aria-label="Toggle navigation menu"
        class="mobile-menu-btn"
        @click="mobileOpen = !mobileOpen"
      >
        <v-icon color="#1a1a1a" size="28">
          {{ mobileOpen ? 'mdi-close' : 'mdi-menu' }}
        </v-icon>
      </button>

      <!-- SLIDING ACTIVE INDICATOR -->
      <span
        aria-hidden="true"
        class="active-indicator"
        :style="indicatorStyle"
      />
    </nav>

    <!-- MOBILE DRAWER -->
    <transition name="slide">
      <div
        v-show="mobileOpen"
        id="mobile-nav"
        ref="mobileDrawerRef"
        class="mobile-drawer"
      >
        <button
          v-for="item in allItems"
          :key="item.id"
          :aria-current="activeId === item.id ? 'page' : undefined"
          class="mobile-nav-btn"
          :class="{ active: activeId === item.id }"
          @click="onMobileClick(item.id)"
        >
          {{ item.label }}
        </button>

        <v-btn
          block
          class="mobile-hire-btn"
          href="#contact"
          size="large"
          @click.prevent="onMobileHireClick"
        >
          Hire me
        </v-btn>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
  import {
    nextTick,
    onMounted,
    onUnmounted,
    ref,
    watch,
  } from 'vue'
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

  const headerRef = ref<HTMLElement | null>(null)
  const mobileDrawerRef = ref<HTMLElement | null>(null)
  const mobileOpen = ref(false)
  const isScrolled = ref(false)
  const isExpanded = ref(false)
  const isLoaded = ref(false)

  const indicatorStyle = ref({
    left: '0px',
    width: '0px',
    opacity: '0',
  })

  function onMobileClick (id: string) {
    mobileOpen.value = false
    scrollTo(id)
  }

  function onMobileHireClick () {
    mobileOpen.value = false
    scrollTo('contact')
  }

  function closeMobile () {
    mobileOpen.value = false
  }

  function expand () {
    isExpanded.value = true
  }

  function collapse () {
    isExpanded.value = false
  }

  function onScroll () {
    isScrolled.value = window.scrollY > 20
  }

  function updateIndicator () {
    if (!headerRef.value) return

    const activeBtn = headerRef.value.querySelector(
      `.nav-btn[data-nav-id="${CSS.escape(activeId.value)}"]`,
    ) as HTMLElement | null

    if (!activeBtn) {
      indicatorStyle.value.opacity = '0'
      return
    }

    const navRect = headerRef.value.querySelector('.nav-inner')!.getBoundingClientRect()
    const btnRect = activeBtn.getBoundingClientRect()

    indicatorStyle.value = {
      left: `${btnRect.left - navRect.left}px`,
      width: `${btnRect.width}px`,
      opacity: '1',
    }
  }

  function onKeydown (event: KeyboardEvent) {
    if (event.key === 'Escape' && mobileOpen.value) {
      closeMobile()
    }
  }

  function onDocumentClick (event: MouseEvent) {
    if (!mobileOpen.value) return

    const target = event.target as Node
    const menuBtn = headerRef.value?.querySelector('.mobile-menu-btn')

    if (
      mobileDrawerRef.value
      && !mobileDrawerRef.value.contains(target)
      && menuBtn
      && !menuBtn.contains(target)
    ) {
      closeMobile()
    }
  }

  function onResize () {
    nextTick(updateIndicator)
  }

  function onTransitionEnd (event: TransitionEvent) {
    if (['max-width', 'padding'].includes(event.propertyName)) {
      nextTick(updateIndicator)
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('click', onDocumentClick)
    window.addEventListener('resize', onResize)
    headerRef.value?.addEventListener('transitionend', onTransitionEnd)
    headerRef.value?.addEventListener('mouseenter', expand)
    headerRef.value?.addEventListener('mouseleave', collapse)
    onScroll()

    // Trigger entrance animation and initial indicator placement
    requestAnimationFrame(() => {
      isLoaded.value = true
      nextTick(updateIndicator)
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('click', onDocumentClick)
    window.removeEventListener('resize', onResize)
    headerRef.value?.removeEventListener('transitionend', onTransitionEnd)
    headerRef.value?.removeEventListener('mouseenter', expand)
    headerRef.value?.removeEventListener('mouseleave', collapse)
  })

  watch(activeId, () => nextTick(updateIndicator))
  watch(mobileOpen, isOpen => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })
</script>

<style scoped>
.floating-appbar {
  width: fit-content;
  max-width: calc(100% - 32px);
  margin: 16px auto;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 50px;
  height: var(--header-height);
  position: sticky;
  top: 16px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: max-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
  transform: translateY(-120%);
  opacity: 0;
}

.floating-appbar.is-loaded {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.6s ease,
    max-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.floating-appbar.is-scrolled {
  max-width: 180px;
  height: 50px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.floating-appbar.is-scrolled:not(.is-expanded) {
  transition: max-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.floating-appbar.is-scrolled.is-expanded {
  max-width: fit-content;
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: max-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

@media (max-width: 768px) {
  .floating-appbar {
    width: calc(100% - 32px);
  }

  .floating-appbar.is-scrolled {
    max-width: 1100px;
    height: 56px;
  }
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  position: relative;
  transition: padding 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 769px) {
  .left-nav {
    margin-right: 16px;
  }

  .right-nav {
    margin-left: 16px;
  }

  .floating-appbar.is-scrolled .left-nav {
    margin-right: 0;
  }

  .floating-appbar.is-scrolled .right-nav {
    margin-left: 0;
  }
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #1a1a1a;
}

.logo-text {
  font-weight: 700;
  font-size: 1.1rem;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  max-width: 500px;
  overflow: hidden;
  transition: max-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease,
    transform 0.35s ease;
}

.floating-appbar:not(.is-scrolled) .desktop-nav {
  opacity: 1;
  transform: translateY(0);
  transition: max-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease,
    transform 0.35s ease;
}

.floating-appbar.is-scrolled .desktop-nav {
  max-width: 0;
  opacity: 0;
  transform: translateY(6px);
  pointer-events: none;
  transition: max-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.25s ease,
    transform 0.25s ease;
}

.floating-appbar.is-scrolled.is-expanded .desktop-nav {
  max-width: 500px;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  transition: max-width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease,
    transform 0.35s ease;
}

.nav-btn {
  position: relative;
  z-index: 2;
  text-transform: none;
  font-weight: 500;
  color: #444;
  background: transparent;
  border: none;
  border-radius: 30px;
  min-height: 44px;
  padding: 0 20px;
  cursor: pointer;
  transition: color 0.25s ease;
  white-space: nowrap;
}

.nav-btn:hover,
.nav-btn:focus-visible {
  color: #1a1a1a;
}

.nav-btn.active {
  color: #1a1a1a;
}

.active-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  background: rgba(255, 122, 47, 0.18);
  border-radius: 30px;
  z-index: 1;
  pointer-events: none;
  transition: left 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
}

.floating-appbar.is-scrolled .active-indicator {
  opacity: 0;
}

.floating-appbar.is-scrolled.is-expanded .active-indicator {
  opacity: 1;
  transition: left 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.3s ease 0.35s;
}

@media (min-width: 769px) {
  .floating-appbar.is-scrolled .nav-inner {
    justify-content: center;
    padding: 0 16px;
  }

  .floating-appbar.is-scrolled.is-expanded .nav-inner {
    padding: 0 12px;
  }
}

.hire-btn {
  margin-left: 8px;
  text-transform: none;
  font-weight: 600;
  color: white !important;
  background: #ff7a2f !important;
  border-radius: 30px !important;
  padding: 0 22px !important;
  letter-spacing: 0;
  box-shadow: 0 4px 14px rgba(255, 122, 47, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease !important;
  white-space: nowrap;
}

.hire-btn:hover {
  background: #e86a22 !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(255, 122, 47, 0.45);
}

.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.mobile-menu-btn:hover,
.mobile-menu-btn:focus-visible {
  background-color: rgba(0, 0, 0, 0.06);
}

.mobile-drawer {
  display: none;
  position: absolute;
  top: calc(100% + 12px);
  left: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  flex-direction: column;
  gap: 4px;
}

.mobile-nav-btn {
  text-align: left;
  text-transform: none;
  font-weight: 500;
  font-size: 1rem;
  color: #444;
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
  color: #1a1a1a;
  background-color: rgba(255, 122, 47, 0.12);
}

.mobile-hire-btn {
  margin-top: 8px;
  text-transform: none;
  font-weight: 600;
  color: white !important;
  background: #ff7a2f !important;
  border-radius: 14px !important;
  letter-spacing: 0;
  box-shadow: 0 4px 14px rgba(255, 122, 47, 0.35);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
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

  .active-indicator {
    display: none;
  }

  .mobile-menu-btn,
  .mobile-drawer {
    display: flex;
  }

  .mobile-drawer {
    flex-direction: column;
  }
}
</style>
