export function getIndexArr (state) {
  return state.deviceList.map(e => e.index)
}

export function getDeviceCount (state) {
  return state.deviceList.length
}
