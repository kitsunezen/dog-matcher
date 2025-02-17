<script setup lang="ts">
import { computed } from 'vue'
import { useDogStore } from '@/stores/dogs'
// import BreedCard from '@/components/dogs/BreedCard.vue'

const dogs = useDogStore()
dogs.getBreeds()
const breeds = computed(() => dogs.breeds)
</script>

<template>
  <div class="breed-search">
    <v-autocomplete label="Breeds" :items="breeds" multiple></v-autocomplete>
  </div>
</template>

<style scoped></style>
