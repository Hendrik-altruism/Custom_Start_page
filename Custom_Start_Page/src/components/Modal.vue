<script setup>

const props = defineProps({
  content: {
    required: true,
  },
});

let search = (url) => {
  window.open(url, "_self");
}

</script>

<template>
    <div class="modal-container">
      <div class="title">
        {{ content.title }}
      </div>
      <div class="links">
        <div v-for="(item, index) in content.links" :key="index" class="link-item">
          <div class="front-search"  @click="search(Object.values(item)[0])">
              {{ Object.keys(item)[0] }}
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

.modal-container{
  min-width: 30vw;
  background-color: var(--color-modal-bg);
  z-index: 100;
  position: fixed;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  border-radius: 30px;
  max-height: 60vh; 
  overflow: auto;   
}

.title{
  display: flex;
  justify-content: center;
  padding: 10px;
  font-weight: 500;
  font-size: 2rem;
}

.links{
  color: var(--color-accent-text);
}

.link-item{
  padding: 5px 30px;
}

.link-item:hover {
  cursor: pointer;
  background-color: var(--color-hover-text);
  border-left: 3px solid var(--color-border);
}

.link-item:last-of-type{
  margin-bottom: 20px;
}
</style>