import { defineStore } from 'pinia'

interface AuthState {
  user: { name: string; email: string } | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    async login() {},
    async logout() {
      this.$patch({ user: null, isAuthenticated: false })
    },
  },
})
