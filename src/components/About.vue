<template>
  <v-container class="hero-container" fluid>

    <!-- HELLO BADGE -->
    <div class="hello-badge">
      Hello!
    </div>

    <!-- TITLE -->
    <div class="text-center hero-text">
      <h1 class="hero-title">
        I'm <span class="accent">Mychal</span>,
        <br />
        Software Developer
      </h1>
    </div>

    <!-- SIDE LEFT -->
    <div class="side-left">
      <div class="quote">
        <div class="quote-icon">“</div>
        <p>
          A 4th year student in Computer Science looking for his next internship as a software developer
        </p>
      </div>
    </div>

    <!-- SIDE RIGHT -->
    <div class="side-right">
      <div class="rating">
        ⭐⭐⭐⭐⭐
        <h2>1 Internship</h2>
        <p>Completed</p>
      </div>
    </div>

    <!-- IMAGE AREA -->
    <div class="image-wrapper">

      <div class="circle"></div>

      <v-img src="@/assets/images/portrait-cropped.png" width="380" class="hero-image" />

      <!-- GLASS BUTTON WRAPPER -->
      <div class="buttons-wrapper">
        <v-btn class="btn-primary" href="/Pejana_Resume_Software_Engineer_Intern.pdf" target="_blank" download
          size="large">
          Resume <span class="arrow">↗</span>
        </v-btn>

        <v-btn class="btn-secondary" size="large" href="#contact">
          Hire me
        </v-btn>
      </div>

    </div>

  </v-container>
</template>


<style scoped>
.hero-container {
  position: relative;
  min-height: 90vh;
  background: #f5f5f5;
  overflow: hidden;
}

/* HELLO BADGE */
.hello-badge {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 18px;
  border: 1px solid #000;
  border-radius: 20px;
  font-weight: 500;
}

/* TITLE */
.hero-text {
  margin-top: 120px;
}

.hero-title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1;
}

.accent {
  color: #ff7a2f;
}

/* SIDE LEFT */
.side-left {
  position: absolute;
  left: 60px;
  top: 300px;
  width: 240px;
}

.quote-icon {
  font-size: 50px;
  opacity: 0.4;
}

.quote p {
  font-size: 14px;
  color: #444;
}

/* SIDE RIGHT */
.side-right {
  position: absolute;
  right: 60px;
  top: 320px;
  text-align: center;
}

.rating h2 {
  font-size: 36px;
  margin: 0;
}

.rating p {
  margin: 0;
  color: #666;
}

/* IMAGE AREA */
.image-wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

/* ORANGE CIRCLE */
.circle {
  position: absolute;
  width: 600px;
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
}

/* BUTTON WRAPPER (GLASS) */
.buttons-wrapper {
  position: absolute;
  top: 400px;
  /* adjust this to position vertically */
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
</style>