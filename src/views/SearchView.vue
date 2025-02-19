<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useLocationStore } from '@/stores/locations'
import { useDogStore } from '@/stores/dogs'
const locations = useLocationStore()
const dogs = useDogStore()

// const currentLocations = computed(() => locations.currentLocations)
const currentLocation = computed(() => locations.location)
const currentZips = computed(() => locations.currentZips)
const loading = computed(() => locations.loading || dogs.loading)
const foundDogs = computed(() => dogs.searchResults)
const dogsExist = computed(() => foundDogs.value?.length > 0)
const formZip = ref('')

// locations.$subscribe(() => {
//   currentZips.value = locations.currentZips
// })

const getNearby = (distance?: number) => {
  locations.getNearbyLocations(currentLocation.value, distance)
  if (currentZips.value.length > 0) {
    dogs.findDogs({ zipCodes: currentZips.value })
  }
}

const getAllDogs = () => {
  dogs.findDogs({})
}

onBeforeMount(() => {
  locations.getLocations(['49801'])
})
</script>

<template>
  <div>
    <div v-if="loading"><span>LOADING..</span></div>
    <div v-else>
      <div class="zipcode-entry">
        <label class="form-label" for="zipcode">Zip Code</label>
        <input v-model="formZip" id="zipcode" />
      </div>
      <div class="distance-buttons">
        <button @click="getNearby(10)">Fetching Distance</button>
        <button @click="getNearby(84)">A Dozen Dog-Miles</button>
        <button @click="getNearby(1000)">Iditarod</button>
        <button @click="getAllDogs">ALL THE DOGS</button>
      </div>
      <p>Dogs in the area:</p>
      <div v-if="dogsExist" class="dogs-wrapper">
        <div class="dog-card" v-for="dog in foundDogs" :key="dog.id">
          <span
            >{{ dog.name }}, {{ dog.breed }},{{ dog.age }} years old, located in
            {{ dog.zip_code }}</span
          >
          <img class="dog-thumb" :src="dog.img" />
        </div>
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
  grid-template-columns: repeat(auto-fill, 40ch);
  gap: 1em;
  justify-content: space-between;
}
.form-label {
  margin-right: 1em;
}
.dog-thumb {
  width: 25%;
}
</style>
