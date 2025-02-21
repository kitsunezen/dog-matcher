<template>
  <article class="card">
    <figure class="image-container">
      <div class="image-wrapper">
        <img :src="dog.img" :alt="dog.name" loading="lazy" />
      </div>
      <figcaption class="caption">
        <div>{{ dog.name }}</div>
        <div class="favorite-icon" @click="toggleFavorite">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            :fill="isFavorite ? 'red' : 'none'"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.94-8.94 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </div>
      </figcaption>
    </figure>
    <div class="content">
      <span>{{ dog.age }} year old {{ dog.breed }}, located in {{ dog.zip_code }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
const props = defineProps(['dog'])
const dog = computed(() => props.dog)
const favorites = useFavoritesStore()
const isFavorite = computed(() => favorites.favoriteIds.indexOf(dog.value.id) > -1)
const toggleFavorite = () => {
  if (isFavorite.value) {
    favorites.removeFavorite(dog.value.id)
  } else {
    favorites.addFavorite(dog.value.id)
  }
}
</script>

<style scoped>
.card {
  /* display: grid; */
  /* grid-template-columns: 200px minmax(0, 1fr); minmax prevents overflow */
  /* gap: 1.5rem; */
  padding: 1.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.05);
  z-index: 20;
}

.image-container {
  margin: 0; /* Reset figure margins */
  width: 40%;
}

.image-wrapper {
  aspect-ratio: 1;
  position: relative;
  border-radius: 0.25rem;
  border: 1px solid black;
  overflow: hidden;
  background: white;
}

.image-wrapper img {
  position: absolute;
  inset: 0; /* Shorthand for top/right/bottom/left */
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* .image-wrapper img:hover {
  transform: scale(1.5);
} */

.caption {
  margin-top: 0.75rem;
  font-size: 1.275rem;
  color: #666;
  text-align: center;
  display: flex;
  gap: 1em;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  margin: 0;
}

.details dt {
  font-weight: 500;
  color: #666;
}

.details dd {
  margin: 0;
  color: #333;
}
.favorite-icon {
  cursor: pointer;
}
</style>
