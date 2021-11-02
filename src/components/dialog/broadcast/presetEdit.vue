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
        <div class="listname">
          프리셋 수정
        </div>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <div class="q-mt-md q-gutter-md">
          <div v-if="user.admin">
            <q-select
              v-model="preset.type"
              :options="['Global', 'Private']"
              filled
              dense
              label="Preset Mode"
            />
          </div>
          <div>
            <q-input
              v-model="preset.name"
              filled
              dense
              label="Name"
            />
          </div>
          <q-separator />
          <div>
            <div class="listname">
              방송구간선택
            </div>
            <div>
              <q-scroll-area style="height: 200px">
                <q-tree
                  v-model:ticked="preset.zones"
                  :nodes="devicesDetails"
                  tick-strategy="leaf"
                  node-key="ipaddress"
                >
                  <template #default-header="props">
                    <div>
                      {{ props.node.name }}
                    </div>
                  </template>
                </q-tree>
              </q-scroll-area>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions
        class="bg-grey-1"
        align="right"
      >
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
            @click="onOKClick()"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

// import { api } from '@/boot/axios'

export default {
  props: {
    item: Object
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const { state, getters } = useStore()
    // const $q = useQuasar()

    const user = computed(() => state.user.user)
    const devices = computed(() => state.devices.devices)
    const devicesDetails = computed(() => getters['devices/mastersDetails'])
    const preset = ref({
      name: '',
      type: 'Private',
      zones: [],
      zones_id: []
    })

    onMounted(() => {
      preset.value = { ...props.item }
    })

    return {
      user,
      devices,
      devicesDetails,
      preset,
      dialogRef,
      onDialogHide,
      onOKClick() {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(preset.value)
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
.active-class {
  background: #91ECEC;
  color: #000;
  border-radius: .5rem;
}
</style>
