export function updateList (state, payload) {
  state.devices = payload
}

export function updateCount (state, payload) {
  state.count = payload
}

export function changeMode (state, payload) {
  state.mode = payload
}
