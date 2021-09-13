export function nickname (state) {
  if (state.user && state.user.userName) {
    console.log(state.user.userName)
    return state.user.userName.substring(0, 1)
  } else {
    return ''
  }
}

export function numberOfUsers (state) {
  if (state.users.length) return state.users.length
  return 0
}

export function numberOfAdmin (state) {
  const admin = []
  state.users.forEach(e => {
    if (e.admin) {
      admin.push(e)
    }
  })
  return admin.length
}
