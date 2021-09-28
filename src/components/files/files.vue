<template>
  <q-card class="card-full">
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
                파일 관리
              </div>
              <div class="caption">
                파일을 업로드하거나 삭제할 수 있습니다
              </div>
            </div>
          </div>
          <q-btn
            round
            flat
            @click="mdUploader=!mdUploader"
          >
            <q-icon name="svguse:icons.svg#plus-circle" />
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-pa-md">
        <div class="listname row items-center">
          <q-icon
            name="svguse:icons.svg#folder-fill"
            color="yellow"
            size="sm"
          />
          <div class="q-ml-sm">
            폴더관리
          </div>
        </div>
        <div class="q-mt-sm">
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

        <q-separator class="q-my-md" />

        <div class="listname row items-center">
          <q-icon
            name="save"
            size="sm"
            color="blue"
          />
          <div class="q-ml-sm">
            파일시스템
          </div>
        </div>
        <div class="q-mt-md">
          <q-scroll-area style="height: 26rem">
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
                <!-- 기능 -->
                <q-item-section side>
                  <div>
                    <q-btn
                      v-if="file.type !== 'directory'"
                      icon="play_arrow"
                      flat
                      round
                      color="green"
                      size="sm"
                      @click.stop.prevent="startPreview(file)"
                    />
                    <q-btn
                      icon="delete"
                      flat
                      round
                      color="red"
                      size="sm"
                      @click.stop.prevent="startPreview(file)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <q-dialog v-model="mdUploader">
    <q-card class="card-small">
      <q-card-section class="q-pa-none">
        <div
          class="backg-re-gr"
          style="height: 4rem"
        >
          <div class="card-name-align">
            <div class="card-name-sm">
              <q-icon
                name="save"
                color="blue-grey-10"
              />
              <div>파일 업로드</div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-px-md">
          <div class="listname row">
            <q-icon
              name="svguse:icons.svg#folder-fill"
              color="yellow"
              size="sm"
            />
            <div class="q-ml-sm">
              업로드 폴더
            </div>
          </div>
          <div class="q-mt-sm">
            {{ filePath.join(' / ') }}
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-md">
          <div class="listname row items-center">
            <q-icon
              name="save"
              size="sm"
              color="blue"
            />
            <div class="q-ml-sm">
              파일 선택
            </div>
          </div>
          <q-file
            v-model="uploadFile"
            class="q-my-sm"
            outlined
            rounded
            dense
            accept=".mp3, *.mp4, *.wav, audio/*"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          v-close-popup
          style="width: 6rem; height: 2rem;"
          rounded
          flat
          no-caps
          label="닫기"
        />
        <q-btn
          v-close-popup
          :disable="!uploadFile"
          class="q-mx-sm"
          style="width: 6rem; height: 2rem;"
          rounded
          unelevated
          color="grey-10"
          no-caps
          label="업로드"
          @click="fnUpload"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

export default {
  emits: ['close'],
  // eslint-disable-next-line no-unused-vars
  setup (props, { emit }) {
    const { commit } = useStore()
    const $q = useQuasar()

    const files = ref([])
    const filePath = ref([''])
    const selectForPlay = ref(null)

    const mdUploader = ref(false)
    const uploadFile = ref(null)

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

    function fnUpload () {
      console.log(uploadFile.value)
    }

    onMounted(() => {
      getDir('/')
    })
    return {
      files,
      filePath,
      mdUploader,
      uploadFile,
      selectForPlay,
      clickFile,
      getDir,
      updateDir,
      startPreview,
      fnUpload
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
