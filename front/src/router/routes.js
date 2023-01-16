import { LocalStorage, SessionStorage } from 'quasar'
// import { useListStore } from 'src/stores/lists-store'

const isAuthenticated = async (to, from) => {

  const isAuthenticated = LocalStorage.getItem('token') || SessionStorage.getItem('token')
  console.log(isAuthenticated)
  if (!isAuthenticated && to.name !== 'homepage') {
    return { name: 'homepage' }
  }
}

// const setList = async (to, from) => {
//   console.log({ to, from })
//   const listStore = useListStore();
// }

const routes = [
  {
    path: '/', component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'homepage', component: () => import('src/pages/HomePage.vue') },
      { path: 'login', name: 'login', component: () => import('components/auth/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('components/auth/RegisterPage.vue') },
      { path: 'tuto', component: () => import('pages/TutoPage.vue') },
      { path: 'tuto/:id', name: 'tuto-params', component: () => import('pages/TutoPage.vue') },

    ]
  },
  {
    path: '/dashboard', component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('components/dashboard/DashboardPage.vue'), },
      {
        path: 'list/:id', name: 'list', component: () => import('components/dashboard/ListDetail.vue'),
        // beforeEnter: setList
      }

    ],
    beforeEnter: isAuthenticated
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
