<template>
  <section class="experience-section">
    <v-container>
      <!-- HEADER -->
      <div class="section-header">
        <h2>
          My Internship at <br>
          <span class="accent">Nebula Stack Labs</span>
        </h2>

        <p class="subtitle">
          UI Engineering Intern · Jan 2026 – Apr 2026
        </p>
      </div>

      <!-- TIMELINE -->
      <div class="timeline">
        <div
          v-for="(item, index) in items"
          :key="index"
          :ref="(el) => setItemRef(el as HTMLElement, index)"
          class="timeline-item"
          :class="{ 'is-visible': visibleItems[index] }"
        >
          <div class="timeline-content">
            <h3>{{ item.title }}</h3>
            <p class="date">{{ item.date }}</p>
          </div>

          <div class="timeline-center">
            <div class="dot" />
          </div>

          <div class="timeline-description">
            <p v-html="item.description" />
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'

  const items = [
    {
      title: 'Onboarding',
      date: 'Jan 2026',
      description: 'I was introduced to the team\'s design system, workflow, and development practices. During this time, I also learned the core technologies used by the team, including <strong>Figma</strong>, <strong>Vue.js</strong>, and <strong>Tailwind CSS</strong>.',
    },
    {
      title: 'Project Assignment',
      date: 'Feb 2026',
      description: 'After onboarding, I was assigned to a dashboard redesign project and introduced to the product goals and technical requirements.',
    },
    {
      title: 'Design Phase',
      date: 'Feb 2026 – Mar 2026',
      description: 'I joined weekly design reviews where we presented interface prototypes and gathered feedback to refine the layout and improve the overall user experience.',
    },
    {
      title: 'Implementation Phase',
      date: 'Apr 2026',
      description: 'I implemented the approved prototype using <strong>Vue.js</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>, building responsive UI components with <strong>HTML</strong> and accessibility in mind.',
    },
  ]

  const visibleItems = ref<boolean[]>(Array.from({ length: items.length }, () => false))

  let observer: IntersectionObserver | null = null
  const itemRefs = ref<(HTMLElement | null)[]>([])

  function setItemRef (el: HTMLElement | null, index: number) {
    if (el) {
      itemRefs.value[index] = el
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const index = Number(target.dataset.index)
            if (!Number.isNaN(index)) {
              visibleItems.value[index] = true
            }
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' },
    )

    for (const [i, el] of itemRefs.value.entries()) {
      if (el) {
        el.dataset.index = String(i)
        observer?.observe(el)
      }
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
</script>

<style scoped>
.experience-section {
  padding: 120px 0;
}

/* HEADER */
.section-header {
  text-align: center;
  margin-bottom: 90px;
}

.section-header h2 {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 700;
}

.subtitle {
  margin-top: 12px;
  color: #7b8794;
  font-size: 16px;
}

.accent {
  color: #ff7a2f;
}

/* TIMELINE */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 70px;
}

/* vertical line */
.timeline::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  background: #cfd6e0;
}

/* ITEM */
.timeline-item {
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  align-items: center;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-content {
  text-align: right;
  padding-right: 40px;
}

.timeline-content h3 {
  font-size: 22px;
  font-weight: 600;
}

.date {
  margin-top: 6px;
  color: #8a94a6;
}

/* CENTER */
.timeline-center {
  display: flex;
  justify-content: center;
  position: relative;
}

.dot {
  width: 20px;
  height: 20px;
  background: #ff7a2f;
  border-radius: 50%;
  border: 4px solid white;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(255, 122, 47, 0.15);
}

/* DESCRIPTION */
.timeline-description {
  padding-left: 40px;
}

.timeline-description p {
  color: #7b8794;
  line-height: 1.7;
  max-width: 420px;
}

/* TABLET */
@media (max-width: 900px) {
  .timeline-item {
    grid-template-columns: 1fr 80px 1fr;
  }

  .timeline-content {
    padding-right: 24px;
  }

  .timeline-description {
    padding-left: 24px;
  }
}

/* MOBILE */
@media (max-width: 640px) {
  .experience-section {
    padding: 80px 0;
  }

  .section-header {
    margin-bottom: 60px;
  }

  .timeline {
    gap: 48px;
  }

  .timeline::before {
    left: 16px;
    transform: none;
  }

  .timeline-item {
    grid-template-columns: 48px 1fr;
    align-items: start;
  }

  .timeline-content {
    grid-column: 2;
    text-align: left;
    padding-right: 0;
    padding-left: 16px;
  }

  .timeline-center {
    grid-column: 1;
    grid-row: 1;
    justify-content: flex-start;
  }

  .timeline-description {
    grid-column: 2;
    padding-left: 16px;
    margin-top: -24px;
  }

  .timeline-description p {
    max-width: 100%;
  }
}
</style>
