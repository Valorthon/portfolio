<template>
  <v-overlay
    class="projects-overlay"
    :model-value="openOverlay"
    persistent
    scrim="black"
    @click:outside="onClose"
    @keydown.esc="onClose"
  >
    <div :aria-label="currentProject.title" aria-modal="true" class="overlay-container" role="dialog">
      <!-- CLOSE -->
      <button
        aria-label="Close project details"
        class="close-btn"
        @click="onClose"
      >
        <v-icon size="24">mdi-close</v-icon>
      </button>

      <!-- PROJECT CARD -->
      <v-card class="project-card">
        <div class="media-container">
          <v-img
            v-if="currentSlide.type === 'image'"
            :alt="`${currentProject.title} - ${currentSlide.subtitle}`"
            class="media"
            :src="currentSlide.src"
          />

          <video
            v-else-if="currentSlide.type === 'video'"
            :key="current"
            autoplay
            class="media"
            controls
            loop
            muted
            playsinline
            :src="currentSlide.src"
          />

          <iframe
            v-else-if="currentSlide.type === 'pdf'"
            class="media"
            :src="currentSlide.src"
            :title="`${currentProject.title} PDF`"
          />
        </div>

        <v-card-text>
          <h2 class="project-title">
            {{ currentProject.title }}
          </h2>

          <h3 class="slide-subtitle">
            {{ currentSlide.subtitle }}
          </h3>

          <p class="project-description">
            {{ currentSlide.description }}
          </p>

          <div class="tech-stack">
            <v-chip v-for="tech in currentProject.tech" :key="tech" size="small">
              {{ tech }}
            </v-chip>
          </div>

          <div class="actions">
            <v-btn
              v-if="currentProject.github"
              :href="currentProject.github"
              rel="noopener noreferrer"
              target="_blank"
              variant="outlined"
            >
              GitHub
            </v-btn>

            <v-btn
              v-if="currentProject.demo"
              color="#ff7a2f"
              :href="currentProject.demo"
              rel="noopener noreferrer"
              target="_blank"
            >
              Live Demo
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- SLIDE DOTS -->
      <div :aria-label="`${currentProject.title} slides`" class="slide-dots" role="tablist">
        <button
          v-for="(_, index) in currentProject.slides"
          :key="index"
          :aria-label="`Go to slide ${index + 1}`"
          :aria-selected="current === index"
          class="slide-dot"
          :class="{ active: current === index }"
          role="tab"
          @click="goToSlide(index)"
        />
      </div>

      <!-- NAVIGATION -->
      <div class="nav">
        <button
          aria-label="Previous slide"
          class="nav-btn"
          @click="prevProject"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </button>

        <span class="counter">
          {{ current + 1 }} / {{ currentProject.slides.length }}
        </span>

        <button
          aria-label="Next slide"
          class="nav-btn"
          @click="nextProject"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </button>
      </div>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

  const props = defineProps<{
    projectId: number
    openOverlay: boolean
  }>()

  const emit = defineEmits<{
    (e: 'closed'): void
  }>()

  const current = ref(0)

  interface Project {
    title: string
    tech: string[]
    github: string
    demo: string
    slides: {
      type: 'image' | 'video' | 'pdf'
      subtitle: string
      description: string
      src: string
    }[]
  }

  const currentProject = computed<Project>(() => {
    return projects.value[props.projectId] ?? projects.value[0]!
  })

  const currentSlide = computed(() => {
    return currentProject.value.slides[current.value] ?? currentProject.value.slides[0]!
  })

  watch(
    () => props.openOverlay,
    isOpen => {
      if (isOpen) {
        current.value = 0
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
  )

  onUnmounted(() => {
    document.body.style.overflow = ''
  })

  function onClose () {
    emit('closed')
  }

  function goToSlide (index: number) {
    current.value = index
  }

  function nextProject () {
    current.value = (current.value + 1) % currentProject.value.slides.length
  }

  function prevProject () {
    current.value = (current.value - 1 + currentProject.value.slides.length) % currentProject.value.slides.length
  }

  function onKeydown (e: KeyboardEvent) {
    if (!props.openOverlay) return
    switch (e.key) {
      case 'ArrowRight': {
        nextProject()

        break
      }
      case 'ArrowLeft': {
        prevProject()

        break
      }
      case 'Escape': {
        onClose()

        break
      }
    // No default
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  const projects = ref<Project[]>([
    {
      title: 'Math Speech-to-Text Virtual Whiteboard',
      tech: ['Python', 'Tkinter', 'Transformers', 'SpaCy', 'Machine Learning'],
      github: '',
      demo: '',
      slides: [
        {
          type: 'image',
          subtitle: 'Overview',
          description: 'A virtual whiteboard powered by the spaCy NLP pipeline and a custom Named Entity Recognition (NER) model.',
          src: '/TalkboardPoster.png',
        },
        {
          type: 'video',
          subtitle: 'Main Features',
          description: 'Spoken mathematical expressions are transcribed into formatted equations and graphs.',
          src: '/video/talkboard/board.mp4',
        },
        {
          type: 'video',
          subtitle: 'Sub Features',
          description: 'Boards can be organized, sorted, and managed with a Trash Bin feature.',
          src: '/video/talkboard/equation.mp4',
        },
        {
          type: 'video',
          subtitle: 'Exporting',
          description: 'Boards can be exported to PDF with a single click.',
          src: '/video/talkboard/pdf.mp4',
        },
      ],
    },
    {
      title: 'Flappy Bird (No Game Engine)',
      tech: ['C', 'OpenGL', 'GLUT'],
      github: '',
      demo: '',
      slides: [
        {
          type: 'image',
          subtitle: 'Overview',
          description: 'A Flappy Bird game developed without a game engine! Built entirely from scratch using C++ and OpenGL.',
          src: '/Flappybird.webp',
        },
        {
          type: 'video',
          subtitle: 'Core Gameplay Mechanics',
          description: 'This project recreates the core mechanics of the original Flappy Bird. It includes infinite obstacle generation, precise collision detection, dynamic score tracking, and a gravity-based movement system that closely mirrors the feel of the classic game.',
          src: '/video/flappybird/overview.mp4',
        },
        {
          type: 'video',
          subtitle: 'Interactive Scenery & Rendering',
          description: 'The game also supports dynamic scenery changes through mouse scrolling, allowing the background to shift while playing for a more immersive experience. Every element on screen is rendered using Linear Algebra calculations, transforming each pixel’s size, color, and position in real time.',
          src: '/video/flappybird/scene.mp4',
        },
      ],
    },
    {
      title: 'Quiz Reviewer Aggregator for Canvas LMS',
      tech: ['JavaScript/TypeScript', 'Canvas LMS API', 'Google Sheets API'],
      github: '',
      demo: '',
      slides: [
        {
          type: 'image',
          subtitle: 'Overview',
          description: 'A web extension that automates quiz reviewer compilation from Canvas LMS.',
          src: '/FACompiler.png',
        },
        {
          type: 'image',
          subtitle: 'Purpose',
          description: 'Developed in order to eliminate manual reviewer compilation by making use of various APIs to extract question and answers for FORMATIVE or UNGRADED tests.',
          src: '/FACompilerCanvas.png',
        },
        {
          type: 'image',
          subtitle: 'Users',
          description: 'Was actively used by 7 concurrent users which helped them focus more on reviewing deeper concepts rather than memorizing key words.',
          src: '/FACompilerSheets.png',
        },
      ],
    },
    {
      title: 'Chess',
      tech: ['Java', 'Java Swing', 'MVC'],
      github: '',
      demo: '',
      slides: [
        {
          type: 'image',
          subtitle: 'Overview',
          description: 'A standard Chess game built entirely with Java Swing. It features an interactive GUI that mimics a real chessboard and enforces all standard rules of play.',
          src: '/Chess.webp',
        },
        {
          type: 'video',
          subtitle: 'Game Mechanics',
          description: 'A classic two-player chess game designed to run on a single desktop computer. The system enforces standard chess rules by restricting illegal moves and supports special mechanics such as castling and en passant.',
          src: '/video/chess/chess-overview.mp4',
        },
        {
          type: 'video',
          subtitle: 'Interface & Player Experience',
          description: 'To simulate a real over-the-board experience, the board rotates after each player’s turn so both players can view the game from their perspective. The interface is built using Java Swing components, enabling real-time interaction and smooth visual updates.',
          src: '/video/chess/chess-2.mp4',
        },
      ],
    },
    {
      title: 'POS (Front-end still in progress)',
      tech: ['NestJS', 'MongoDB', 'ReactJS'],
      github: '',
      demo: '',
      slides: [
        {
          type: 'image',
          subtitle: 'Overview',
          description: 'A POS system that supports the management of: Users, Inventory, Restocking, and Selling. The API is already finished, however the front-end is still in progress. As of now, the whole system is being remade with the help of 3 other developers.',
          src: '/POS.avif',
        },
        {
          type: 'video',
          subtitle: 'User Management',
          description: 'Supports multiple users with different roles. Also allows editing current user info.',
          src: '/POS-user.mp4',
        },
        {
          type: 'video',
          subtitle: 'Inventory Management',
          description: 'Allows editing of current inventory details. Front-end does not yet support adding new items to the inventory.',
          src: '/POS-inventory.mp4',
        },
      ],
    },
    {
      title: 'Enrollment System API (Still in progress)',
      tech: ['NestJS', 'MongoDB', 'Docker'],
      github: '',
      demo: '',
      slides: [
        {
          type: 'image',
          subtitle: 'Overview',
          description: 'A school enrollment system API that includes the following modules: Authentication, Enrollment, Registration, and Management. Currently put on hold due to internship.',
          src: '/enroll.png',
        },
      ],
    },
  ])
</script>

<style scoped>
.projects-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CONTAINER */
.overlay-container {
  position: relative;
  width: 900px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

/* CLOSE */
.close-btn {
  position: absolute;
  top: -48px;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.close-btn:hover,
.close-btn:focus-visible {
  background-color: rgba(255, 255, 255, 0.15);
}

/* CARD */
.project-card {
  border-radius: 16px;
  overflow: hidden;
  background: #1e1e1e;
  color: white;
  display: flex;
  flex-direction: column;
  max-height: calc(90vh - 80px);
}

/* MEDIA */
.media-container {
  height: 420px;
  width: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.media {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* TEXT */
.project-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
}

.slide-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: #ff7a2f;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.project-description {
  color: #bbb;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* TECH */
.tech-stack {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

/* BUTTONS */
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* SLIDE DOTS */
.slide-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.slide-dot {
  width: 8px;
  height: 8px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: width 0.2s ease, background-color 0.2s ease;
}

.slide-dot.active {
  width: 24px;
  border-radius: 12px;
  background: #ff7a2f;
}

.slide-dot:hover,
.slide-dot:focus-visible {
  background: rgba(255, 255, 255, 0.8);
}

/* NAV */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  color: white;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.nav-btn:hover,
.nav-btn:focus-visible {
  background: rgba(255, 255, 255, 0.25);
}

.counter {
  font-size: 14px;
  font-weight: 500;
  min-width: 48px;
  text-align: center;
}

/* TABLET */
@media (max-width: 900px) {
  .media-container {
    height: 320px;
  }

  .project-title {
    font-size: 22px;
  }
}

/* MOBILE */
@media (max-width: 640px) {
  .overlay-container {
    max-width: 95vw;
  }

  .media-container {
    height: 240px;
  }

  .project-title {
    font-size: 20px;
  }

  .close-btn {
    top: -40px;
    right: -8px;
  }
}
</style>
