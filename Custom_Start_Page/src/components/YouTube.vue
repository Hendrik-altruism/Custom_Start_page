<script setup>
import YouTubeIcon from './icons/IconYouTube.vue'
</script>

<template>
  <div class="box">
  <h1 class="green">Youtube</h1>
  <YouTubeIcon />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.box h1,
.box h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .box h1,
  .box h3 {
    text-align: left;
  }
}
</style>
