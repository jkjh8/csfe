<template>
  <!-- name -->
  <div class="listname">
    Name
  </div>
  <q-input
    v-model="name"
    outlined
    rounded
    dense
  />
  <!-- rate -->
  <div class="listname">
    Rate
  </div>
  <div class="q-mx-md">
    <q-slider
      v-model="rate"
      label
      :min="100"
      :max="200"
    />
  <!-- text -->
  </div>
  <div class="listname">
    Text
  </div>
  <q-input
    v-model="text"
    filled
    type="textarea"
  />
  <!-- bottons -->
  <div class="row justify-between q-mt-md">
    <q-btn
      style="width: 6rem; height: 2rem;"
      rounded
      flat
      @click="ttsPreview"
    >
      미리듣기
    </q-btn>
    <q-btn
      style="width: 7rem; height: 2rem;"
      rounded
      unelevated
      color="primary"
      @click="messageDialog=!messageDialog"
    >
      메시지 관리
    </q-btn>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { api } from '@/boot/axios'

export default {
  setup() {
    const { state, commit } = useStore()
    const voices = ref([])
    const name = computed({
      get () { return state.broadcast.ttsName },
      set (v) { commit('broadcast/updateTtsName', v)}
    })
    const text = computed({
      get () { return state.broadcast.ttsText },
      set (v) { commit('broadcast/updateTtsText', v) }
    })
    const rate = computed({
      get() { return state.broadcast.ttsRate },
      set (v) { commit('broadcast/updateTtsRate', v) }
    })

    async function ttsPreview () {
      const r = await api.post('/tts/preview', {
        text: text.value,
        rate: rate.value
      })
      console.log(r)
      if (r.status === 200) {
        commit('broadcast/setPreview', true)
        commit('broadcast/updatePreviewFile', {
          name: 'TTS Preview',
          src: r.data.src,
          base: 'temp'
        })
      }
    }

    onBeforeMount(async () => {
      const r = await api.get('/tts/voices')
      console.log(r)
    })

    return {
      name,
      text,
      rate,
      voices,
      ttsPreview
    }
  }
}
</script>
