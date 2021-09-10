export function getIndexArr (state) {
  return state.zones.map(e => e.index)
}

export function getCount (state) {
  return state.zones.length
}
