<script setup>
const props = defineProps({
  searchbarType: {
    type: String,
    required: true,
  },
})

let changeSvgs = () => {
  document.querySelectorAll(".searchsvg").forEach(element => {
    element.style.display = "flex";
  });
  document.querySelectorAll(".searchbar").forEach(element => {
    element.style.display = "none";
  });
  document.querySelectorAll(".search-string").forEach(element => {
    element.value = "";
  });
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
    query.value = "";
}

</script>

<template>
    <div class="search-container">
        <form>
          <input value="X" class="searchbar-element" @click="changeSvgs()">
          <input placeholder="Suche..." name="lname" class="searchbar-element search-string">
          <input type="submit" value="Suche" class="searchbar-element" @click="search()" @keyup.enter="submit">
        </form>
    </div>
</template>

<style scoped>
.searchbar-element{
    font-size: large;
}

.search-container{
    border-radius: 30px;
    background-color: var(--color-accent-text);
    padding: 10px;
}

.search-string{
    border: none;
    outline: none;
    width: 30rem;
    font-weight: 500;
    background: transparent;
}

.search-submit{

}
</style>