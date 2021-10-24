<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-grey-1">
        <div class="fit row items-center">
          <q-icon
            name="svguse:icons.svg#folder-fill"
            color="yellow"
            size="sm"
          />
          <div
            class="q-ml-sm"
            style="font-size: 1rem; font-weight: bold;"
          >
            {{ title }}
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-ma-sm">
          <div>현재 폴더 위치는</div>
          <div
            class="q-pa-sm bg-grey-3"
            style="border-radius: .5rem;"
          >
            {{ currentPath.join('/') }}
          </div>
        </div>
      </q-card-section>

      <q-card-section v-if="title ==='폴더생성'">
        <div class="q-mx-sm">
          <q-input
            v-model="folder"
            dense
            filled
            label="생성할 폴더 이름"
          />
        </div>
      </q-card-section>

      <q-card-section v-else>
        <div class="q-mx-sm">
          <q-file
            v-model="file"
            class="q-my-sm"
            filled
            dense
            accept=".mp3, *.mp4, *.wav, audio/*, video/*"
            label="파일선택"
          />
        </div>
      </q-card-section>

      <q-card-actions
        class="bg-grey-1"
        align="right"
      >
        <q-btn
          label="취소"
          rounded
          flat
          @click="onCancelClick"
        />
        <q-btn
          color="primary"
          rounded
          unelevated
          label="확인"
          @click="onOKClick()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    title: String,
    currentPath: Array
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const folder = ref('')
    const file = ref(null)

    function onOKClick() {
      const rtPath = []
      for (let i = 0; i < props.currentPath.length; i++) {
        rtPath.push(props.currentPath[i])
      }
      if (folder.value) {
        rtPath.push(folder.value)
      }
      onDialogOK({
        path: rtPath,
        file: file.value
      })
    }

    return {
      folder,
      file,
      dialogRef,
      onDialogHide,
      onOKClick,
      onCancelClick: onDialogCancel
    }
  }
}
</script>
