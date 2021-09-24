<template>
  <q-card class="shadow-15 location_card" style="width: 24rem;">
    <q-card-section class="q-pa-none">
      <q-img
        src="/background/cover_1.png" style="height:6rem;"
      >
        <div class="q-ml-sm fit row items-center text-white">
          <q-icon name="svguse:icons.svg#view-list" size="1.5rem" />
          <div class="q-ml-md name">실시간 방송</div>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section>
      <q-scroll-area style="height: 24rem;">
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
          <div
            v-if="mode === 'Live'"
            class="q-gutter-sm"
          >
            <div class="listname">방송채널선택</div>
            <q-select
              v-model="liveChannel"
              outlined rounded dense
              :options="[1, 2, 3, 4]"
            />
          </div>
          <!-- TTS -->
          <div
            v-if="mode === 'TTS'"
            class="q-gutter-sm"
          >
            <div class="listname">TEXT</div>
            <q-input
              v-model="ttsText"
              class="bg-grey-2"
              type="textarea"
            />
            <div class="row justify-between q-mt-md">
              <q-btn rounded unelevated color="yellow-10">미리듣기</q-btn>
              <q-btn rounded unelevated color="primary">메세지관리</q-btn>
            </div>
          </div>
          <!-- play audio file -->
          <div
            v-if="mode === 'Play Audio'"
            class="q-gutter-sm"
          >
            <div class="listname"></div>
            <div class="row justify-center items-center q-mt-md">
              <q-btn
                class="full-width"
                rounded unelevated
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
      <div class="fit row justify-center items-center" style="height: 4rem;">
        <q-btn
          style="width: 20rem; height:2rem; margin: 5px 0;"
          rounded
          unelevated
          color="primary"
          label="방송시작"
        ></q-btn>
      </div>
    </q-card-actions>
  </q-card>

  <!-- 다이얼 로그 -->
  <q-dialog v-model="fileDialog">
    <q-card style="width: 26rem; border-radius: 2rem;">
      <q-card-section class="q-pa-none">
        <q-img src="/background/cover_11.jpg" style="height: 6rem;">
          <div class="fit row items-center">
            <q-icon
              class="q-ml-sm"
              name="save" color="primary" size="md"
            />
            <div class="q-ml-md">
              <div class="name">파일선택</div>
              <div class="caption">재생할 파일을 선택하세요</div>
            </div>
          </div>
        </q-img>
      </q-card-section>

      <q-card-section>
        <div>
          <span v-for="(path, index) in filePath" :key="index">
          <button
            class="dir" @click="getDir(index)"
          >
            {{ path }}
          </button>
          </span>
        </div>
        <div>
          <q-list>
            <q-item>
              <q-item-section>
                <q-list>
                  <q-item dense clickable
                    v-for="file in files" :key="file.idx"
                    @click="clickFile(file)"
                  >
                    <!-- 아이콘 -->
                    <q-item-section avatar>
                      <div v-if="file.type === 'directory'">
                        <q-icon name="svguse:icons.svg#folder-fill" color="yellow" size="md" />
                      </div>
                      <div v-else-if="file.type === 'audio'">
                        <q-icon name="svguse:icons.svg#music-note-fill" color="grey" size="sm" />
                      </div>
                    </q-item-section>
                    <!-- 파일 이름 -->
                    <q-item-section>
                      {{ file.name }}
                    </q-item-section>
                    <!-- 미리 듣기 -->
                    <q-item-section side v-if="file.type !== 'directory'">
                      <q-btn icon="play_arrow" flat round color="green"
                        @click.stop.prevent="preview = true"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- 미리듣기 플레이어 -->
  <q-dialog v-model="preview" seamless transition-show="fade" transition-hide="fade">
    <div class="fixed-bottom-right q-ma-md shadow-0" style="background: transparent;">
      <audio style="width: 20rem;" controls></audio>
      <q-btn class="fixed-top" round></q-btn>
    </div>
  </q-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

export default {
  setup () {
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
    const preview = ref(false)

    async function clickFile (file) {
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

    async function getDir (index) {
      $q.loading.show()
      let reqPath = ''
      if (index) {
        for (let i = 0; i < index; i++) {
          reqPath = reqPath + '/' + filePath.value[i + 1]
        }
      } else {
        reqPath = '/'
      }
      if (!fileDialog.value) { fileDialog.value = true }
      await updateDir(reqPath)
      $q.loading.hide()
    }

    async function updateDir (reqPath) {
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
:deep(.q-img__image) {
  -webkit-filter: blur(8px);
  filter: blur(8px);
}
.dir {
  text-decoration: underline;
  font-size: .8rem;
  font-family: 나눔고딕;
  font-weight: 700;
  border: none;
  color: #676767;
  background: #FBFBFB;
}
.dir:hover {
  font-weight: 700;
  color: #111;
  cursor: pointer;
}
</style>
