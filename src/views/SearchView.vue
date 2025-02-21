<template>
  <div>
    <div>
      <div class="search-wrapper-open">
        <div class="zipcode-entry"></div>
        <div class="distance-buttons">
          <input v-model="formZip" id="zipcode" class="zipcode" placeholder="Zip Code" />
          <div>..and how far away?</div>
          <button class="distance-button" @click="getNearby(25)">Fetching Distance</button>
          <button class="distance-button" @click="getNearby(100)">A Dozen Dog-Miles</button>
          <button class="distance-button" @click="getAllDogs">ALL THE DOGS</button>
        </div>
        <BreedSelector :breeds="dogs.breeds" />
        <button @click="getTopDog">Get the Top Dog</button>
        <div class="selected-breeds-container">
          <BreedCard v-for="(breed, index) in breeds" :key="index" :breed="breed" />
        </div>
      </div>
      <div v-if="loading" class="dogs-wrapper"><span>LOADING..</span></div>
      <div v-else>
        <div v-if="dogsExist && !foundTopDog" class="dogs-wrapper">
          <DogCard v-for="dog in foundDogs" :key="dog.id" :dog="dog" />
        </div>
        <div v-if="foundTopDog" class="top-dog-wrapper">
          <TopDogCard v-if="foundTopDog" :dog="topDog" />
        </div>
        <div v-else class="dogs-wrapper">
          Use the controls above to search. I double-dog-dare you!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useLocationStore } from '@/stores/locations'
import { useDogStore } from '@/stores/dogs'
import { useParamsStore } from '@/stores/params'
import { useFavoritesStore } from '@/stores/favorites'
import TopDogCard from '@/components/dogs/TopDogCard.vue'
import DogCard from '@/components/dogs/DogCard.vue'
import BreedCard from '@/components/dogs/BreedCard.vue'
import BreedSelector from '@/components/controls/BreedSelector.vue'
const locations = useLocationStore()
const dogs = useDogStore()
const params = useParamsStore()
const favorites = useFavoritesStore()

// const currentLocations = computed(() => locations.currentLocations)
const currentLocation = computed(() => locations.location)
const currentZips = computed(() => locations.currentZips)
const loading = computed(() => locations.loading || dogs.loading)
const foundDogs = computed(() => dogs.searchResults)
const dogsExist = computed(() => foundDogs.value?.length > 0)
const foundTopDog = computed(() => dogs.foundTopDog)
const topDog = computed(() => dogs.matchedDog)
const formZip = ref('')
const breeds = computed(() => params.breeds)

const getNearby = async (distance?: number) => {
  dogs.clearTopDog()
  await locations.getLocations([formZip.value])
  if (locations.location) {
    await locations.getNearbyLocations(currentLocation.value, distance)
    if (currentZips.value.length > 0) {
      dogs.findDogs({ zipCodes: currentZips.value, size: 100 })
    }
  }
}

const getTopDog = async () => {
  await dogs.getTopDog(favorites.favoriteIds)
  // if (dogs.matchedDog)
}

const getAllDogs = () => {
  dogs.clearTopDog()
  dogs.findDogs(params)
}

onBeforeMount(() => {
  dogs.init()
})
</script>

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
  grid-template-columns: repeat(auto-fit, minmax(38ch, 1fr));
  gap: 1em;
  justify-content: space-between;
  margin-top: 10em;
}
.form-label {
  margin-right: 1em;
}
.distance-buttons {
  padding: 0.5em;
  display: flex;
  gap: 0.5em;
}
@media (max-width: 720px) {
  .distance-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em;
  }

  .zipcode {
    grid-column: 1 / 3;
  }
}
.dog-thumb {
  width: 25%;
}
.selected-breeds-container {
  display: flex;
  gap: 0.5em;
}
.search-wrapper-open {
  position: fixed;
  top: 0;
  left: 1em;
  right: 1em;
  z-index: 100;
  border: 1px solid black;
  border-top: 0;
  border-radius: 0 0 1em 1em;
  background-color: white;
  padding: 1em;
  transition: all 0.2s ease;
}
.top-dog-wrapper {
  display: grid;
  grid-template-columns: 64ch;
  justify-content: center;
  margin-top: 12em;
}
</style>
