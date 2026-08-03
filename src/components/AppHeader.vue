<template>
  <div class="floating-appbar d-flex align-center">
    <!-- LEFT NAV -->
    <div class="d-flex align-center">
      <!-- <v-btn to="/" class="nav-btn" variant="text">About</v-btn> -->
      <v-btn class="nav-btn" variant="text" href="#projects">Projects</v-btn>
      <v-btn class="nav-btn" variant="text" href="#experience">Experience</v-btn>
    </div>

    <v-spacer />

    <!-- CENTER LOGO -->
    <div class="d-flex align-center logo px-20">
      <v-avatar color="#FD853A" size="32">
        <span class="text-white font-weight-bold">MP</span>
      </v-avatar>
      <span class="logo-text pl-2">MPejana</span>
    </div>

    <v-spacer />

    <!-- RIGHT NAV -->
    <div class="d-flex align-center">
      <v-btn class="nav-btn" variant="text" href="#resume">Resume</v-btn>
      <v-btn class="nav-btn" variant="text" href="#contact">Contact Me</v-btn>
      <!-- <v-btn class="nav-btn" variant="text">Contact</v-btn> -->
    </div>
  </div>
</template>

<style scoped>
.floating-appbar {
  width: 80%;
  /* desired width */
  margin: 16px auto;
  /* center horizontally */
  background-color: black;
  border-radius: 50px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  /* sticks relative to scroll container */
  top: 16px;
  /* distance from top of viewport */
  z-index: 100;
  /* stay on top of other content */

  /* Optional floating look */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  /* optional floating effect */
}

.nav-btn {
  text-transform: none;
  font-weight: 500;
  color: white;
  border-radius: 30px;
  min-height: 60px;
  padding: 0 40px;
}

.logo-text {
  font-weight: 700;
  color: white;
}
</style>