<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section class="bg-grey-1">
        <div class="row items-center q-gutter-md">
          <q-avatar
            color="teal-1"
            size="2.5rem"
          >
            <q-icon
              name="save"
              color="teal"
              size="1.5rem"
            />
          </q-avatar>
          <div>
            <div style="font-size: 1.2rem;">
              파일선택
            </div>
            <div class="caption">
              웹서버에 등록된 파일을 선택합니다.
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-md q-gutter-sm">
          <span
            v-for="(path, idx) in filePath"
            :key="idx"
          >
            <button
              class="dir"
              @click="fnGetPath(idx)"
            >
              <div>{{ path }}</div>
            </button>
          </span>

          <q-separator inset />

          <div>
            <q-scroll-area style="height: 280px;">
              <q-list>
                <q-item
                  v-for="file in files"
                  :key="file.idx"
                  class="q-px-sm"
                  dense
                  clickable
                  :active="selected === file"
                  active-class="selected-item"
                  @click="fnClickItem(file)"
                >
                  <q-item-section avatar>
                    <div v-if="file.type === 'directory'">
                      <q-avatar
                        color="yellow-2"
                        size="1.8rem"
                      >
                        <q-icon
                          name="svguse:icons.svg#folder-fill"
                          color="yellow-8"
                          size="1.2rem"
                        />
                      </q-avatar>
                    </div>
                    <div v-if="file.type === 'audio'">
                      <q-avatar
                        color="cyan-1"
                        size="1.8rem"
                      >
                        <q-icon
                          name="svguse:icons.svg#music-note-fill"
                          color="cyan-8"
                          size="1rem"
                        />
                      </q-avatar>
                    </div>
                    <div v-if="file.type === 'video'">
                      <q-avatar
                        color="blue-grey-1"
                        size="1.8rem"
                      >
                        <q-icon
                          name="svguse:icons.svg#video-camera-fill"
                          color="blue-grey-8"
                          size="1rem"
                        />
                      </q-avatar>
                    </div>
                  </q-item-section>
                  <q-item-section>
                    {{ file.name }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <div class="q-mx-sm q-gutter-sm">
          <q-btn
            label="취소"
            rounded
            unelevated
            @click="onCancelClick"
          />
          <q-btn
            color="primary"
            label="확인"
            unelevated
            rounded
            @click="onOKClick(selected)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, onMounted } from 'vue'
import { api } from '@/boot/axios'

export default {
  props: {
    item: Object
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],

  setup () {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const $q = useQuasar()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const error = ref('')
    const files = ref([])
    const filePath = ref([])
    const selected = ref(null)

    async function fnClickItem (file) {
      $q.loading.show()
      try {
        if (file.type === 'directory') {
          const reqPath = filePath.value.splice(1, 1).join('/') + '/' + file.name
          await fnUpdate(reqPath)
        } else {
          $q.loading.hide()
          selected.value = file
        }
      } catch (err) {
        error.value = err
      }
      $q.loading.hide()
    }

    async function fnGetPath (idx) {
      $q.loading.show()
      try {
        let reqPath = ''
        if (idx) {
          for (let i = 0; i < idx; i ++) {
            reqPath = reqPath + '/' + filePath.value[i + 1]
          }
        } else {
          reqPath = '/'
        }
        console.log(reqPath)
        await fnUpdate(reqPath)
      } catch (err) {
        error.value = err
      }
      $q.loading.hide()
    }

    async function fnUpdate (reqPath) {
      const r = await api.get(`/files?link=${reqPath}`)
      filePath.value = r.data.path
      console.log(r.data.path)
      if (filePath.value[filePath.value.length] === '') {
        filePath.value.splice(-1, 1)
      }
      files.value = r.data.files
      console.log(files.value)
    }

    onMounted(() => {
      fnGetPath()
    })

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,
      files,
      filePath,
      selected,
      fnClickItem,
      fnGetPath,
      fnUpdate,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick (item) {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(item)
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel
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
.selected-item {
  color: white;
  background: #708A7E;
  border-radius: .5rem;
}
</style>

