<script setup>
import ChevronIcon from './icons/IconChevronRight.vue';


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
        <div v-for="(item, index) in content.links" :key="index">

          <div v-if="Array.isArray(Object.values(item)[0])" class="open-search">
            <div class="sublink">
              {{ Object.keys(item)[0] }}
              <ChevronIcon />
            </div>
            <div v-for="(sublink, subIndex) in Object.values(item)[0]" :key="subIndex" class="sublink-box">
              <div class="front-search sub-front-search" @click="search(sublink)">
                {{ Object.keys(sublink)[0] }}
              </div>
            </div>
          </div>

          <div v-else class="front-search"  @click="search(Object.values(item)[0])">
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
  padding-bottom: 20px; 
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

.front-search{
  padding: 5px 30px;
}

.front-search:hover {
  cursor: pointer;
  background-color: var(--color-hover-text);
  border-left: 3px solid var(--color-border);
}

.sublink{
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
}

.sub-front-search{
  padding-left: 60px;
}
</style>