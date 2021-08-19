export function connectState (state, payload) {
  state.connect = payload
}

export function lastUpdate (state, payload) {
  state.lastUpdate = payload
}
