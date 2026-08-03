<template>
  <section class="resume-section">

    <v-container>

      <!-- HEADER -->
      <div class="section-header">
        <h2>
          My <span class="accent">Resume</span>
        </h2>

        <p class="subtitle">
          A summary of my experience, skills, and education.
        </p>
      </div>

      <!-- RESUME CARD -->
      <div class="resume-container">

        <!-- PDF PREVIEW -->
        <div class="resume-preview">
          <iframe
            :src="resumePath"
            title="My Resume"
          ></iframe>
        </div>

        <!-- ACTIONS -->
        <div class="resume-actions">
          <v-btn
            class="download-btn"
            href="/Pejana_Resume_Software_Engineer_Intern.pdf"
            target="_blank"
            download
            size="large"
          >
            Download PDF
          </v-btn>
        </div>

      </div>

    </v-container>

  </section>
</template>

<script setup>
import resumePath from '/Pejana_Resume_Software_Engineer_Intern.pdf'
</script>

<style scoped>

.resume-section{
  padding:120px 0;
}

/* HEADER */

.section-header{
  text-align:center;
  margin-bottom:70px;
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

/* CONTAINER */

.resume-container{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:30px;
}

/* PDF PREVIEW */

.resume-preview{
  width:100%;
  max-width:800px;
  height:1000px;
  border-radius:12px;
  overflow:hidden;
  box-shadow:0 10px 30px rgba(0,0,0,0.08);
  background:white;
}

.resume-preview iframe{
  width:100%;
  height:100%;
  border:none;
}

/* BUTTON */

.resume-actions{
  display:flex;
  justify-content:center;
}

.download-btn{
  background:#ff7a2f;
  color:white;
  font-weight:600;
  padding:12px 28px;
  border-radius:8px;
}

</style>