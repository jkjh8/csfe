export function getIndexArr (state) {
  return state.devices.map(e => e.index)
}

function getDeviceMasters (state) {
  const list = []
  state.devices.forEach(item => {
    if (item.mode === 'Master') {
      list.push(item)
    }
  })
  return list
}

function getDeviceSlaves (state) {
  const list = []
  state.slaves.forEach(item => {
    if (state.selected) {
      if (state.selected.ipaddress === item.parent) {
        list.push(item)
      }
    } else {
      list.push(item)
    }
  })
  return list
}

export function getMaster (state) {
  return getDeviceMasters(state)
}

export function getSlave (state) {
  return getDeviceSlaves(state)
}

export function count (state) {
  let zones = 0
  let errorZones = 0
  let errorMasters = 0
  let active = 0
  state.masters.forEach(master => {
    if (!master.status) {
      errorMasters += 1
    }
    master.active.forEach(act => {
      if (act) {
        active += 1
      }
    })
    if (master.children.length) {
      zones += master.children.length
    } else {
      zones += 1
    }
  })
  state.slaves.forEach(slave => {
    if (!slave.status) {
      errorZones += 1
    }
  })
  return {
    masters: state.masters.length,
    slaves: state.slaves.length,
    devices: state.devices.length,
    zones: zones,
    active: active,
    error: {
      masters: errorMasters,
      zones: errorZones
    }
  }
}


export function mastersDetails (state) {
  const list = []
  const masters = state.masters
  const slaves = state.slaves

  masters.forEach(master => {
    const childData = []
    if (master.children.length) {
      const childrens = master.children
      for (let i = 0; i < childrens.length; i++) {
        for (let j = 0; j < slaves.length; j++) {
          if (childrens[i].ipaddress === slaves[j].ipaddress) {
            childData.push({
              label: slaves[j].name,
              ipaddress: slaves[j].ipaddress,
              status: slaves[j].status,
              parent: slaves[j].parent,
              channel: slaves[j].channel
            })
            break
          }
        }
      }
    }
    list.push({ ...master, childrens: childData })
  })
  return list
}