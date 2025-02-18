<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useLocationStore } from '@/stores/locations'
const locations = useLocationStore()

const currentLocations = computed(() => locations.currentLocations)
const currentLocation = computed(() => locations.location)
const loading = computed(() => locations.loading)

const getNearby = () => {
  locations.getNearbyLocations(currentLocation.value, 20)
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
      <p>Current Location: {{ currentLocation.city }}</p>
      <button @click="getNearby">Get Nearby Cities</button>
      <p>Nearby locations:</p>
      <v-card
        v-for="(location, index) in currentLocations"
        :key="index"
        :text="location.city"
      ></v-card>
    </div>
  </div>
</template>

<style scoped></style>
