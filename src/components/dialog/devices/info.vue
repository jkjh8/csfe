<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-grey-1">
        <div style="font-size: 1rem; font-weight: bold;">
          Device Infomation
        </div>
      </q-card-section>

      <q-card-section v-if="item.devicetype === 'Q-Sys' && item.detail">
        <QSys :info="item" />
      </q-card-section>

      <q-card-section v-else-if="item.devicetype === 'Barix' && item.detail">
        <Barix :info="item" />
      </q-card-section>

      <q-card-section v-else>
        No Device Infomation
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
import { onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import QSys from '@components/devices/qsys/qsysForm'
import Barix from '@components/devices/barix/barixForm'

export default {
  components: { QSys, Barix },
  props: {
    item: Object
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    onMounted(() => {
      console.log(props.item)
    })

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
