<template>
  <!-- name -->
  <div class="q-mx-sm">
    <q-input
      v-model="name"
      label="Name"
      dense
    />
  </div>
  <!-- voice -->
  <div class="q-mx-sm">
    <q-select
      v-model="voice"
      :options="voices"
      option-label="name"
      :display-value="voice ? `${voice.name} - ${voice.languages}`: 'None'"
      emit-value
      map-options
      dense
      label="Voices"
    >
      <template #option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-icon
              name="mic"
              color="green"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ scope.opt.name }}
            </q-item-label>
            <q-item-label caption>
              {{ scope.opt.languages.toString(',') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
  <!-- rate -->
  <div class="text-grey">
    Rate
  </div>
  <div
    class="q-mx-md"
  >
    <q-slider
      v-model="rate"
      style="position: relative; top: -10px; height: 20px;"
      label
      :min="100"
      :max="300"
    />
  <!-- text -->
  </div>
  <q-input
    v-model="text"
    label="Text"
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
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

export default {
  setup() {
    const { state, commit } = useStore()
    const $q = useQuasar()
    const user = computed(() => state.user.user)
    const voices = ref([])
    const voice = ref(null)
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
        user: user.value.email,
        name: name.value,
        text: text.value,
        voice: voice.value.id,
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

      $q.loading.show()
      let r = await api.get('/tts/voices')
      voices.value = r.data.voices
      console.log(r)
      // r = await api.get('/tts/rate')
      commit('broadcast/updateTtsRate', r.data.rate)
      $q.loading.hide()
    })

    return {
      name,
      text,
      rate,
      voice,
      voices,
      ttsPreview
    }
  }
}
</script>
