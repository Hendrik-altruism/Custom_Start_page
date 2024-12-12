<script setup>
</script>

<template>
    <div id="search-container">
        <input type="submit" value="X" class="searchbar-element">
        <input type="text" id="search-string" name="lname" class="searchbar-element">
        <input type="submit" value="Suche" id="search-submit" class="searchbar-element">
    </div>
</template>

<style scoped>
.searchbar-element{
    font-size: large;
}

#search-container{
    border-radius: 5px;
}

#search-string{
    width: 30em;
}

#search-submit{

}
</style>