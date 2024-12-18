<script setup>
import { ref } from 'vue';

import SearchIcon from './icons/IconSearch.vue';
import { saveSearch, loadSearches } from './../assets/indexedDB.js';

const props = defineProps({
  searchbarType: {
    type: String,
    required: true,
  },
});

let searchHistoryItems = ref([]);
let textInput = ref(null);

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
  event.target.parentElement.parentElement.parentElement.style.display = "none";
}

let updateSearches = async () => {
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
</script>

<template>
    <div class="search-container">
      <div class="input-container">
        <input ref="textInput" placeholder="Suche..." class="searchbar-element search-string" @focusin="focusIn()" @focusout="(event) => focusOut(event)" @keyup.enter="(event) => search(event)" @keyup.escape="focusOut" @input="updateSearches()">
        <SearchIcon />
      </div>
      <div class="searches">
        <div v-for="(item, index) in searchHistoryItems" :key="index" class="search-element">
          {{ item }}
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
  border-radius: 30px;
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

::placeholder{
  color: var(--color-text);
}
</style>