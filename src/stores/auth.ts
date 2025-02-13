import { defineStore } from 'pinia'
import { login, logout } from '@/services/authService'
import type { AuthState, User } from '@/types/interfaces'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    async login(user: User) {
      if (await login(user)) {
        this.$patch({ user: user, isAuthenticated: true })
      } else {
        this.$patch({ user: null, isAuthenticated: false })
      }
    },
    async logout() {
      if (await logout()) {
        this.$patch({ user: null, isAuthenticated: false })
      }
    },
  },
})
