import { defineStore } from 'pinia'
import { login, logout } from '@/services/authService'
import type { AuthState, User } from '@/types/interfaces'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
  }),
  getters: {},
  actions: {
    async login(user: User) {
      this.isAuthenticating = true
      try {
        if (await login(user)) {
          this.user = user
          this.isAuthenticated = true
        } else {
          this.user = null
          this.isAuthenticated = false
        }
      } catch (error) {
        console.error('Auth Store login error:' + error)
        this.isAuthenticating = false
        throw error
      } finally {
        this.isAuthenticating = false
      }
    },
    async logout() {
      this.isAuthenticating = true
      try {
        if (await logout()) {
          this.user = null
          this.isAuthenticated = false
        }
      } catch (error) {
        console.error('Auth Store login error:' + error)
        this.isAuthenticating = false
        throw error
      } finally {
        this.isAuthenticating = false
      }
    },
  },
})
