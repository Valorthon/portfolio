<template>

  <section id="about">
    <About />
  </section>

  <section id="projects">
    <Projects @onClick="projectClick" />
  </section>

  <ProjectOverlay
    :open-overlay="openOverlay"
    :project-id="projectId"
    @closed="openOverlay = false"
  />

  <section id="experience">
    <Experience />
  </section>

  <section id="resume">
    <Resume />
  </section>

  <section id="contact">
    <Contact />
  </section>

</template>

<script setup>
import { ref } from 'vue'

const projectId = ref(0)
const openOverlay = ref(false)

function projectClick(i) {
  openOverlay.value = true
  projectId.value = i
}
</script>