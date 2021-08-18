export function updateList (state, payload) {
  state.deviceList = payload
}

export function updateCount (state, payload) {
  state.count = payload
}

export function changeMode (state, payload) {
  state.mode = payload
}
