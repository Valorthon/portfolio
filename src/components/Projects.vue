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
  import { computed, onMounted, onUnmounted, ref } from 'vue'

  const emit = defineEmits<{
    (e: 'select', id: number): void
  }>()

  const slider = ref<HTMLElement | null>(null)
  const currentPage = ref(0)

  const projects = [
    { title: 'TalkBoard', images: ['/TalkboardPoster.png'] },
    { title: 'Flappy Bird', images: ['/Flappybird.webp'] },
    { title: 'Quiz Reviewer', images: ['/FACompiler.png'] },
    { title: 'Chess App', images: ['/Chess.webp'] },
    { title: 'POS System', images: ['/POS.avif'] },
    { title: 'Enrollment System API', images: ['/enroll.png'] },
  ]

  const itemsPerPage = 3

  const totalPages = computed(() => Math.ceil(projects.length / itemsPerPage))

  function onClick (projectId: number) {
    emit('select', projectId)
  }

  function getScrollStep () {
    if (!slider.value) return 0
    const firstCard = slider.value.querySelector('.service-card') as HTMLElement | null
    const gap = 30
    return firstCard ? firstCard.offsetWidth + gap : slider.value.clientWidth / itemsPerPage
  }

  function nextPage () {
    if (!slider.value || currentPage.value >= totalPages.value - 1) return
    slider.value.scrollBy({ left: getScrollStep(), behavior: 'smooth' })
  }

  function prevPage () {
    if (!slider.value || currentPage.value <= 0) return
    slider.value.scrollBy({ left: -getScrollStep(), behavior: 'smooth' })
  }

  function goToPage (page: number) {
    if (!slider.value) return
    currentPage.value = page
    slider.value.scrollTo({ left: page * getScrollStep() * itemsPerPage, behavior: 'smooth' })
  }

  let scrollTimeout: ReturnType<typeof setTimeout> | null = null

  function onScroll () {
    if (!slider.value) return
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      const step = getScrollStep()
      if (step > 0) {
        currentPage.value = Math.round(slider.value!.scrollLeft / (step * itemsPerPage))
      }
    }, 100)
  }

  function updateItemsPerPage () {
    if (!slider.value) return
    // Recalculate currentPage to stay within bounds after resize
    const step = getScrollStep()
    if (step > 0) {
      currentPage.value = Math.round(slider.value.scrollLeft / (step * itemsPerPage))
    }
  }

  onMounted(() => {
    window.addEventListener('resize', updateItemsPerPage)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateItemsPerPage)
    if (scrollTimeout) clearTimeout(scrollTimeout)
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
}

.slider {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  gap: 30px;
  padding: 8px 4px;
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
  left: -60px;
}

.nav-arrow.right {
  right: -60px;
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
  .nav-arrow.left {
    left: 0;
  }

  .nav-arrow.right {
    right: 0;
  }

  .slider-wrapper {
    padding: 0 24px;
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
