<template>
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <div class="backg-gr-bl">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon
              name="mic"
              color="red"
            />
            <div>카카오 TTS</div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-scroll-area style="height: 25rem">
        <div class="q-px-md q-gutter-md">
          <!-- mode 선택 -->
          <div class="q-gutter-sm">
            <div class="q-mx-sm">
              <q-select
                v-model="voice"
                dense
                emit-value
                map-options
                label="Voices"
                :options="voices"
              />
            </div>

            <div class="q-mx-sm">
              <q-select
                v-model="rate"
                dense
                emit-value
                map-options
                label="속도"
                :options="rates"
              />
            </div>

            <div class="q-mx-sm">
              <q-select
                v-model="volume"
                dense
                emit-value
                map-options
                label="볼륨"
                :options="volumes"
              />
            </div>

            <div class="q-mx-sm q-mt-md">
              <q-input
                v-model="text"
                type="textarea"
                filled
                label="Message"
              />
            </div>
          </div>
          
          <q-separator />
          <q-card-actions align="center">
            <div class="q-mx-md fit">
              <q-btn
                class="full-width"
                style="height: 2rem; margin: 0.5rem 1rem"
                rounded
                unelevated
                color="primary"
                label="미리듣기"
                @click="ttsPreview"
              />
            </div>
          </q-card-actions>
        </div>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
const voices = [
  { label: '여성 차분한 낭독체', value: 'WOMAN_READ_CALM' },
  { label: '남성 차분한 낭독체', value: 'MAN_READ_CALM' },
  { label: '여성 밝은 대화체', value: 'WOMAN_DIALOG_BRIGHT' },
  { label: '남성 밝은 대화체', value: 'MAN_DIALOG_BRIGHT' }
]
const rates = ['slow', 'medium', 'fast']
const volumes = ['soft', 'medium', 'loud']

import { ref } from 'vue'
import { useStore } from 'vuex'
import { api } from '@/boot/axios'

export default {
  setup() {
    const { commit } = useStore() 
    const voice = ref('WOMAN_READ_CALM')
    const rate = ref('medium')
    const volume = ref('medium')
    const text = ref('')

    async function ttsPreview () {
      const r = await api.post('/broadcast/tts/kakao', {
        rate: rate.value,
        volume: volume.value,
        voice: voice.value,
        text: text.value,
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

    return {
      voices,
      voice,
      rates,
      rate,
      volumes,
      volume,
      text,
      ttsPreview
    }
  }
}
</script>
