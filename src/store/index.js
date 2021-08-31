import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import devices from './devices'
import user from './user'
import eventlog from './eventlog'
import socket from './socket'
import locations from './locations'
import zones from './zones'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      user,
      eventlog,
      devices,
      socket,
      locations,
      zones
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
