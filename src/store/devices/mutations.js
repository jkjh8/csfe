export function updateList (state, payload) {
  state.devices = payload
}

export function updateCount (state, payload) {
  state.count = payload
}

export function changeMode (state, payload) {
  state.mode = payload
}

export function updateSearch (state, payload) {
  state.search = payload
}

export function selected (state, payload) {
  state.selected = payload
}
