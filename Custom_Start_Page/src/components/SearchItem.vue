<script setup>
import SearchIcon from './icons/IconSearch.vue';

const props = defineProps({
  searchbarType: {
    type: String,
    required: true,
  },
});


let focusIn = (event) => {
  document.querySelectorAll(".searchsvg").forEach(element => {
        element.style.display = "none";
      });
}


let focusOut = (event) => {
  document.querySelectorAll(".searchsvg").forEach(element => {
        element.style.display = "flex";
      });
  event.target.value = "";
  event.target.parentElement.parentElement.style.display = "none";
}

let search = () => {
    let url = "";
    let query = "";
    document.querySelectorAll(".search-string").forEach(element => {
      query += element.value;
      element.value = "";
    });
    switch (props.searchbarType) {
        case "springer":
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            break;
        
        case "google":
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            break;
        
        case "scholar":
            url = `https://scholar.google.de/scholar?hl=de&as_sdt=0%2C5&q=${encodeURIComponent(query)}&btnG=`;
            break;

        default:
            break;
    }
    window.open(url, '_blank');
}

</script>

<template>
    <div class="search-container">
      <input placeholder="Suche..." class="searchbar-element search-string" @focusin="(event) => focusIn(event)" @focusout="(event) => focusOut(event)" @keyup.enter="search()" @keyup.escape="focusOut">
      <SearchIcon />
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
    align-items: center;
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
  width: 30rem;
}

::placeholder{
  color: var(--color-text);
}

.search-submit{

}
</style>