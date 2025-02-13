<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/interfaces'
const auth = useAuthStore()
const name = ref('')
const email = ref('')

const login = (event: Event) => {
  event.preventDefault()
  const user: User = { name: name.value, email: email.value }
  auth.login(user)
}
</script>

<template>
  <div class="login-form">
    <v-card class="login-form-body">
      <v-form @submit="login">
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-btn class="mt-2" type="submit" block>Login</v-btn>
      </v-form>
    </v-card>
  </div>
</template>
