/*
export function someGetter (state) {
}
*/

export function getLocationNames (state) {
  const r = []
  state.locations.forEach(e => {
    if (e.mode === 'Q-sys') {
      r.push(e.name)
    }
  })
  return r
}
