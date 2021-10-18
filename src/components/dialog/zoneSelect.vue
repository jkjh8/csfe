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
            color="red-1"
            text-color="red"
            size="md"
          >
            <q-icon
              name="svguse:icons.svg#exclamation"
              color="red"
              size="1.5rem"
            />
          </q-avatar>
          <div>
            <div style="font-size: 1.2rem">
              방송구간선택
            </div>
            <div>방송구간을 선택합니다.</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-mx-md q-mt-lg">
          <q-tree
            v-model:seleted="selected"
            v-model:ticked="ticked"
            :nodes="locations"
            tick-strategy="leaf"
            node-key="_id"
          />
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
            color="negative"
            label="확인"
            unelevated
            rounded
            @click="onOKClick(ticked)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    item: Object
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],

  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent()
    const { state } = useStore()
    const selected = ref(null)
    const ticked = ref(null)
    //const $q = useQuasar()

    const user = computed(() => state.user.user)
    const locations = computed(() => state.locations.locations)

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      user,
      selected,
      ticked,
      locations,
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick(items) {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(items)
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel
    }
  }
}
</script>
