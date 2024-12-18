<script setup>
import { ref } from 'vue';

import SearchIcon from './icons/IconSearch.vue';
import HistoryIcon from './icons/IconHistory.vue';
import { saveSearch, loadSearches } from './../assets/indexedDB.js';

const props = defineProps({
  searchbarType: {
    type: String,
    required: true,
  },
});

let searchHistoryItems = ref([]);
let textInput = ref(null);
let keyPos = ref(-1);

let focusIn = () => {
  document.querySelectorAll(".searchsvg").forEach(element => {
    element.style.display = "none";
  });
  updateSearches();
}

let focusOut = (event) => {
  document.querySelectorAll(".searchsvg").forEach(element => {
        element.style.display = "flex";
      });
  textInput.value.value = "";
  keyPos.value = -1;
  event.target.parentElement.parentElement.parentElement.style.display = "none";
}

let updateSearches = async () => {
  keyPos.value = -1;
  const searches = await loadSearches(props.searchbarType);
  const results = searches.filter((element) => element.query.toLowerCase().includes(textInput.value.value.toLowerCase()));
  addSearchHistory(results)
}

let search = () => {
    let url = "";
    let query = textInput.value.value;
    switch (props.searchbarType) {
        case "springer":
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            saveSearch(textInput.value.value, "springer");
            break;
        
        case "google":
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            saveSearch(textInput.value.value, "google");
            break;
        
        case "scholar":
            url = `https://scholar.google.de/scholar?hl=de&as_sdt=0%2C5&q=${encodeURIComponent(query)}&btnG=`;
            saveSearch(textInput.value.value, "scholar");
            break;

        default:
            break;
    }
    window.open(url, '_blank');
}

let addSearchHistory = (searches) => {
  searchHistoryItems.value = [];
  for (let i = (searches.length-1); i >= 0 && i > (searches.length-6); i--){
    searchHistoryItems.value.push(searches[i]["query"])
  }
};

let changeSelect = (value) => {
  console.log(searchHistoryItems.value.length)
  if(keyPos.value+value >= searchHistoryItems.value.length){
    keyPos.value = 0;
  }else if(keyPos.value+value < 0){
    keyPos.value = searchHistoryItems.value.length-1;
  }else{
    keyPos.value = keyPos.value+value;
  }
  if(searchHistoryItems.value.length>0){
    textInput.value.value = searchHistoryItems.value[keyPos.value]
  }
}
</script>

<template>
    <div class="search-container">
      <div class="input-container">
        <input ref="textInput" placeholder="Suche..." class="searchbar-element search-string" @focusin="focusIn" @focusout="(event) => focusOut(event)" @keyup.enter="search" @keyup.escape="focusOut" @input="updateSearches" @keyup.up="changeSelect(-1)" @keyup.down="changeSelect(1)">
        <SearchIcon />
      </div>
      <div class="searches">
        <div v-for="(item, index) in searchHistoryItems" :key="index">
          <div v-if="keyPos == index" class="search-element focused-search">
            <HistoryIcon />
            {{ item }}
          </div>
          <div v-else class="search-element">
            <HistoryIcon />
            {{ item }}
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
  gap: 5px;
  padding: 10px 30px;
}

.search-element:hover{
  background-color: var(--color-accent-text);
  cursor: pointer;
}

.search-string{
    border: none;
    outline: none;
    width: 0;
    font-weight: 500;
    background: transparent;
    transition: 0.8s;
    color: var(--color-heading);
}

.search-string:focus{
  width: 35rem;
}

.focused-search{
  background-color: var(--color-accent-text);
  border-left: solid 3px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}

::placeholder{
  color: var(--color-text);
}
</style>