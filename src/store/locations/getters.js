export function locationsCount (state) {
  return state.locations.length
}

export function getLocationNames (state) {
  return state.locations.map(e => e.name)
}

export function getIndexArr (state) {
  return state.locations.map(e => e.index)
}
