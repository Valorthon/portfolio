<template>
  <section class="services-section">
    <div class="overlay"></div>

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
        <div class="nav-arrow left" @click="prevPage">
          ‹
        </div>

        <!-- SLIDER -->
        <div class="slider" ref="slider">

          <div
            class="service-card"
            v-for="(project, i) in projects"
            :key="i"
            @click="onClick(i)"
          >

            <h3>{{ project.title }}</h3>
            <div class="divider"></div>

            <div class="image-stack">
              <img
                v-for="(img, index) in project.images"
                :key="index"
                :src="img"
                class="stack-img"
                :style="{ top: `${index * 12}px` }"
              />
            </div>

            <div class="arrow-btn">↗</div>

          </div>

        </div>

        <!-- RIGHT -->
        <div class="nav-arrow right" @click="nextPage">
          ›
        </div>

      </div>

      <!-- INDICATORS -->
      <div class="slider-indicator">
        <span
          v-for="page in totalPages"
          :key="page"
          class="dot"
          :class="{ active: currentPage === page - 1 }"
          @click="goToPage(page - 1)"
        ></span>
      </div>

    </v-container>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const slider = ref(null)

const itemsPerPage = 3
const cardWidth = 350   // card width + margin
const currentPage = ref(0)

const emit = defineEmits(['onClick'])

function onClick(projectId) {
  emit('onClick', projectId);
}

const projects = [
  { title: "TalkBoard", images: ["/TalkboardPoster.png"] },
  { title: "Flappy Bird", images: ["/Flappybird.webp"] },
  { title: "Quiz Reviewer", images: ["/FACompiler.png"] },
  { title: "Chess App", images: ["/Chess.webp"] },
  { title: "POS System", images: ["/POS.avif"] },
  { title: "Enrollment System API", images: ["/enroll.png"] },
]

const totalPages = computed(() =>
  Math.ceil(projects.length / itemsPerPage)
)

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
    slider.value.scrollBy({
      left: cardWidth * itemsPerPage,
      behavior: "smooth"
    })
  }
}

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
    slider.value.scrollBy({
      left: -cardWidth * itemsPerPage,
      behavior: "smooth"
    })
  }
}

const goToPage = (page) => {
  currentPage.value = page
  slider.value.scrollTo({
    left: page * cardWidth * itemsPerPage,
    behavior: "smooth"
  })
}
</script>

<style scoped>

.services-section {
  position: relative;
  background: url('@/assets/images/bg1.png') center/cover no-repeat;
  padding: 120px 0px;
  border-radius: 40px;
  overflow-x: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.06);
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
  font-size: 42px;
}

.accent {
  color: #ff7a2f;
}

.description {
  margin-top: 15px;
  opacity: .8;
}

/* SLIDER */

.slider-wrapper {
  position: relative;
  margin-top: 60px;
}

.slider {
  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;
}

/* CARD */

.service-card {
  cursor: pointer;
  min-width: 320px;
  margin-right: 30px;
  padding: 30px;
  border-radius: 30px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
}

.service-card h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.divider {
  height: 1px;
  background: rgba(255,255,255,0.3);
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
  cursor: pointer;
}

/* NAV */

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255,255,255,.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  z-index: 5;
}

.nav-arrow.left { left: -60px; }
.nav-arrow.right { right: -60px; }

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
  background: rgba(255,255,255,.4);
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  width: 30px;
  border-radius: 20px;
  background: #ff7a2f;
}

</style>