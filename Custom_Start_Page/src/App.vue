<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import DirkIcon from './components/icons/IconDirk.vue'

import { openDB } from './assets/indexedDB'

openDB().catch((error) => console.error('Datenbank konnte nicht geöffnet werden:', error));
</script>

<template>
  
  <header>
    <div class="wrapper">
      <DirkIcon />    
      <Header msg="" />
    </div>
    <nav>
      <RouterLink to="/">Desktop</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
      <RouterLink to="/game">Custom Game</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--color-header-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 0 2.5rem;
  height: var(--header-height);
}

header .wrapper{
  display: flex;
  align-items: center;
  gap: 3em;
}

nav {
  display: flex;
  gap: 0.25rem;
  padding: 4px;
  border-radius: 999px;
  background-color: var(--color-hover-text);
}

nav a {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-weight: 500;
}

nav a.router-link-exact-active {
  color: var(--color-heading);
  background-color: var(--color-accent2);
}

@media (max-width: 700px) {
  header {
    padding: 0 1rem;
  }

  nav a {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
}
</style>
