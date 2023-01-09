import { defineStore } from 'pinia'
import { LocalStorage, SessionStorage } from 'quasar';
import { register, login } from 'src/services/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),

  getters: {
    getJwtToken() {
      return LocalStorage.getItem('token') || SessionStorage.getItem('token');
    }
  },

  actions: {
    async handleRegister(params) {
      try {
        const res = await register(params);
        LocalStorage.set('token', res.data.token)
      } catch (err) {
        LocalStorage.clear()
        throw new Error(err)
      }
    },
    async handleLogin(params) {
      try {
        const res = await login(params);
        LocalStorage.set('token', res.data.token)
      } catch (err) {
        LocalStorage.clear()
        throw new Error(err)
      }
    }
  }
})
