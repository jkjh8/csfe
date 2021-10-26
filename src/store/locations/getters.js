export function getLocationNames (state) {
  return state.locations.map(e => e.name)
}

export function getLocationsIndexArr (state) {
  return state.locations.map(e => e.index)
}

export function getCount (state) {
  return state.locations.length
}

export function errorCount (state) {
  return state.locations.filter(e => e.status !== true).length
}

export function locationsCount (state) {
  let locations = 0
  let zones = 0
  let broadcastZones = 0
  let actives = 0

  state.locations.forEach(e => {
    locations = locations + 1
    if (e.children.length) {
      zones = zones + e.children.length
      broadcastZones = broadcastZones + e.children.length
      e.device.active.forEach(act => {
        if (act) {
          actives += 1
        }
      })
    } else {
      broadcastZones = broadcastZones + 1
    }
  })
  return {
    locations,
    zones,
    broadcastZones,
    actives
  }
}

export function selectedGroup (state) {
  const selected = state.selectedId
  const locations = state.locations

  const sel = []
  locations.forEach(locate => {
    // 지역확인
    if (selected.includes(locate._id)) {
      sel.push({
        _id: locate._id,
        name: locate.name,
        all: true
      })
    } else {
      // 자식 확인
      const children = []
      const zones = []
      locate.children.forEach(child => {
        if (selected.includes(child._id)) {
          children.push({
            _id: child._id,
            name: child.name,
            channel: child.channel
          })
          zones.push(child.channel)
        }
      })
      // 자식수 지역수 확인
      if (children.length) {
        sel.push({
          _id: locate._id,
          name: locate.name,
          location: locate._id,
          all: children.length === locate.children.length ?? true,
          children: children,
          zones: zones
        })
      }
    }
  })
  return sel
}
