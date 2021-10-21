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

      <!-- buttons example -->
      <!-- <q-card-section>
        <div class="row justify-between items-center">
          <div>
            <q-icon
              name="colorize"
              size="sm"
              color="cyan"
            />
            <span class="listname q-ml-sm">색상선택</span>
          </div>
          <div
            style="width: 2rem; height: 1.5rem; border-radius: 5px;"
            :style="`background: ${color}`"
          />
        </div>
      </q-card-section> -->
      <q-card-section class="q-pa-none">
        <div style="width: 100%;">
          <q-color
            v-model="rfColor"
            flat
            style="width: 100%; min-width: 400px;"
            class="my-picker"
          />
        </div>
      </q-card-section>
      <q-card-actions
        class="bg-black"
        align="right"
      >
        <q-btn
          label="취소"
          rounded
          flat
          color="white"
          @click="onCancelClick"
        />
        <q-btn
          color="primary"
          rounded
          unelevated
          label="확인"
          @click="onOKClick(rfColor)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    color: String,
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const rfColor = ref(null)
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    onMounted(() => {
      if (props.color) {
        rfColor.value = props.color
      }
    })
    return {
      rfColor,
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

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
