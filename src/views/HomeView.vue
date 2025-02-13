<script setup lang="ts">
const clicker = () => {
  console.log('Clicked that thing!')
}
</script>

<template>
  <main>
    <v-card
      @click="clicker"
      :variant="'elevated'"
      title="Dog Matcher!"
      text="Welcome to the Dog Matcher!"
    ></v-card>
  </main>
</template>
