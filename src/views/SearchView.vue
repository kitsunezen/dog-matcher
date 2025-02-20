<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useLocationStore } from '@/stores/locations'
import { useDogStore } from '@/stores/dogs'
import { useParamsStore } from '@/stores/params'
import DogCard from '@/components/dogs/DogCard.vue'
import BreedCard from '@/components/dogs/BreedCard.vue'
import BreedSelector from '@/components/controls/BreedSelector.vue'
const locations = useLocationStore()
const dogs = useDogStore()
const params = useParamsStore()

// const currentLocations = computed(() => locations.currentLocations)
const currentLocation = computed(() => locations.location)
const currentZips = computed(() => locations.currentZips)
const loading = computed(() => locations.loading || dogs.loading)
const foundDogs = computed(() => dogs.searchResults)
const dogsExist = computed(() => foundDogs.value?.length > 0)
const formZip = ref('')
const breeds = computed(() => params.breeds)

const getNearby = async (distance?: number) => {
  await locations.getLocations([formZip.value])
  if (locations.location) {
    await locations.getNearbyLocations(currentLocation.value, distance)
    if (currentZips.value.length > 0) {
      dogs.findDogs({ zipCodes: currentZips.value, size: 100 })
    }
  }
}

const getAllDogs = () => {
  dogs.findDogs(params)
}

onBeforeMount(() => {
  dogs.init()
})
</script>

<template>
  <div>
    <div v-if="loading"><span>LOADING..</span></div>
    <div v-else>
      <div class="search-wrapper">
        <div class="zipcode-entry">
          <label class="form-label" for="zipcode">Zip Code</label>
          <input v-model="formZip" id="zipcode" />
        </div>
        <div class="distance-buttons">
          <button @click="getNearby(25)">Fetching Distance</button>
          <button @click="getNearby(100)">A Dozen Dog-Miles</button>
          <button @click="getAllDogs">ALL THE DOGS</button>
        </div>
        <BreedSelector :breeds="dogs.breeds" />
        <div class="selected-breeds-container">
          <BreedCard v-for="(breed, index) in breeds" :key="index" :breed="breed" />
        </div>
      </div>
      <div v-if="dogsExist" class="dogs-wrapper">
        <DogCard v-for="dog in foundDogs" :key="dog.id" :dog="dog" />
      </div>
      <div v-else>None</div>
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
  min-width: 36ch;
}
.dogs-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(64ch, 1fr));
  gap: 1em;
  padding: 1em;
  justify-content: space-between;
  margin-top: 10em;
}
.form-label {
  margin-right: 1em;
}
.dog-thumb {
  width: 25%;
}
.selected-breeds-container {
  display: flex;
  gap: 0.5em;
}
.search-wrapper {
  position: fixed;
  top: 0;
  width: 95%;
  z-index: 100;
  border: 1px solid black;
  border-top: 0;
  border-radius: 0 0 1em 1em;
  background-color: white;
  padding: 1em;
  max-height: 12em;
  overflow-y: auto;
}
</style>
