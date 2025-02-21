<template>
  <div class="login-form">
    <form @submit="login">
      <div class="login-field name">
        <label for="name">Name: </label>
        <input v-model="name" label="Name" id="name" />
      </div>
      <div class="login-field email">
        <label for="email">Email: </label>
        <input v-model="email" label="Email" id="email" />
      </div>
      <div class="login-field login-button">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/interfaces'
const auth = useAuthStore()
const name = ref('')
const email = ref('')

const login = async (event: Event) => {
  event.preventDefault()
  const user: User = { name: name.value, email: email.value }
  await auth.login(user)
  if (auth.isAuthenticated) {
    console.log(`${user.name} is authenticated.`)
  }
}
</script>
