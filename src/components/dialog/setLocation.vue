<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-grey-1">
        <div class="fit row items-center">
          <q-icon name="svguse:icons.svg#pencil-fill" />
          <div
            class="q-ml-sm"
            style="font-size: 1rem; font-weight: bold;"
          >
            상세 세팅
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>{{ message }}</div>
      </q-card-section>
      <q-card-actions align="right">
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
          @click="onOKClick(item)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    title: String,
    message: String,
    item: Object
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    return {
      dialogRef,
      onDialogHide,
      onOKClick (item) {
        onDialogOK(item)
      },
      onCancelClick: onDialogCancel
    }
  }
}
</script>
