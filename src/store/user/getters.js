export function nickname (state) {
  if (state.user && state.user.user_name) {
    return state.user.user_name.substring(0, 1)
  } else {
    return ''
  }
}
