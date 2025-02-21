<template>
  <div class="breed-card" role="button" :title="`Remove ${breed} filter`">
    <span class="breed-name">{{ breed }}</span>
    <button class="remove-button" @click="removeBreed" aria-label="Remove filter">×</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useParamsStore } from '@/stores/params'
const params = useParamsStore()
const props = defineProps(['breed'])
const breed = computed(() => props.breed)

const removeBreed = () => {
  console.log(`Removing ${breed.value}`)
  params.removeBreed(breed.value)
}
</script>

<style scoped>
.breed-card {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 0.75em;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s ease;
  user-select: none;
}

.breed-card:hover {
  background-color: #e5e7eb;
  border-color: #d1d5db;
}

.breed-name {
  font-weight: 500;
}

.remove-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25em;
  height: 1.25em;
  padding: 0;
  background-color: #d1d5db;
  border: none;
  border-radius: 50%;
  color: #4b5563;
  font-size: 1em;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-button:hover {
  background-color: #9ca3af;
  color: white;
}

.remove-button:focus {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}
</style>
