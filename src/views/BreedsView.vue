<script setup lang="ts">
import { useDogStore } from '@/stores/dogs'
import BreedCard from '@/components/dogs/BreedCard.vue'

const dogs = useDogStore()
const breeds = dogs.getBreeds()
</script>

<template>
  <div>
    <BreedCard v-for="breed in breeds" :breed="breed" v-bind:breed></BreedCard>
  </div>
</template>

<style scoped></style>
