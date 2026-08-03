<template>
  <v-container class="hero-container" fluid>
    <div class="hero-inner">
      <!-- HELLO BADGE -->
      <div class="hello-badge">Hello!</div>

      <!-- TITLE -->
      <div class="text-center hero-text">
        <h1 class="hero-title">
          I'm <span class="accent">Mychal</span>,
          <br>
          Software Developer
        </h1>
      </div>

      <!-- INFO ROW -->
      <div class="info-row">
        <div class="quote">
          <div aria-hidden="true" class="quote-icon">“</div>

          <p>
            A 4th year student in Computer Science looking for his next internship as a software developer.
          </p>
        </div>

        <div class="stat">
          <span class="stat-number">1</span>
          <h2>Internship</h2>
          <p>Completed</p>
        </div>
      </div>

      <!-- IMAGE AREA -->
      <div class="image-wrapper">
        <div aria-hidden="true" class="circle" />

        <v-img
          alt="Portrait of Mychal Pejana"
          class="hero-image"
          eager
          src="@/assets/images/portrait-cropped.png"
          width="380"
        />

        <!-- GLASS BUTTON WRAPPER -->
        <div class="buttons-wrapper">
          <v-btn
            class="btn-primary"
            download
            href="/Pejana_Resume_Software_Engineer_Intern.pdf"
            size="large"
            target="_blank"
          >
            Resume <span aria-hidden="true" class="arrow">↗</span>
          </v-btn>

          <v-btn class="btn-secondary" href="#contact" size="large">
            Hire me
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.hero-container {
  min-height: 90vh;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 0;
}

.hero-inner {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* HELLO BADGE */
.hello-badge {
  display: inline-block;
  margin-top: 40px;
  padding: 6px 18px;
  border: 1px solid #000;
  border-radius: 20px;
  font-weight: 500;
}

/* TITLE */
.hero-text {
  margin-top: 40px;
}

.hero-title {
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 800;
  line-height: 1.1;
}

.accent {
  color: #ff7a2f;
}

/* INFO ROW */
.info-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 24px;
  margin-top: 60px;
  gap: 24px;
}

.quote {
  max-width: 240px;
}

.quote-icon {
  font-size: 50px;
  opacity: 0.4;
  line-height: 1;
}

.quote p {
  font-size: 14px;
  color: #444;
  margin-top: -12px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 48px;
  font-weight: 800;
  color: #ff7a2f;
  line-height: 1;
}

.stat h2 {
  font-size: 22px;
  font-weight: 600;
  margin: 4px 0 0;
}

.stat p {
  margin: 0;
  color: #666;
}

/* IMAGE AREA */
.image-wrapper {
  position: relative;
  margin-top: auto;
  text-align: center;
}

/* ORANGE CIRCLE */
.circle {
  position: absolute;
  width: min(600px, 90vw);
  height: 300px;
  background: #f5a261;
  border-radius: 300px 300px 0 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

/* IMAGE */
.hero-image {
  position: relative;
  z-index: 2;
  width: min(380px, 80vw);
}

/* BUTTON WRAPPER (GLASS) */
.buttons-wrapper {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;

  display: flex;
  gap: 16px;
  padding: 8px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/* PRIMARY BUTTON */
.btn-primary {
  background: #ff7a2f !important;
  color: white !important;
  padding: 12px 36px;
  border-radius: 999px;
  text-transform: none;
  font-weight: 600;
  box-shadow: none;
}

/* SECONDARY BUTTON */
.btn-secondary {
  background: transparent !important;
  color: #444 !important;
  padding: 12px 36px;
  border-radius: 999px;
  text-transform: none;
  font-weight: 500;
  box-shadow: none;
}

/* Arrow spacing */
.arrow {
  margin-left: 6px;
}

/* TABLET */
@media (max-width: 900px) {
  .info-row {
    padding: 0 40px;
    margin-top: 40px;
  }
}

/* MOBILE */
@media (max-width: 640px) {
  .hero-container {
    min-height: auto;
    padding-bottom: 40px;
  }

  .info-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 32px;
    gap: 32px;
  }

  .quote {
    max-width: 280px;
  }

  .quote-icon {
    font-size: 40px;
  }

  .image-wrapper {
    margin-top: 24px;
  }

  .circle {
    height: 200px;
  }

  .buttons-wrapper {
    position: relative;
    bottom: auto;
    margin-top: -40px;
    margin-bottom: 20px;
    flex-direction: column;
    width: min(280px, 80vw);
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
