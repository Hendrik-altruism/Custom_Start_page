<script setup>
import { ref } from 'vue';

import ChevronIcon from './icons/IconChevronRight.vue';

const props = defineProps({
  content: {
    required: true,
  },
});

const linkRefs = ref({});

let search = (url) => {
  window.open(url, "_self");
}

const setLinkRef = (index) => (el) => {
  if (el) {
    linkRefs.value[`link-${index}`] = el;
  }
};

let toggle = (link) => {
  const element = linkRefs.value[link];
  if (element.classList.contains("open")) {
    element.classList.remove("open")
  }else{
    element.classList.add("open")
  }
  console.log(element)
}
</script>

<template>
    <div class="modal-container">
      <div class="title">
        {{ content.title }}
      </div>
      <div class="links">
        <div v-for="(item, index) in content.links" :key="index">

          <div v-if="Array.isArray(Object.values(item)[0])" class="open-search" :ref="setLinkRef(index)">
            <div class="sublink" @click="toggle('link-'+index)">
              {{ Object.keys(item)[0] }}
              <ChevronIcon class="chevron-icon"/>
            </div>
            <div class="sublink-box">
              <div v-for="(sublink, subIndex) in Object.values(item)[0]" :key="subIndex" class="front-search sub-front-search" @click="search(Object.values(sublink)[0])">
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
  top: 35%; 
  left: 50%;
  transform: translateX(-50%); 
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
  cursor: pointer;
  font-weight: 600;
}

.sub-front-search{
  padding-left: 60px;
}

.sublink-box{
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.open .sublink-box{
  max-height: 500px;
}

.chevron-icon{
  transition: transform 0.3s ease;
}

.open .chevron-icon{
  transform: rotate(90deg);
}
</style>