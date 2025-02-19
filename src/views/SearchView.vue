<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useLocationStore } from '@/stores/locations'
import { useDogStore } from '@/stores/dogs'
const locations = useLocationStore()
const dogs = useDogStore()

const currentLocations = computed(() => locations.currentLocations)
const currentLocation = computed(() => locations.location)
const currentZips = computed(() => locations.currentLocations.map((location) => location.zip_code))
const loading = computed(() => locations.loading || dogs.loading)
const foundDogs = computed(() => dogs.searchResults)
const dogsExist = computed(() => foundDogs.value?.length > 0)

const getNearby = () => {
  locations.getNearbyLocations(currentLocation.value, 25)
  if (currentZips.value.length > 0) {
    dogs.findDogs({ zipCodes: currentZips.value })
  }
}

onBeforeMount(() => {
  locations.getLocations(['48103'])
})
</script>

<template>
  <div>
    <div v-if="loading"><span>LOADING..</span></div>
    <div v-else>
      <p>Search Page</p>
      <p>Current Location: {{ currentLocation?.city }}</p>
      <button @click="getNearby">Get Nearby Cities</button>
      <div v-if="dogsExist" class="dogs-wrapper">
        <p>Dogs in the area:</p>
        <div class="dog-card" v-for="dog in foundDogs" :key="dog.id">
          <span
            >{{ dog.name }}, {{ dog.breed }},{{ dog.age }} years old, located in
            {{ dog.zip_code }}</span
          >
          <img :src="dog.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.city-card {
  padding: 1em;
  margin: 1em;
  border: 1px solid black;
  border-radius: 0.25em;
}
.dog-card {
  padding: 1em;
  margin: 1em;
  border: 1px solid black;
  background-color: #ccc;
  border-radius: 0.25em;
}
</style>
