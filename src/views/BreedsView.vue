<script setup lang="ts">
import { ref } from 'vue'
import { useDogStore } from '@/stores/dogs'
// import BreedCard from '@/components/dogs/BreedCard.vue'

const dogs = useDogStore()
const breeds = dogs.getBreeds()
const firstBreed = ref(breeds[0])
// const test = ref(`Breeds Test!`)
</script>

<template>
  <div>
    <v-card :text="firstBreed" />
  </div>
</template>

<style scoped></style>
