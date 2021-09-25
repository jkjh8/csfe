<template>
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <q-img src="/background/cover_1.png">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon name="svguse:icons.svg#view-list" />
            <div>실시간 방송</div>
          </div>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section>
      <q-scroll-area style="height: 24rem">
        <div class="q-px-md q-gutter-md">
          <!-- mode 선택 -->
          <div class="q-gutter-sm">
            <div class="listname">Mode</div>
            <q-select
              v-model="mode"
              outlined
              rounded
              dense
              :options="['Live', 'TTS', 'Play Audio']"
            />
          </div>
          <!-- 라이브 -->
          <div v-if="mode === 'Live'" class="q-gutter-sm">
            <div class="listname">방송채널선택</div>
            <q-select
              v-model="liveChannel"
              outlined
              rounded
              dense
              :options="[1, 2, 3, 4]"
            />
          </div>
          <!-- TTS -->
          <div v-if="mode === 'TTS'" class="q-gutter-sm">
            <div class="listname">TEXT</div>
            <q-input v-model="ttsText" class="bg-grey-2" type="textarea" />
            <div class="row justify-between q-mt-md">
              <q-btn rounded unelevated color="yellow-10"> 미리듣기 </q-btn>
              <q-btn rounded unelevated color="primary"> 메세지관리 </q-btn>
            </div>
          </div>
          <!-- play audio file -->
          <div v-if="mode === 'Play Audio'" class="q-gutter-sm">
            <div class="listname" />
            <div class="row justify-center items-center q-mt-md">
              <q-btn
                class="full-width"
                rounded
                unelevated
                color="primary"
                @click="getDir('/')"
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
        />
      </div>
    </q-card-actions>
  </q-card>

  <!-- 다이얼 로그 -->
  <q-dialog v-model="fileDialog">
    <FileSelect />
  </q-dialog>

  <!-- 미리듣기 플레이어 -->
  <q-dialog
    v-model="preview"
    seamless
    transition-show="fade"
    transition-hide="fade"
  >
    <AudioPlayer :file="selectFile" />
  </q-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

import AudioPlayer from './audioPlay'
import FileSelect from '@components/broadcast/live/selectFile'

export default {
  components: { AudioPlayer, FileSelect },
  setup() {
    const { state, getters } = useStore()
    const $q = useQuasar()
    const selected = computed(() => state.locations.selectedId)
    const group = computed(() => getters['locations/selectedGroup'])

    const mode = ref('Play Audio')
    const liveChannel = ref(1)
    const ttsText = ref('')
    const playAudioFile = ref('')
    const fileDialog = ref(false)
    const filePath = ref([''])
    const files = ref([])
    const selectFile = ref(null)
    const preview = ref(false)

    async function clickFile(file) {
      $q.loading.show()
      if (file.type === 'directory') {
        const reqPath = filePath.value.splice(1, 1).join('/') + '/' + file.name
        console.log(reqPath)
        await updateDir(reqPath)
      } else {
        console.log(file)
      }
      $q.loading.hide()
    }

    async function getDir(index) {
      $q.loading.show()
      let reqPath = ''
      if (index) {
        for (let i = 0; i < index; i++) {
          reqPath = reqPath + '/' + filePath.value[i + 1]
        }
      } else {
        reqPath = '/'
      }
      if (!fileDialog.value) {
        fileDialog.value = true
      }
      await updateDir(reqPath)
      $q.loading.hide()
    }

    async function updateDir(reqPath) {
      const r = await api.get(`/files?link=${reqPath}`)
      filePath.value = r.data.path
      if (filePath.value[filePath.value.length] === '') {
        filePath.value.splice(-1, 1)
      }
      files.value = r.data.files
    }

    return {
      selected,
      group,
      mode,
      liveChannel,
      ttsText,
      playAudioFile,
      selectFile,
      files,
      fileDialog,
      filePath,
      preview,
      clickFile,
      getDir
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
