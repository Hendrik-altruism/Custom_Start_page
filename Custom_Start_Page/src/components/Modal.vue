<script setup>
import { ref } from 'vue';

import ChevronIcon from './icons/IconChevronRight.vue';
import CloseIcon from './icons/IconClose.vue';

defineProps({
  content: {
    required: true,
  },
});

defineEmits(['close']);

const linkRefs = ref({});

let search = (url) => {
  window.location.href = url;
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
}
</script>

<template>
    <div class="modal-container" role="dialog" :aria-label="content.title">
      <div class="title">
        {{ content.title }}
        <button type="button" class="close-button" title="Schließen" @click="$emit('close')">
          <CloseIcon />
        </button>
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
  width: min(92vw, 34rem);
  background-color: var(--color-modal-bg);
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  max-height: 70vh;
  overflow: auto;
  padding-bottom: 16px;
  animation: pop 0.2s ease-out;
}

@keyframes pop {
  from { opacity: 0; transform: translate(-50%, -46%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
}

.title{
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 56px 10px;
  font-weight: 500;
  font-size: 1.8rem;
  color: var(--color-heading);
  background-color: var(--color-modal-bg);
}

.close-button{
  position: absolute;
  right: 18px;
  display: flex;
  padding: 6px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.close-button:hover{
  background-color: var(--color-hover-text);
  color: var(--color-heading);
}

.links{
  color: var(--color-accent-text);
}

.front-search{
  padding: 7px 30px;
  border-left: 3px solid transparent;
  transition: background-color 0.15s ease;
}

.front-search:hover {
  cursor: pointer;
  background-color: var(--color-hover-text);
  border-left-color: var(--color-accent-text);
}

.sublink{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 30px;
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