<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import DirkIcon from './components/icons/IconDirk.vue'

import { openDB } from './assets/indexedDB'

window.onload = openDB();
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
    place-items: center;
    justify-content: space-between;
    background-color: var(--color-header-bg);
    padding: 30px;  
    height: var(--header-height);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

header .wrapper{
  display: flex;
  align-items: center;
  gap: 3em;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
