<template>
  <article class="card">
    <figure class="image-container">
      <div class="image-wrapper">
        <img :src="dog.img" :alt="dog.name" loading="lazy" />
      </div>
      <figcaption class="caption">
        <div>{{ dog.name }}</div>
      </figcaption>
    </figure>
    <div class="content">
      <span>{{ dog.age }} year old {{ dog.breed }}, located in {{ dog.zip_code }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['dog'])
const dog = computed(() => props.dog)
</script>

<style scoped>
.card {
  padding: 1.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 255;
  transition: transform 0.2s ease;
}

.image-container {
  margin: 0; /* Reset figure margins */
  width: 100%;
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
