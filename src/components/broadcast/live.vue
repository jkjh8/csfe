<template>
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <div class="backg-dark-g">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon name="svguse:icons.svg#view-list" />
            <div>실시간 방송</div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-scroll-area style="height: 29rem">
        <div class="q-px-md q-gutter-md">
          <!-- mode 선택 -->
          <div class="q-gutter-sm">
            <div class="q-mx-sm">
              <q-select
                v-model="mode"
                dense
                label="Mode"
                :options="['Live', 'TTS', 'Play Audio']"
              />
            </div>
          </div>
          <!-- 라이브 -->
          <div
            v-if="mode === 'Live'"
            class="q-gutter-sm"
          >
            <div class="q-mx-sm">
              <q-select
                v-model="liveChannel"
                dense
                label="Live Channel"
                :options="[1, 2, 3, 4]"
              />
            </div>
          </div>
          <!-- TTS -->
          <div
            v-if="mode === 'TTS'"
            class="q-gutter-sm"
          >
            <TTS />
          </div>
          <!-- play audio file -->
          <div
            v-if="mode === 'Play Audio'"
            class="q-gutter-sm"
          >
            <div
              v-if="file"
              class="q-mt-lg"
            >
              <div class="listname">
                선택된 파일은
              </div>
              <div>
                <q-item>
                  <q-item-section avatar>
                    <div v-if="file.type === 'directory'">
                      <q-icon
                        name="svguse:icons.svg#folder-fill"
                        color="yellow"
                        size="md"
                      />
                    </div>
                    <div v-else-if="file.type === 'audio'">
                      <q-icon
                        name="svguse:icons.svg#music-note-fill"
                        color="grey"
                        size="sm"
                      />
                    </div>
                    <div v-else-if="file.type === 'video'">
                      <q-icon
                        name="svguse:icons.svg#video-camera-fill"
                        color="blue-grey"
                        size="sm"
                      />
                    </div>
                  </q-item-section>
                  <q-item-section>
                    {{ file.name }}
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      round
                      flat
                      icon="play_arrow"
                      color="green"
                      @click="$store.dispatch('broadcast/startPreview', file)"
                    />
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <div class="row justify-center items-center q-mt-md">
              <q-btn
                class="full-width"
                rounded
                unelevated
                color="primary"
                @click="mdFile = true"
              >
                파일선택
              </q-btn>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>
    <q-separator />
    <q-card-actions align="center">
      <div class="q-mx-md fit">
        <q-btn
          class="full-width"
          style="height: 2rem; margin: 0.5rem 1rem"
          rounded
          unelevated
          color="primary"
          label="방송시작"
          @click="startLive"
        />
      </div>
    </q-card-actions>
  </q-card>

  <!-- 다이얼 로그 -->
  <q-dialog v-model="mdFile">
    <FileSelect
      @close="mdFile=false"
      @update="updateFile"
    />
  </q-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { api } from '@/boot/axios'

import TTS from '@components/broadcast/live/tts'
import FileSelect from '@components/broadcast/fileSelect'

export default {
  components: {
    TTS,
    FileSelect
  },
  setup() {
    const { state, getters, commit } = useStore()
    const selected = computed(() => state.locations.selectedId)
    const group = computed(() => getters['locations/selectedGroup'])
    const file = computed(() => state.broadcast.playFile)
    const mode = computed({
      get () { return state.broadcast.liveMode },
      set (v) { return commit('broadcast/updateLiveMode', v)}
    })
    const tts = computed({
      get () { return state.broadcast.tts},
      set (v) { return commit('updateTts', v)}
    })
    const liveChannel = computed({
      get () { return state.broadcast.liveChannel },
      set (v) { return commit('broadcast/updateLiveChannel', v)}
    })
    // const ttsText = ref('')
    const playAudioFile = ref('')
    const mdFile = ref(false)
    const messageDialog = ref(false)
    const preview = ref(false)

    function startLive () {
      console.log('start live')
      commit('broadcast/setLive', true)
    }

    function startPreview (file) {
      commit('broadcast/setPreview', true)
      commit('broadcast/updatePreviewFile', file)
    }

    async function ttsPreview () {
      const r = await api.post('/tts/preview', {
        text: tts.value.text
      })
      console.log(r)
    }

    function updateFile (file) {
      commit('broadcast/updatePlayFile', file)
      mdFile.value = false
    }

    return {
      selected,
      group,
      mode,
      liveChannel,
      tts,
      messageDialog,
      playAudioFile,
      file,
      mdFile,
      preview,
      startPreview,
      startLive,
      ttsPreview,
      updateFile,
    }
  }
}
</script>

<style scoped>
.q-textarea .q-field__native {
  padding: 5px 5px !important;
}

.close {
  position: absolute;
  top: -8px;
  right: -8px;
  border: 4px solid #fefefe;
}
audio::-webkit-media-controls-enclosure {
  border-radius: 5px;
  background-color: #fff;
}
</style>
