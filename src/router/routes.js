
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
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/register.vue') }
    ]
  },
  {
    path: '/userInfo',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/users/userInfo.vue') }
    ]
  },
  {
    path: '/admin/users',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/admin/users.vue') }
    ]
  },
  {
    path: '/admin/functions',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/admin/functions/functions.vue') }
    ]
  },
  {
    path: '/admin/files',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/admin/files.vue') }
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
    path: '/kakaotts',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/kakaoTts.vue') }
    ]
  },
  {
    path: '/eventlog',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/eventlog/eventLog.vue') }
    ]
  },
  {
    path: '/locations',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/locations/index.vue') }
    ]
  },
  {
    path: '/status',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/broadcast/status.vue') }
    ]
  },
  {
    path: '/broadcast/live',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/broadcast/live.vue') }
    ]
  },
  {
    path: '/broadcast/reservation',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/broadcast/schedules.vue') }
    ]
  },
  {
    path: '/broadcast/files',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/broadcast/files.vue') }
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
