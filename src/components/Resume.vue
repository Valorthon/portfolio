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
            title="My Resume preview"
          />
        </div>

        <!-- ACTIONS -->
        <div class="resume-actions">
          <v-btn
            class="download-btn"
            download
            :href="resumePath"
            prepend-icon="mdi-download"
            size="large"
            target="_blank"
          >
            Download PDF
          </v-btn>

          <v-btn
            class="view-btn"
            :href="resumePath"
            prepend-icon="mdi-open-in-new"
            rel="noopener noreferrer"
            size="large"
            target="_blank"
            variant="outlined"
          >
            View in new tab
          </v-btn>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
  const resumePath = '/Resume.pdf'
</script>

<style scoped>
.resume-section {
  padding: 120px 0;
}

/* HEADER */
.section-header {
  text-align: center;
  margin-bottom: 70px;
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

/* CONTAINER */
.resume-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

/* PDF PREVIEW */
.resume-preview {
  width: 100%;
  max-width: 800px;
  height: min(1000px, 70vh);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background: white;
}

.resume-preview iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* BUTTONS */
.resume-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.download-btn {
  background: #ff7a2f;
  color: white;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 8px;
}

.view-btn {
  color: #444;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 8px;
  border-color: #ff7a2f;
}

/* MOBILE */
@media (max-width: 640px) {
  .resume-section {
    padding: 80px 0;
  }

  .resume-preview {
    height: 60vh;
  }

  .resume-actions {
    width: 100%;
    flex-direction: column;
  }

  .download-btn,
  .view-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
