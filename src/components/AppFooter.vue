<template>
  <footer class="app-footer">
    <v-container class="footer-inner">
      <div class="footer-left">
        <span class="footer-name">Mychal Pejana</span>
        <span class="footer-year">© {{ currentYear }}</span>
      </div>

      <div class="footer-links">
        <a
          v-for="link in links"
          :key="link.href"
          :aria-label="link.label"
          class="footer-link"
          :href="link.href"
          rel="noopener noreferrer"
          target="_blank"
        >
          <v-icon size="22">{{ link.icon }}</v-icon>
        </a>
      </div>
    </v-container>
  </footer>
</template>

<script setup lang="ts">
  const currentYear = new Date().getFullYear()

  const links = [
    { href: 'https://github.com/saltinstillwaters', icon: 'mdi-github', label: 'GitHub' },
    { href: 'mailto:mychalpejana.mp@gmail.com', icon: 'mdi-email', label: 'Email' },
  ]
</script>

<style scoped>
.app-footer {
  background: #1a1a1a;
  color: #9aa4b2;
  padding: 32px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-name {
  font-weight: 600;
  color: white;
}

.footer-year {
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 16px;
}

.footer-link {
  color: #9aa4b2;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-link:hover,
.footer-link:focus-visible {
  color: #ff7a2f;
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
