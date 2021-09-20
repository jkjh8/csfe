export function updateLocations (state, payload) {
  state.locations = payload
}

export function updateSelected (state, payload) {
  state.selected = payload
}

export function updateBroadcast (state, payload) {
  state.selectBroadcast = payload
}

export function updateSelectedId (state, payload) {
  state.selectedId = payload
}

export function updateZonePresets (state, payload) {
  state.zonePresets = payload
}

export function updateSelectedZonePreset (state, payload) {
  state.selectedZonePreset = payload
}
