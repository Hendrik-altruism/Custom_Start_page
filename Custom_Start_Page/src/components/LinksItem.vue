<script setup>
import { ref } from 'vue';

import SearchIcon from './icons/IconSearch.vue';
import HistoryIcon from './icons/IconHistory.vue';
import CloseIcon from './icons/IconClose.vue';
import { saveSearch, loadSearches, deleteByQuery } from '../assets/indexedDB.js';

const props = defineProps({
  modalType: {
    type: String,
    required: true,
  },
});

let searchHistoryItems = ref([]);
let textInput = ref(null);

let search = () => {
    let url = "";
    let query = textInput.value.value;
    switch (props.searchbarType) {
        case "springer":
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            saveSearch(query, "springer");
            break;
        
        case "google":
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            saveSearch(query, "google");
            break;
        
        case "scholar":
            url = `https://scholar.google.de/scholar?hl=de&as_sdt=0%2C5&q=${encodeURIComponent(query)}&btnG=`;
            saveSearch(query, "scholar");
            break;

        default:
            break;
    }
    textInput.value.value = "";
    window.open(url, "_self");
}
</script>

<template>
    <div class="search-container">
      <div class="input-container">
        <input ref="textInput" placeholder="Suche..." id="searchbar" class="searchbar-element search-string" @focusin="focusIn" @focusout="(event) => focusOut(event)" @keyup.enter="search" @keyup.escape="focusOut" @input="updateSearches" @keyup.up="changeSelect(-1)" @keyup.down="changeSelect(1)">
        <SearchIcon />
      </div>
      <div class="searches">
        <div v-for="(item, index) in searchHistoryItems" :key="index" class="search-item">
          <div v-if="keyPos == index" class="search-element focused-search">
            <div class="front-search"  @click="changeInput(item)">
              <HistoryIcon />
              {{ item }}
            </div>
            <CloseIcon class="close-icon" @click="deleteHistory(item)"/>
          </div>
          <div v-else class="search-element">
            <div class="front-search"  @click=" changeInput(item)">
              <HistoryIcon />
              {{ item }}
            </div>
            <CloseIcon class="close-icon" @click="deleteHistory(item)"/>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

.searchbar-element{
    font-size: large;
}

.search-container{
    border-radius: 20px;
    background-color: var(--color-accent2);
    display: flex;
    flex-direction: column;
    position: relative;
  }

.input-container{
  display: flex;
  align-items: center;
  padding: 20px;
  height: var(--searchbar-height);
  z-index: 200;
}

.searches{
  background-color: var(--color-accent2);
  border-radius: calc(.5 * var(--searchbar-height));
  padding-top: var(--searchbar-height);
  position: absolute; 
  z-index: 100;
  width: 100%;
}

.search-element{
  display: flex;
  align-items: center;
}

.front-search{
  display: flex;
  align-items: center;
  gap: 5px;
  flex-grow: 2;
  padding: 10px 0px 10px 30px;
  margin-right: 40px;
}

.search-item:last-of-type{
  padding-bottom: 20px;
}

.search-element:hover{
  background-color: var(--color-accent-text);
  cursor: pointer;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}

.focused-search{
  background-color: var(--color-accent-text);
  border-left: solid 3px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}

.search-string{
    border: none;
    outline: none;
    width: 5rem;
    font-weight: 500;
    background: transparent;
    animation-name: bar-1;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    color: var(--color-heading);
}

.close-icon{
  display: none;
  border-radius: 30px;
  margin-right: 15px;
}

.search-element:hover > .close-icon{
  display: inline;
}

.focused-search > .close-icon{
  display: inline;
}

.close-icon:hover{
  background-color: var(--color-accent2);
}


::placeholder{
  color: var(--color-text);
}

@keyframes bar-1 {
  from {width: 10rem;}
  to {width: 35rem;}
}
</style>