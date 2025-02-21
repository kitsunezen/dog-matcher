<template>
  <div class="autocomplete-container">
    <input
      v-model="inputValue"
      type="text"
      class="autocomplete-input"
      placeholder="Search breeds..."
      @input="handleInput"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />

    <div v-if="isDropdownOpen && matchingBreeds.length > 0" class="dropdown-container">
      <ul class="dropdown-list">
        <li
          v-for="(breed, index) in matchingBreeds"
          :key="breed"
          :class="['dropdown-item', { selected: index === selectedIndex }]"
          @mousedown="addBreed(breed)"
          @mouseover="selectedIndex = index"
        >
          {{ breed }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useParamsStore } from '@/stores/params'

const params = useParamsStore()

interface Props {
  breeds: string[]
}

const props = defineProps<Props>()

const inputValue = ref('')
const isDropdownOpen = ref(false)
const selectedIndex = ref(-1)

const matchingBreeds = computed(() => {
  if (!inputValue.value) return []
  const searchTerm = inputValue.value.toLowerCase()
  return props.breeds.filter((breed) => breed.toLowerCase().includes(searchTerm))
})

const addBreed = (breed: string) => {
  console.log(`Adding ${breed}`)
  params.addBreed(breed)
  inputValue.value = ''
  isDropdownOpen.value = false
}
const handleInput = () => {
  isDropdownOpen.value = true
  selectedIndex.value = -1
}

const handleBlur = () => {
  setTimeout(() => {
    isDropdownOpen.value = false
    selectedIndex.value = -1
  }, 200)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isDropdownOpen.value || matchingBreeds.value.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = (selectedIndex.value + 1) % matchingBreeds.value.length
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value =
        selectedIndex.value <= 0 ? matchingBreeds.value.length - 1 : selectedIndex.value - 1
      break
    case 'Enter':
      if (selectedIndex.value >= 0) {
        event.preventDefault()
        addBreed(matchingBreeds.value[selectedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      isDropdownOpen.value = false
      selectedIndex.value = -1
      break
  }
}
</script>

<style scoped>
.autocomplete-container {
  position: relative;
  width: 100%;
  margin-bottom: 0.5em;
}

.autocomplete-input {
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.2s ease;
}

.autocomplete-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.dropdown-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 30;
  max-height: 240px;
  overflow-y: auto;
}

.dropdown-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item.selected {
  background-color: #e5e7eb;
}
</style>
