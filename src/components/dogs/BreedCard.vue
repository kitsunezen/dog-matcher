<script setup lang="ts">
import { ref } from 'vue'
import { useParamsStore } from '@/stores/params'
const params = useParamsStore()
const props = defineProps(['breed'])
const breed = ref(props.breed)

const removeBreed = () => {
  params.removeBreed(breed.value)
}
</script>

<template>
  <div class="breed-card">
    <div class="remove" @click="removeBreed">X</div>
    <div class="breed-name">{{ breed }}</div>
  </div>
</template>

<style scoped>
.breed-card {
  padding: 0.5em;
  display: flex;
  border-radius: 0.5em;
  border: 1px solid black;
}
</style>
