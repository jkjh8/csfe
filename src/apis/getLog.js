// const { api } = require('../boot/axios')
import { api } from '../boot/axios'

export default async function (limit, page, search) {
  try {
    const r = await api.post('/eventlog', { limit, page, search })
    return r.data
  } catch (err) {
    console.log(err)
    return null
  }
}
