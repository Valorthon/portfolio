<template>
  <section class="experience-section">

    <v-container>

      <!-- HEADER -->
      <div class="section-header">
        <h2>
          My Internship at <br>
          <span class="accent">Circuit Solutions Inc.</span>
        </h2>

        <p class="subtitle">
          Junior Web Developer · Dec 2025 – Mar 2026
        </p>
      </div>

      <!-- TIMELINE -->
<div class="timeline">

  <!-- ITEM -->
  <div class="timeline-item">

    <div class="timeline-left">
      <h3>Onboarding</h3>
      <p class="date">Dec 2025 – Jan 2026</p>
    </div>

    <div class="timeline-center">
      <div class="dot"></div>
    </div>

    <div class="timeline-right">
      <p>
        I was introduced to the company's workflow, tools, and development
        practices. During this time, I also learned the core technologies used
        by the team, including <strong>Vuetify</strong> and
        <strong>Laravel</strong>.
      </p>
    </div>

  </div>

  <!-- ITEM -->
  <div class="timeline-item">

    <div class="timeline-left">
      <h3>Project Assignment</h3>
      <p class="date">Jan 2026</p>
    </div>

    <div class="timeline-center">
      <div class="dot"></div>
    </div>

    <div class="timeline-right">
      <p>
        After onboarding, I was assigned to a web development project and
        introduced to the system's goals and requirements.
      </p>
    </div>

  </div>

  <!-- ITEM -->
  <div class="timeline-item">

    <div class="timeline-left">
      <h3>Design Phase</h3>
      <p class="date">Jan 2026 – Feb 2026</p>
    </div>

    <div class="timeline-center">
      <div class="dot"></div>
    </div>

    <div class="timeline-right">
      <p>
        I joined weekly stakeholder meetings where we presented the website
        prototype and gathered feedback to refine the design and improve the
        overall user experience.
      </p>
    </div>

  </div>

  <!-- ITEM -->
  <div class="timeline-item">

    <div class="timeline-left">
      <h3>Implementation Phase</h3>
      <p class="date">March 2026</p>
    </div>

    <div class="timeline-center">
      <div class="dot"></div>
    </div>

    <div class="timeline-right">
      <p>
        I implemented the approved prototype using
        <strong>Vue.js</strong> and <strong>Vuetify</strong>, building
        responsive UI components with
        <strong>JavaScript, HTML, and CSS</strong>.
      </p>
    </div>

  </div>

</div>

    </v-container>

  </section>
</template>

<style scoped>

.experience-section{
  padding:120px 0;
}

/* HEADER */

.section-header{
  text-align:center;
  margin-bottom:90px;
}

.section-header h2{
  font-size:42px;
  font-weight:700;
}

.subtitle{
  margin-top:12px;
  color:#7b8794;
  font-size:16px;
}

.accent{
  color:#ff7a2f;
}

/* TIMELINE */

.timeline{
  position:relative;
  display:flex;
  flex-direction:column;
  gap:70px;
}

/* vertical line */

.timeline::before{
  content:"";
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  top:0;
  bottom:0;
  width:2px;
  background:#cfd6e0;
}

/* ITEM */

.timeline-item{
  display:grid;
  grid-template-columns:1fr 120px 1fr;
  align-items:center;
}

/* LEFT */

.timeline-left{
  text-align:right;
  padding-right:40px;
}

.timeline-left h3{
  font-size:22px;
  font-weight:600;
}

.date{
  margin-top:6px;
  color:#8a94a6;
}

/* CENTER */

.timeline-center{
  display:flex;
  justify-content:center;
  position:relative;
}

.dot{
  width:20px;
  height:20px;
  background:#ff7a2f;
  border-radius:50%;
  border:4px solid white;
  z-index:2;
}

/* RIGHT */

.timeline-right{
  padding-left:40px;
}

.timeline-right p{
  color:#7b8794;
  line-height:1.7;
  max-width:420px;
}

</style>