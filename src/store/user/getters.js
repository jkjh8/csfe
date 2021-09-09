export function nickname (state) {
  if (state.user && state.user.userName) {
    console.log(state.user.userName)
    return state.user.userName.substring(0, 1)
  } else {
    return ''
  }
}
