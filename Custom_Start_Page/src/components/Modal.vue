<script setup>

const props = defineProps({
  modalType: {
    type: String,
    required: true,
  },
});

</script>

<template>
    <div class="modal-container">
      
    </div>
</template>

<style scoped>

.modal-container{
  height: 20vh;
  width: 20vw;
  background-color: blueviolet;
  z-index: 100;
}

</style>