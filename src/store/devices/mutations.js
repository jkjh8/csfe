export function updateList (state, payload) {
  state.deviceList = payload
}

export function updateQsys (state, payload) {
  state.qsys = payload
}

export function updateBarix (state, payload) {
  state.barix = payload
}

export function updateCount (state, payload) {
  state.count = payload
}

export function changeMode (state, payload) {
  state.mode = payload
}
