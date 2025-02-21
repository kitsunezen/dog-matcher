<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit="login">
        <div class="form-field">
          <label for="name">Name: </label>
          <input v-model="name" id="name" type="text" required placeholder="Enter your name" />
        </div>
        <div class="form-field">
          <label for="email">Email: </label>
          <input v-model="email" id="email" type="email" required placeholder="Enter your email" />
        </div>
        <div class="form-field">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/interfaces'

const router = useRouter()
const auth = useAuthStore()
const name = ref('')
const email = ref('')

const login = async (event: Event) => {
  event.preventDefault()
  const user: User = { name: name.value, email: email.value }
  await auth.login(user)
  if (auth.isAuthenticated) {
    router.push('/search')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsla(0, 0%, 96%, 1);
}

.login-card {
  background-color: hsla(0, 0%, 100%, 1);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem hsla(0, 0%, 0%, 0.1);
  width: 100%;
  max-width: 25rem;
}

h2 {
  text-align: center;
  color: hsla(0, 0%, 20%, 1);
  margin-bottom: 1.5rem;
}

.form-field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: hsla(0, 0%, 40%, 1);
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 0.0625rem solid hsla(0, 0%, 87%, 1);
  border-radius: 0.25rem;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: hsla(210, 73%, 59%, 1);
  box-shadow: 0 0 0 0.125rem hsla(210, 73%, 59%, 0.2);
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: hsla(210, 73%, 59%, 1);
  color: hsla(0, 0%, 100%, 1);
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: hsla(210, 73%, 48%, 1);
}

button:active {
  background-color: hsla(210, 73%, 42%, 1);
}
</style>
