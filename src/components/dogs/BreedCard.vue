<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['breed'])
const breed = ref(props.breed)
</script>

<template>
  <v-card text="breed"></v-card>
</template>
