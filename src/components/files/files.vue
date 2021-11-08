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
          <div v-if="user && user.admin">
            <q-btn-toggle
              v-model="folder"
              unelevated
              toggle-color="grey-5"
              :options="[
                { label: 'Media', value: 'media' },
                { label: 'Temp', value: 'temp' },
                { label: 'Schedule', value: 'schedule'}
              ]"
              @update:model-value="fnChangeFolder"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- 폴더 관리 -->
    <q-card-section>
      <div class="fit row">
        <div
          class="q-px-md"
          style="width:30%;"
        >
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
            <span>
              <button
                v-if="user && user.admin"
                class="dir"
                @click="fnChangeFolder"
              >
                /
              </button>
            </span>
            <span
              v-for="(path, index) in filePath"
              :key="index"
            >
              <button
                class="dir"
                @click="fnGetPath(index)"
              >
                {{ path }}
              </button>
            </span>
          </div>
        </div>

        <q-separator
          style="width: 1px;"
          vertical
        />

        <div
          class="q-px-md"
          style="width: 69%"
        >
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
              :pagination="{ rowsPerPage: 0 }"
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
                    <div class="row justify-center">
                      <FileIcon :file="props.row" />
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
                      v-if="props.row.type === 'audio' || props.row.type === 'video'"
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
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed, onBeforeMount, onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import { useQuasar, format } from 'quasar'
import { api } from '@/boot/axios'

import FileIcon from '@components/files/fileIcon'

import Delete from '@components/dialog/delete'
import uploader from '@components/dialog/files'

export default {
  // eslint-disable-next-line no-unused-vars
  components: { FileIcon },
  setup () {
    const { state, commit, dispatch } = useStore()
    const $q = useQuasar()
    const { humanStorageSize } = format
    const $route = inject('$route')

    const user = computed(() => state.user.user)
    const files = ref([])
    const filePath = ref([])
    const folder = ref('media')
    const admin = false

    async function clickFile (file) {
      $q.loading.show()
      try {
        if (file.type === 'directory') {
          filePath.value.push(file.name)
          await fnUpdatePath(filePath.value)
        } else {
          commit('broadcast/updatePlayFile', file)
        }
      } catch (err) {
        console.error(err)
      }
      $q.loading.hide()
    }

    async function fnGetPath (index) {
      $q.loading.show()
      try {
        let reqPath = []
          index = index + 1
          for (let i = 0; i < index; i++) {
            reqPath.push(filePath.value[i])
          }
          filePath.value = reqPath
        await fnUpdatePath(reqPath)
      } catch (err) {
        console.error(err)
      }
      $q.loading.hide()
    }

    async function fnUpdatePath () {
      const r = await api.post('/files', { folder: folder.value, path: filePath.value })
      filePath.value = r.data.path
      files.value = r.data.files
    }

    async function fnChangeFolder () {
      const r = await api.post('/files', { folder:folder.value, path: [] })
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
          const r = await api.post('/files/makeFolder', { ...rt.path, folder: folder.value })
          console.log(r)
        } catch (err) {
          console.log('make folder error ', err)
        }
        await fnUpdatePath()
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
        await fnUpdatePath(reqPath)
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
          formData.set('folder', folder.value)
          const r = await api.post('/files/upload', formData)
          console.log(r)
          await fnUpdatePath()
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

    onBeforeMount(() => {
      dispatch('user/getUser')
    })
    onMounted(() => {
      console.log($route.path)
      if (!user.value.admin) {
        filePath.value.push('home')
      } 
      fnGetPath(0)
    })
    return {
      admin,
      user,
      folder,
      files,
      filePath,
      fnUpload,
      clickFile,
      fnGetPath,
      fnUpdatePath,
      fnAddFolder,
      fnDel,
      fnChangeFolder,
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
