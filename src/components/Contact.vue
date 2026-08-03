<template>
  <section class="contact-section">
    <v-container>
      <!-- HEADER -->
      <div class="section-header">
        <h2>
          Contact <span class="accent">Me</span>
        </h2>

        <p class="subtitle">
          I'll be awaiting your message through the form below!
        </p>
      </div>

      <div class="contact-layout">
        <!-- CONTACT INFO -->
        <div class="contact-info">
          <a
            class="contact-item"
            href="mailto:mychalpejana.mp@gmail.com"
            rel="noopener noreferrer"
          >
            <v-icon class="contact-icon">mdi-email</v-icon>
            <span>mychalpejana.mp@gmail.com</span>
          </a>

          <a
            class="contact-item"
            href="https://github.com/saltinstillwaters"
            rel="noopener noreferrer"
            target="_blank"
          >
            <v-icon class="contact-icon">mdi-github</v-icon>
            <span>github.com/saltinstillwaters</span>
          </a>

          <a class="contact-item" href="tel:+639554813800">
            <v-icon class="contact-icon">mdi-phone</v-icon>
            <span>09554813800</span>
          </a>
        </div>

        <!-- CONTACT FORM -->
        <v-card class="contact-card">
          <v-form ref="form" @submit.prevent="sendMessage">
            <v-card-text>
              <v-text-field
                v-model="name"
                aria-required="true"
                class="contact-input"
                density="comfortable"
                :disabled="loading"
                label="Name"
                :rules="nameRules"
                variant="outlined"
              />

              <v-text-field
                v-model="email"
                aria-required="true"
                class="contact-input"
                density="comfortable"
                :disabled="loading"
                label="Email"
                :rules="emailRules"
                variant="outlined"
              />

              <v-textarea
                v-model="message"
                aria-required="true"
                class="contact-input"
                density="comfortable"
                :disabled="loading"
                label="Message"
                rows="4"
                :rules="messageRules"
                variant="outlined"
              />

              <v-btn
                block
                class="send-btn"
                :disabled="loading || submitted"
                :loading="loading"
                size="large"
                type="submit"
              >
                {{ submitted ? 'Message Sent' : 'Send Message' }}
              </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </div>
    </v-container>

    <!-- NOTIFICATIONS -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="top"
      role="alert"
      :timeout="5000"
    >
      {{ snackbar.text }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script setup lang="ts">
  import emailjs from '@emailjs/browser'
  import { ref } from 'vue'
  import { VForm } from 'vuetify/components'

  const name = ref('')
  const email = ref('')
  const message = ref('')
  const loading = ref(false)
  const submitted = ref(false)

  const form = ref<InstanceType<typeof VForm> | null>(null)

  const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
  })

  const nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => v.length >= 2 || 'Name must be at least 2 characters',
    (v: string) => v.length < 100 || 'Too long',
  ]

  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.[^\n\r@\u2028\u2029]*@.+\..+/.test(v) || 'Email must be valid',
    (v: string) => v.length < 100 || 'Too long',
  ]

  const messageRules = [
    (v: string) => !!v || 'Message is required',
    (v: string) => v.length >= 5 || 'Message must be at least 5 characters',
    (v: string) => v.length < 100 || 'Too long',
  ]

  function showSnackbar (text: string, color: 'success' | 'error') {
    snackbar.value = { show: true, text, color }
  }

  async function sendMessage () {
    const { valid } = await form.value?.validate() ?? { valid: false }
    if (!valid) return

    loading.value = true

    try {
      await emailjs.send(
        'service_ozshpxi',
        'template_b5rpqvy',
        {
          name: name.value,
          email: email.value,
          message: message.value,
        },
        'YdV_0ntuoaO-qeRMH',
      )

      showSnackbar('Message sent successfully!', 'success')
      submitted.value = true

      name.value = ''
      email.value = ''
      message.value = ''
      form.value?.reset()
    } catch (error) {
      showSnackbar('Failed to send message. Please try again.', 'error')
      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>
.contact-section {
  padding: 140px 0;
  background: linear-gradient(
    180deg,
    #232323 0%,
    #1a1a1a 100%
  );
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}

/* HEADER */
.section-header {
  text-align: center;
  margin-bottom: 90px;
  color: white;
}

.section-header h2 {
  font-size: clamp(32px, 5vw, 44px);
  font-weight: 700;
}

.subtitle {
  margin-top: 14px;
  color: #9aa4b2;
  font-size: 17px;
}

.accent {
  color: #ff7a2f;
}

/* LAYOUT */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: start;
}

/* CONTACT INFO */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  color: #e6e6e6;
  padding: 14px 18px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.contact-item:hover,
.contact-item:focus-visible {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

.contact-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-icon {
  color: #ff7a2f;
  flex-shrink: 0;
}

/* CARD */
.contact-card {
  padding: 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  box-shadow:
    0 12px 35px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* INPUT */
.contact-input {
  margin-bottom: 16px;
}

.contact-input :deep(.v-field) {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
}

/* BUTTON */
.send-btn {
  margin-top: 10px;
  background: #ff7a2f;
  color: white;
  font-weight: 700;
  letter-spacing: 0.6px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(255, 122, 47, 0.35);
  transition: all 0.25s ease;
}

.send-btn:hover:not(:disabled),
.send-btn:focus-visible:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255, 122, 47, 0.45);
}

/* MOBILE */
@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

@media (max-width: 640px) {
  .contact-section {
    padding: 80px 0;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }

  .section-header {
    margin-bottom: 60px;
  }

  .contact-card {
    padding: 20px;
  }

  .contact-item {
    font-size: 16px;
  }
}
</style>
