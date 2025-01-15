<script setup>
import { ref } from 'vue';

import SearchIcon from './icons/IconSearch.vue';
import HistoryIcon from './icons/IconHistory.vue';
import CloseIcon from './icons/IconClose.vue';
import { saveSearch, loadSearches, deleteByQuery } from './../assets/indexedDB.js';

const props = defineProps({
  searchbarType: {
    type: String,
    required: true,
  },
  searchbarUrl: {
    type: String,
    required: true,
  },
});

let searchHistoryItems = ref([]);
let textInput = ref(null);
let suggInput = ref(null);
let keyPos = ref(-1);


let focusOut = (event) => {
  textInput.value.value = "";
  suggInput.value.value = "";
  keyPos.value = -1;
}


let updateSearches = async () => {
  keyPos.value = -1;
  const searches = await loadSearches(props.searchbarType);
  const resultsMatch = searches.filter((element) => element.query.trim().startsWith(textInput.value.value.trim()));
  const resultsHistory = searches.filter((element) => element.query.toLowerCase().trim().includes(textInput.value.value.toLowerCase().trim()));
  if((resultsMatch.length>0)&&(textInput.value.value.length>0)){suggInput.value.value=resultsMatch[resultsMatch.length-1].query;
    console.log(suggInput.value.value)
  }else{
    suggInput.value.value = "";
  }
  addSearchHistory(resultsHistory)
}

let tabSearch = () => {
  textInput.value.value = suggInput.value.value;
  search();
}

let search = () => {
    let query = encodeURIComponent(textInput.value.value);
    if(query != ""){
      textInput.value.value = "";
      suggInput.value.value = "";
      saveSearch(query, props.searchbarType);
      window.open(props.searchbarUrl+query, "_self");
    }
}

let addSearchHistory = (searches) => {
  searchHistoryItems.value = [];
  for (let i = (searches.length-1); i >= 0 && i > (searches.length-8); i--){
    searchHistoryItems.value.push(searches[i]["query"])
  }
};

let changeSelect = (value) => {
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

let deleteHistory = async (item) => {
  await deleteByQuery(item, props.searchbarType)
  textInput.value.focus();
  updateSearches()
}

let changeInput = (item) => {
  textInput.value.value = item;
  search()
}
</script>

<template>
    <div class="search-container">
      <div class="input-container">
        <input type="text" ref="textInput" placeholder="Suche..." class="searchbar-element search-string" @focusin="updateSearches" @focusout="(event) => focusOut(event)" @keyup.ctrl.enter="tabSearch" @keyup.enter="search" @keyup.escape="focusOut" @input="updateSearches" @keyup.up="changeSelect(-1)" @keyup.down="changeSelect(1)">
        <input ref="suggInput" class="searchbar-paragraph"></input>
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
    z-index: 300;
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

.searchbar-paragraph{
  border: none;
  outline: none;
  background: transparent;
  position: absolute;
  font-weight: 500;
  font-size: large;
  z-index: 250;
  color: var(--color-text);
}

::placeholder{
  color: var(--color-text);
}

@keyframes bar-1 {
  from {width: 10rem;}
  to {width: 35rem;}
}
</style>