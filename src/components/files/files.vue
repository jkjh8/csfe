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
          <!-- <q-btn
            round
            flat
            @click="mdAddFolder=!mdAddFolder"
          >
            <q-icon name="svguse:icons.svg#plus-circle" />
          </q-btn> -->
        </div>
      </div>
    </q-card-section>

    <!-- 폴더 관리 -->
    <q-card-section>
      <div class="q-pa-md">
        <div class="listname row justify-between items-center">
          <div class="row">
            <q-icon
              name="svguse:icons.svg#folder-fill"
              color="yellow"
              size="sm"
            />
            <div class="q-ml-sm">
              폴더관리
            </div>
          </div>
          <div>
            <q-btn
              round
              flat
              color="grey"
              @click="mdAddFolder=!mdAddFolder"
            >
              <q-icon name="svguse:icons.svg#plus-circle" />
            </q-btn>
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

        <!-- 파일 탭 시작 -->
        <div class="listname row justify-between items-center">
          <div class="row">
            <q-icon
              name="save"
              size="sm"
              color="blue"
            />
            <div class="q-ml-sm">
              파일시스템
            </div>
          </div>
          <div>
            <q-btn
              round
              flat
              color="grey"
              @click="mdAddFile=!mdAddFile"
            >
              <q-icon name="svguse:icons.svg#plus-circle" />
            </q-btn>
          </div>
        </div>

        <!-- 파일 리스트 -->
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
                      @click.stop.prevent="$store.dispatch('broadcast/startPreview', file)"
                    />
                    <q-btn
                      icon="delete"
                      flat
                      round
                      color="red"
                      size="sm"
                      @click.stop.prevent="selectedFile = file;mdDel = true"
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

  <!-- 폴더 추가 -->
  <q-dialog v-model="mdAddFolder">
    <q-card class="card-small">
      <q-card-section class="q-pa-none">
        <div
          class="backg-re-gr"
          style="height: 4rem"
        >
          <div class="card-name-align">
            <div class="card-name-sm">
              <q-icon
                name="svguse:icons.svg#folder-fill"
                color="yellow"
              />
              <div>폴더 추가</div>
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
              현재 폴더
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
              name="svguse:icons.svg#folder-fill"
              size="sm"
              color="yellow-8"
            />
            <div class="q-ml-sm">
              폴더 이름
            </div>
          </div>
          <q-input
            v-model="addFolderName"
            class="q-my-sm"
            outlined
            rounded
            dense
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
          :disable="!addFolderName"
          class="q-mx-sm"
          style="width: 6rem; height: 2rem;"
          rounded
          unelevated
          color="grey-10"
          no-caps
          label="업로드"
          @click="fnAddFolder"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- 파일 추가 -->
  <q-dialog v-model="mdAddFile">
    <q-card class="card-small">
      <q-card-section class="q-pa-none">
        <div
          class="backg-re-gr"
          style="height: 4rem"
        >
          <div class="card-name-align">
            <div class="card-name-sm">
              <q-icon
                name="svguse:icons.svg#folder-fill"
                color="yellow"
              />
              <div>폴더 추가</div>
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
              현재 폴더
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
              name="svguse:icons.svg#folder-fill"
              size="sm"
              color="yellow-8"
            />
            <div class="q-ml-sm">
              파일
            </div>
          </div>
          <q-file
            v-model="uploadFile"
            class="q-my-sm"
            outlined
            rounded
            dense
            accept=".mp3, *.mp4, *.wav, audio/*, video/*"
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

  <!-- 삭제 -->
  <q-dialog v-model="mdDel">
    <q-card class="card-small">
      <q-card-section class="q-pa-none">
        <div
          class="backg-re-gr"
          style="height: 4rem"
        >
          <div class="card-name-align">
            <div class="card-name-sm">
              <q-icon
                name="svguse:icons.svg#folder-fill"
                color="yellow"
              />
              <div>삭제</div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-px-md">
          <div class="listname row">
            <q-icon
              name="svguse:icons.svg#exclamation"
              color="red"
              size="sm"
            />
            <div class="q-ml-sm">
              삭제 대상
            </div>
          </div>
          <div class="q-mt-sm">
            <div v-if="selectedFile.type === 'directory'">
              <q-icon
                name="svguse:icons.svg#folder-fill"
                color="yellow"
                size="sm"
              />
              <span class="q-ml-sm">
                {{ filePath.join(' / ') }}/{{ selectedFile.name }}
              </span>
            </div>
            <div v-else>
              <q-icon
                name="save"
                color="blue-grey"
                size="sm"
              />
              <span class="q-ml-sm">
                {{ selectedFile.name }}
              </span>
            </div>
          </div>
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
          class="q-mx-sm"
          style="width: 6rem; height: 2rem;"
          rounded
          unelevated
          color="grey-10"
          no-caps
          label="삭제"
          @click="fnDel"
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

    const selectedFile = ref(null)
    const files = ref([])
    const filePath = ref([''])
    const selectForPlay = ref(null)

    const mdAddFolder = ref(false)
    const addFolderName = ref(null)

    const mdAddFile = ref(false)
    const uploadFile = ref(null)
    const mdDel = ref(false)

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
      console.log(reqPath)
      const r = await api.get(`/files?link=${reqPath}`)
      filePath.value = r.data.path
      if (filePath.value[filePath.value.length] === '') {
        filePath.value.splice(-1, 1)
      }
      files.value = r.data.files
    }

    async function fnAddFolder () {
      $q.loading.show()
      try {
        console.log(filePath.value, addFolderName.value)
        const r = await api.post('/files/makeFolder', {
          currentPath: filePath.value,
          folder : addFolderName.value
        })
        console.log(r)
        addFolderName.value = ''
      } catch (err) {
        console.log('make folder error ', err)
      }
      const reqPath = filePath.value.splice(1, 1).join('/')
      await updateDir(reqPath)
      $q.loading.hide()
    }

    async function fnDel () {
      const result = await api.post('/files/del', selectedFile.value)
      console.log(result)
      selectedFile.value = null
      const reqPath = filePath.value.splice(1, 1).join('/')
      console.log(reqPath)
      await updateDir(reqPath)
    }

    async function fnUpload () {
      const formData = new FormData()
      const reqPath = filePath.value.splice(1, 1).join('/')
      formData.append('files', uploadFile.value)
      formData.set('path', reqPath)
      const r = await api.post('/files/upload', formData)
      console.log(r)
      uploadFile.value = null
      await updateDir(reqPath)
    }

    onMounted(() => {
      getDir('/')
    })
    return {
      selectedFile,
      files,
      filePath,
      mdAddFolder,
      addFolderName,
      mdAddFile,
      uploadFile,
      fnUpload,
      selectForPlay,
      clickFile,
      getDir,
      updateDir,
      fnAddFolder,
      mdDel,
      fnDel
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
