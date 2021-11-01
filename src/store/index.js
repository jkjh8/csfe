import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import devices from "./devices";
import user from "./user";
import eventlog from "./eventlog";
import broadcast from "./broadcast";

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      broadcast,
      user,
      eventlog,
      devices
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
