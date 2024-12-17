<script setup>
import SearchIcon from './icons/IconSearch.vue';
import { saveSearch, loadSearches } from './../assets/indexedDB.js';

const props = defineProps({
  searchbarType: {
    type: String,
    required: true,
  },
});


let focusIn = async (event) => {
  document.querySelectorAll(".searchsvg").forEach(element => {
    element.style.display = "none";
  });
  const searches = await loadSearches(props.searchbarType);
  addSearchHistory(searches, event.target);
}


let focusOut = (event) => {
  document.querySelectorAll(".searchsvg").forEach(element => {
        element.style.display = "flex";
      });
  event.target.value = "";
  event.target.parentElement.parentElement.parentElement.style.display = "none";
}

let search = (event) => {
    let url = "";
    let query = event.target.value;
    switch (props.searchbarType) {
        case "springer":
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            saveSearch(event, "springer");
            break;
        
        case "google":
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            saveSearch(event, "google");
            break;
        
        case "scholar":
            url = `https://scholar.google.de/scholar?hl=de&as_sdt=0%2C5&q=${encodeURIComponent(query)}&btnG=`;
            saveSearch(event, "scholar");
            break;

        default:
            break;
    }
    window.open(url, '_blank');
}

let addSearchHistory = (searches, element) => {
  const value = element.value;
  const searchContainer = element.parentElement.nextElementSibling;
  searchContainer.innerHTML = "";
  let htmlString = ``;
  for (let i = (searches.length-1); i >= 0 && i > (searches.length-6); i--){
    console.log(i)
    htmlString += `
      <div class="search-element">
      ${searches[i]["query"]} 
      </div>
    `
  }
  console.log(searchContainer.innerHtml)
  console.log(htmlString)
  searchContainer.innerHTML = htmlString;
  console.log(searchContainer)
};
</script>

<template>
    <div class="search-container">
      <div class="input-container">
        <input placeholder="Suche..." class="searchbar-element search-string" @focusin="(event) => focusIn(event)" @focusout="(event) => focusOut(event)" @keyup.enter="(event) => search(event)" @keyup.escape="focusOut">
        <SearchIcon />
      </div>
      <div class="searches">

      </div>
    </div>
</template>

<style scoped>
.searchbar-element{
    font-size: large;
}

.search-container{
    border-radius: 30px;
    background-color: var(--color-accent2);
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

.input-container{
  display: flex;
  align-items: center;
}

.searches > div{
  border-radius: 30px;
  background-color: var(--color-accent-text);
}

.search-element:hover{
  background-color: var(--color-accent-text);
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