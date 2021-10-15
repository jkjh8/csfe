<template>
  <div v-if="error">
    <div style="position: relative; height: 3rem;">
      <div
        class="bg-red text-white row justify-end"
        style="position: absolute; border-radius: 1.5rem; width:100%; height: 3rem;"
      >
        <q-btn
          style="z-index: 10;"
          round
          flat
          icon="cancel"
          @click="error=null"
        />
      </div>
      <div
        style="position: absolute;
                      width:100%;
                      text-align: center;
                      color: white;
                      line-height: 3rem;"
      >
        {{ error }}
      </div>
    </div>
  </div>
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
  <div class="text-grey row nowrap justify-between items-center">
    <div>
      Rate
    </div>
    <q-slider
      v-model="rate"
      style="width: 90%"
      label
      :min="100"
      :max="300"
    />
  </div>
  <!-- text -->
  <div style="height: 200px;">
    <q-input
      v-model="text"
      label="Text"
      filled
      type="textarea"
    />
  </div>
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
      @click="mdMessage=!mdMessage"
    >
      메시지 관리
    </q-btn>
  </div>

  <q-dialog v-model="mdMessage">
    <TtsMessages />
  </q-dialog>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

import TtsMessages from '@components/broadcast/live/ttsMessages'

export default {
  components: { TtsMessages },
  emits: ['close', 'update'],
  setup(props, { emit }) {
    const { state, commit, dispatch } = useStore()
    const $q = useQuasar()
  
    const error = ref('')
    const mdMessage = ref(false)
    const user = computed(() => state.user.user)
    const voices = computed(() => state.broadcast.ttsVoices)
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
    const voice = computed({
      get () { return state.broadcast.ttsVoice },
      set (v) { commit('broadcast/updateTtsVoice', v) }
    })

    async function ttsPreview () {
      error.value = ''
      if (!voice.value) {
        return error.value = 'Voice를 선택해 주세요.'
      }
      const r = await api.post('/broadcast/tts/preview', {
        user: user.value.email,
        name: name.value,
        rate: rate.value,
        voice: voice.value,
        text: text.value,
      })
      console.log(r)
      if (r.status === 200) {
        commit('broadcast/setPreview', true)
        commit('broadcast/updatePreviewFile', {
          nameTag: 'TTS Preview',
          name: r.data.src,
          base: 'temp',
          type: 'audio'
        })
      }
    }
    function onSubmit(item) { 
      emit('update', item)
    }

    onBeforeMount(async () => {
      $q.loading.show()
      await dispatch('broadcast/getTtsInfo')
      $q.loading.hide()
    })

    return {
      error,
      name,
      text,
      rate,
      voice,
      voices,
      mdMessage,
      ttsPreview,
      onSubmit
    }
  }
}
</script>
