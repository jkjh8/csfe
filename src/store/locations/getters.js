export function getLocationNames (state) {
  return state.locations.map(e => e.name)
}

export function getLocationsIndexArr (state) {
  return state.locations.map(e => e.index)
}

export function getZonesIndexArr (state) {
  return state.zones.map(e => e.index)
}

export function getLocationsCount (state) {
  return state.locations.length
}

export function getZonesCount (state) {
  return state.zones.length
}

export function getTree (state) {
  const rt = []
  state.locations.forEach(location => {
    const children = []
    state.zones.forEach(zone => {
      if (zone.parent._id === location._id) {
        children.push(zone)
      }
    })
    console.log('children = ', children)
    rt.push({ ...location, children: children })
  })
  console.log(rt)
  return rt
}

export function locationsErrorCount (state) {
  return state.locations.filter(e => e.status !== true).length
}

export function zonesErrorCount (state) {
  return state.zones.filter(e => e.status === false).length
}
