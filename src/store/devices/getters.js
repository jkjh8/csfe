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
  state.devices.forEach(item => {
    if (item.mode === 'Slave') {
      if (state.selected) {
        if (state.selected.ipaddress === item.parent) {
          list.push(item)
        }
      } else {
        list.push(item)
      }
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


export function mastersDetails (state) {
  const list = []
  const masters = getDeviceMasters(state)
  const slaves = getDeviceSlaves(state)
  let zones = 0

  masters.forEach(master => {
    master.label = master.name
    const childData = []
    if (master.children.length) {
      const childrens = master.children
      zones += childrens.length
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
    } else {
      zones += 1
    }
    list.push({ ...master, childrens: childData })
  })
  return { 
    list,
    zones: zones,
    devices: state.devices.length,
    locations: masters.length,
  }
}