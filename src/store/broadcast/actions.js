/*
export function someAction (context) {
}
*/

import { api } from '@/boot/axios'

export function startPreview ({ commit }, payload) {
  console.log(payload)
  commit('setPreview', true)
  commit('updatePreviewFile', payload)
} 

export async function getTtsInfo ({ commit }) {
  const r = await api.get('/broadcast/tts/voices')
  commit('updateTtsVoices', r.data.voices)
  commit('updateTtsRate', r.data.rate)
}

export async function updateSchedules ({ commit }, payload) {
  let r
  if (payload) {
    r = await api.get(`broadcast/schedules?user=${payload}`)
  } else {
    r = await api.get('broadcast/schedules')
  }
  commit('updateSchedules', r.data)
}
