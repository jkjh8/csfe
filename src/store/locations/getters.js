export function getLocationNames (state) {
  return state.locations.map(e => e.name)
}

export function getLocationsIndexArr (state) {
  return state.locations.map(e => e.index)
}

export function getZonesIndexArr (state) {
  return state.zones.map(e => e.index)
}

export function getCount (state) {
  return state.locations.length
}

export function errorCount (state) {
  return state.locations.filter(e => e.status !== true).length
}

export function zonesErrorCount (state) {
  return state.zones.filter(e => e.status === false).length
}
