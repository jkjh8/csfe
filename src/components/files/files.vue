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
                미디어 파일 관리
              </div>
              <div class="caption">
                미디어 파일을 업로드하거나 삭제할 수 있습니다
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
              @click="fnAddFolder"
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
              @click="fnUpload"
            >
              <q-icon name="svguse:icons.svg#plus-circle" />
            </q-btn>
          </div>
        </div>

        <div>
          <q-table
            flat
            :columns="[
              { name: 'type', align: 'center', label: 'Type', field: 'type', sortable: true },
              { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
              { name: 'size', align: 'center', label: 'Size', field: 'size', sortable: true },
              { name: 'actions', align: 'center', label: 'Actions' },
            ]"
            :rows="files"
            :pagination="{ rowsPerPage: 15 }"
          >
            <template #body="props">
              <q-tr
                :props="props"
                @click="clickFile(props.row)"
              >
                <q-td
                  key="type"
                  :props="props"
                >
                  <div class="row justify-start items-center q-px-md">
                    <q-icon
                      v-if="props.row.type === 'directory'"
                      name="svguse:icons.svg#folder-fill"
                      size="sm"
                      color="yellow"
                    />
                    <q-icon
                      v-else-if="props.row.type === 'audio'"
                      name="svguse:icons.svg#music-note-fill"
                      size="sm"
                      color="yellow"
                    />
                    <q-icon
                      v-else-if="props.row.type === 'video'"
                      name="svguse:icons.svg#video-came-fill"
                      size="sm"
                      color="yellow"
                    />
                    <span class="q-ml-sm">{{ props.row.type.toUpperCase() }}</span>
                  </div>
                </q-td>

                <q-td
                  key="name"
                  :props="props"
                >
                  {{ props.row.name }}
                </q-td>

                <q-td
                  key="size"
                  :props="props"
                >
                  {{ humanSize(props.row.size) }}
                </q-td>

                <q-td
                  key="actions"
                  :props="props"
                >
                  <q-btn
                    v-if="props.row.type !== 'directory'"
                    icon="play_arrow"
                    flat
                    round
                    color="green"
                    size="sm"
                    @click.stop.prevent="$store.dispatch('broadcast/startPreview', props.row)"
                  />
                  <q-btn
                    icon="delete"
                    flat
                    round
                    color="red"
                    size="sm"
                    @click.stop.prevent="fnDel(props.row)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar, format } from 'quasar'
import { api } from '@/boot/axios'

import Delete from '@components/dialog/delete'
import uploader from '@components/dialog/files'

export default {
  emits: ['close'],
  // eslint-disable-next-line no-unused-vars
  setup (props, { emit }) {
    const { commit } = useStore()
    const $q = useQuasar()
    const { humanStorageSize } = format

    const files = ref([])
    const filePath = ref(['home'])

    async function clickFile (file) {
      $q.loading.show()
      if (file.type === 'directory') {
        filePath.value.push(file.name)
        await updateDir(filePath.value)
      } else {
        commit('broadcast/updatePlayFile', file)
        emit('close')
      }
      $q.loading.hide()
    }

    async function getDir (index) {
      $q.loading.show()
      let reqPath = []
        index = index + 1
        for (let i = 0; i < index; i++) {
          reqPath.push(filePath.value[i])
        }
        filePath.value = reqPath
      await updateDir(reqPath)
      $q.loading.hide()
    }

    async function updateDir () {
      const r = await api.post('/files', { path: filePath.value })
      console.log(r)
      filePath.value = r.data.path
      files.value = r.data.files
    }

    async function fnAddFolder () {
      $q.dialog({
        component: uploader,
        componentProps: {
          title: '폴더생성',
          currentPath: filePath.value
        }
      }).onOk(async (rt) => {
        console.log(rt)
        $q.loading.show()
        try {
          const r = await api.post('/files/makeFolder', rt.path)
          console.log(r)
        } catch (err) {
          console.log('make folder error ', err)
        }
        await updateDir()
        $q.loading.hide()
      })
    }

    async function fnDel (file) {
      console.log(file)
      $q.dialog({
        component: Delete,
        componentProps: { file: file }
      }).onOk(async (rt) => {
        console.log(rt)
        const result = await api.post('/files/del', rt)
        console.log(result)
        const reqPath = filePath.value.splice(1, 1).join('/')
        console.log(reqPath)
        await updateDir(reqPath)
      })
    }

    async function fnUpload () {
      $q.dialog({
        component: uploader,
        componentProps: {
          title: '파일업로드',
          currentPath: filePath.value
        }
      }).onOk(async (rt) => {
        console.log(rt)
        $q.loading.show()
        try {
          const formData = new FormData()
          formData.append('files', rt.file)
          formData.set('path', rt.path.join('/'))
          const r = await api.post('/files/upload', formData)
          console.log(r)
          await updateDir()
        } catch (err) {
          console.error(err)
        }
        $q.loading.hide()
      })
    }

    function humanSize (bits) {
      if (bits) {
        return humanStorageSize(bits)

      } else {
        return ''
      }
    }
    onMounted(() => {
      getDir(0)
    })
    return {
      files,
      filePath,
      fnUpload,
      clickFile,
      getDir,
      updateDir,
      fnAddFolder,
      fnDel,
      humanSize
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
