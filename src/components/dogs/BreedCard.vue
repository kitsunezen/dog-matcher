<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['breed'])
const breed = ref(props.breed)
</script>

<template>
  <v-card class="breed-card">{{ breed }}</v-card>
</template>

<style scoped>
.breed-card {
  padding: 1em;
}
</style>
