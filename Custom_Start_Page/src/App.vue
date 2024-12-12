<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import DolphinIcon from './components/icons/IconDolphin.vue'
import DolphinMirrorIcon from './components/icons/IconDolphinMirror.vue'
</script>

<template>
  <header>
    <DolphinMirrorIcon />

    <div class="wrapper">
      <Header msg="Hendriks Startpage" />

      <nav>
        <RouterLink to="/">Desktop</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/game">Custom Game</RouterLink>
      </nav>
    </div>
    
    <DolphinIcon />
  </header>

  <RouterView />
</template>

<style scoped>
header {
    display: flex;
    place-items: center;
    justify-content: space-between;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
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
