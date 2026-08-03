<template>
  <section class="services-section">
    <div aria-hidden="true" class="overlay" />

    <v-container class="content">
      <!-- HEADER -->
      <div class="services-header">
        <h2>
          My <span class="accent">Projects</span>
        </h2>

        <p class="description">
          A selection of my latest design and development work.
        </p>
      </div>

      <!-- SLIDER WRAPPER -->
      <div class="slider-wrapper">
        <!-- LEFT -->
        <button
          aria-label="Previous projects"
          class="nav-arrow left"
          :disabled="currentPage === 0"
          @click="prevPage"
        >
          ‹
        </button>

        <!-- SLIDER -->
        <div
          ref="slider"
          aria-label="Project carousel"
          class="slider"
          role="region"
          tabindex="0"
          @keydown.left="prevPage"
          @keydown.right="nextPage"
          @scroll="onScroll"
        >
          <article
            v-for="(project, i) in projects"
            :key="i"
            :aria-label="`Open ${project.title}`"
            class="service-card"
            role="button"
            tabindex="0"
            @click="onClick(i)"
            @keydown.enter.space.prevent="onClick(i)"
          >
            <h3>{{ project.title }}</h3>
            <div class="divider" />

            <div class="image-stack">
              <img
                v-for="(img, index) in project.images"
                :key="index"
                :alt="`${project.title} preview ${index + 1}`"
                class="stack-img"
                :src="img"
                :style="{ top: `${index * 12}px` }"
              >
            </div>

            <div aria-hidden="true" class="arrow-btn">↗</div>
          </article>
        </div>

        <!-- RIGHT -->
        <button
          aria-label="Next projects"
          class="nav-arrow right"
          :disabled="currentPage === totalPages - 1"
          @click="nextPage"
        >
          ›
        </button>
      </div>

      <!-- INDICATORS -->
      <div aria-label="Project pages" class="slider-indicator" role="tablist">
        <button
          v-for="page in totalPages"
          :key="page"
          :aria-label="`Go to project page ${page}`"
          :aria-selected="currentPage === page - 1"
          class="dot"
          :class="{ active: currentPage === page - 1 }"
          role="tab"
          @click="goToPage(page - 1)"
        />
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
  import {
    computed,
    nextTick,
    onMounted,
    onUnmounted,
    ref,
  } from 'vue'

  const emit = defineEmits<{
    (e: 'select', id: number): void
  }>()

  const slider = ref<HTMLElement | null>(null)
  const currentPage = ref(0)
  const itemsPerPage = ref(1)

  const projects = [
    { title: 'TalkBoard', images: ['/TalkboardPoster.png'] },
    { title: 'Flappy Bird', images: ['/Flappybird.webp'] },
    { title: 'Quiz Reviewer', images: ['/FACompiler.png'] },
    { title: 'Chess App', images: ['/Chess.webp'] },
    { title: 'POS System', images: ['/POS.avif'] },
    { title: 'Enrollment System API', images: ['/enroll.png'] },
  ]

  const GAP = 30

  const totalPages = computed(() => Math.ceil(projects.length / itemsPerPage.value))

  function onClick (projectId: number) {
    emit('select', projectId)
  }

  function getMetrics () {
    if (!slider.value) return null
    const firstCard = slider.value.querySelector('.service-card') as HTMLElement | null
    if (!firstCard) return null
    const cardWidth = firstCard.offsetWidth
    return { cardWidth, step: cardWidth + GAP }
  }

  function getItemsPerPage () {
    if (!slider.value) return 1
    const metrics = getMetrics()
    if (!metrics) return 1
    return Math.max(1, Math.floor((slider.value.clientWidth + GAP) / metrics.step))
  }

  function updateItemsPerPage () {
    itemsPerPage.value = getItemsPerPage()
    currentPage.value = Math.min(currentPage.value, totalPages.value - 1)
  }

  let snapRestoreTimer: ReturnType<typeof setTimeout> | null = null

  function enableSnap () {
    if (snapRestoreTimer) {
      clearTimeout(snapRestoreTimer)
      snapRestoreTimer = null
    }
    if (!slider.value) return
    slider.value.style.scrollSnapType = ''
  }

  function disableSnap () {
    if (snapRestoreTimer) {
      clearTimeout(snapRestoreTimer)
      snapRestoreTimer = null
    }
    if (!slider.value) return
    slider.value.style.scrollSnapType = 'none'
  }

  function scrollToPage (page: number, smooth = true) {
    if (!slider.value) return
    const metrics = getMetrics()
    if (!metrics) return
    page = Math.max(0, Math.min(page, totalPages.value - 1))
    currentPage.value = page
    const target = page * itemsPerPage.value * metrics.step
    disableSnap()
    slider.value.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'auto' })
    slider.value.addEventListener('scrollend', enableSnap, { once: true })
    snapRestoreTimer = setTimeout(() => enableSnap(), smooth ? 600 : 50)
  }

  function nextPage () {
    scrollToPage(currentPage.value + 1)
  }

  function prevPage () {
    scrollToPage(currentPage.value - 1)
  }

  function goToPage (page: number) {
    scrollToPage(page)
  }

  function onScrollEnd () {
    if (!slider.value) return
    const maxScroll = slider.value.scrollWidth - slider.value.clientWidth

    // If we're at the far right, always treat it as the last page.
    // This avoids the "one extra click" bug when the final page doesn't
    // fully fill the viewport.
    if (slider.value.scrollLeft >= maxScroll - 1) {
      currentPage.value = totalPages.value - 1
      return
    }

    const metrics = getMetrics()
    if (!metrics) return
    const pageStep = itemsPerPage.value * metrics.step
    if (pageStep <= 0) return
    currentPage.value = Math.round(slider.value.scrollLeft / pageStep)
    currentPage.value = Math.max(0, Math.min(currentPage.value, totalPages.value - 1))
  }

  let scrollTimeout: ReturnType<typeof setTimeout> | null = null

  function onScroll () {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(onScrollEnd, 150)
  }

  let resizeTimeout: ReturnType<typeof setTimeout> | null = null

  function onResize () {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      const previous = itemsPerPage.value
      updateItemsPerPage()
      if (itemsPerPage.value === previous) {
        onScrollEnd()
      } else {
        scrollToPage(currentPage.value, false)
      }
    }, 150)
  }

  onMounted(() => {
    nextTick(() => {
      updateItemsPerPage()
    })
    window.addEventListener('resize', onResize)
    slider.value?.addEventListener('scrollend', onScrollEnd)
    slider.value?.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    slider.value?.removeEventListener('scrollend', onScrollEnd)
    slider.value?.removeEventListener('scroll', onScroll)
    if (scrollTimeout) clearTimeout(scrollTimeout)
    if (resizeTimeout) clearTimeout(resizeTimeout)
    if (snapRestoreTimer) clearTimeout(snapRestoreTimer)
  })
</script>

<style scoped>
.services-section {
  position: relative;
  background: url('@/assets/images/bg1.png') center/cover no-repeat;
  padding: 120px 0px;
  border-radius: 40px;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
}

.content {
  position: relative;
  z-index: 2;
  color: white;
}

/* HEADER */
.services-header {
  text-align: center;
}

.services-header h2 {
  font-size: clamp(32px, 5vw, 42px);
}

.accent {
  color: #ff7a2f;
}

.description {
  margin-top: 15px;
  opacity: 0.9;
}

/* SLIDER */
.slider-wrapper {
  position: relative;
  margin-top: 60px;
  padding: 0 64px;
}

.slider {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  gap: 30px;
  padding: 8px 0;
  /* Hide scrollbar visually */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slider:focus-visible {
  outline: 2px solid rgba(255, 122, 47, 0.6);
  border-radius: 12px;
}

/* CARD */
.service-card {
  flex: 0 0 auto;
  width: min(320px, 85vw);
  max-width: 100%;
  scroll-snap-align: start;
  cursor: pointer;
  padding: 30px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

@media (min-width: 641px) and (max-width: 1024px) {
  .service-card {
    width: calc((100% - 30px) / 2);
  }
}

@media (min-width: 1025px) {
  .service-card {
    width: calc((100% - 60px) / 3);
  }
}

.service-card:hover,
.service-card:focus-visible {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.35);
}

.service-card h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin-bottom: 30px;
}

/* IMAGE STACK */
.image-stack {
  position: relative;
  height: 220px;
}

.stack-img {
  position: absolute;
  left: 0;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

/* BUTTON */
.arrow-btn {
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 60px;
  height: 60px;
  background: #1f2a37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  pointer-events: none;
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.service-card:hover .arrow-btn,
.service-card:focus-visible .arrow-btn {
  background: #ff7a2f;
  transform: rotate(45deg);
}

/* NAV */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  cursor: pointer;
  z-index: 5;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.nav-arrow:hover:not(:disabled),
.nav-arrow:focus-visible:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.nav-arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.nav-arrow.left {
  left: 0;
}

.nav-arrow.right {
  right: 0;
}

/* DOTS */
.slider-indicator {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
}

.dot {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: width 0.2s ease, background-color 0.2s ease;
}

.dot.active {
  width: 30px;
  border-radius: 20px;
  background: #ff7a2f;
}

.dot:hover,
.dot:focus-visible {
  background: rgba(255, 255, 255, 0.8);
}

/* TABLET */
@media (max-width: 1200px) {
  .slider-wrapper {
    padding: 0 48px;
  }
}

/* MOBILE */
@media (max-width: 640px) {
  .services-section {
    padding: 80px 0;
    border-radius: 24px;
  }

  .slider-wrapper {
    margin-top: 40px;
    padding: 0 12px;
  }

  .nav-arrow {
    display: none;
  }

  .service-card {
    padding: 24px;
  }

  .arrow-btn {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }
}
</style>
