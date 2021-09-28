<template>
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <div class="backg-dark">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon
              class="q-ml-sm"
              name="save"
              color="primary"
              size="md"
            />
            <div class="q-ml-md">
              <div class="name">
                파일선택
              </div>
              <div class="caption">
                재생할 파일을 선택하세요
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div>
        <span
          v-for="(path, index) in filePath"
          :key="index"
        >
          <button
            class="dir"
            @click="getDir(index)"
          >
            {{ path }}
          </button>
        </span>
      </div>
      <div>
        <q-scroll-area style="height: 20rem">
          <q-list>
            <q-item
              v-for="file in files"
              :key="file.idx"
              class="q-px-sm radius"
              dense
              clickable
              @click="clickFile(file)"
            >
              <!-- 아이콘 -->
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
              <!-- 파일 이름 -->
              <q-item-section>
                {{ file.name }}
              </q-item-section>
              <!-- 미리 듣기 -->
              <q-item-section
                v-if="file.type !== 'directory'"
                side
              >
                <q-btn
                  icon="play_arrow"
                  flat
                  round
                  color="green"
                  @click.stop.prevent="startPreview(file)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </q-card-section>
  </q-card>

  <q-dialog
    v-model="preview"
    seamless
    transition-show="fade"
    transition-hide="fade"
  >
    <AudioPlayer :file="selectForPlay" />
  </q-dialog>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

import AudioPlayer from '@components/broadcast/audioPlay'

export default {
  components: { AudioPlayer },
  emits: ['close'],
  // eslint-disable-next-line no-unused-vars
  setup (props, { emit }) {
    const { commit } = useStore()
    const $q = useQuasar()

    const files = ref([])

    const fileDialog = ref(false)
    const filePath = ref([''])
    const selectForPlay = ref(null)

    const preview = ref(false)

    async function clickFile (file) {
      $q.loading.show()
      if (file.type === 'directory') {
        const reqPath = filePath.value.splice(1, 1).join('/') + '/' + file.name
        console.log(reqPath)
        await updateDir(reqPath)
      } else {
        commit('broadcast/updatePlayFile', file)
        emit('close')
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
      if (!fileDialog.value) {
        fileDialog.value = true
      }
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
    function startPreview (file) {
      commit('broadcast/setPreview', true)
      commit('broadcast/updatePreviewFile', file)
    }

    onMounted(() => {
      getDir('/')
    })
    return {
      files,
      filePath,
      fileDialog,
      preview,
      selectForPlay,
      clickFile,
      getDir,
      updateDir,
      startPreview
    }
  }
}
</script>

<style scoped>
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
