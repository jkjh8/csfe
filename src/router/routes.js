
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/register.vue') }
    ]
  },
  {
    path: '/userInfo',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/userInfo.vue') }
    ]
  },
  {
    path: '/devices',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/devices/devices.vue') }
    ]
  },
  {
    path: '/eventlog',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/eventlog/eventLog.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
