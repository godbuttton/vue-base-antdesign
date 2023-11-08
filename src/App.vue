<template>
  <div>
    <a-config-provider :component-size="'middle'" :theme="theme">
      <router-view> </router-view>
    </a-config-provider>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
const theme = {
  token: {
    colorPrimary: '#0f998d',
    colorWarning: '#FAAD14',
    borderRadius: 2,
    wireframe: false
  }
}
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
