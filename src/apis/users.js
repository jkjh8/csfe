// const { api } = require('../boot/axios')
import { api } from '../boot/axios'
import { useStore } from 'vuex'

export default function () {
  const store = useStore()
  api.get('/auth/getUser').then((res) => {
    const user = res.data.user
    if (!user) {
      api.get('/auth/refUser').then((result) => {
        const refUser = result.data.user
        return store.commit('user/updateUser', refUser)
      })
    }
    store.commit('user/updateUser', res.data.user)
  })
}
