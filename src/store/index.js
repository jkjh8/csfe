import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import devices from "./devices";
import user from "./user";
import eventlog from "./eventlog";
import socket from "./socket";
import locations from "./locations";
import broadcast from "./broadcast";

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      broadcast,
      user,
      eventlog,
      devices,
      socket,
      locations,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
