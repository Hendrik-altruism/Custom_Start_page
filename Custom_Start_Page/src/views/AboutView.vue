<script setup>
import YouTube from '../components/YouTube.vue'
</script>

<template>
  <div class="about">
    <YouTube />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
