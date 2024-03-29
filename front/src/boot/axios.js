import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useUserStore } from 'src/stores/user-store'
import { Loading, LocalStorage } from 'quasar'

const userStore = useUserStore()

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:5001/api/v1' })
api.interceptors.request.use(response => {
  Loading.show()
  const token = LocalStorage.getItem('token');
  response.headers.common.Authorization = `Bearer ${token}`
  return response
})

api.interceptors.response.use(
  response => {
    Loading.hide()
    return response
  },
  err => {
    Loading.hide()
    if (err.response && err.response.status === 401) {
      return Promise.reject(err)
    } else {
      throw err
    }
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
