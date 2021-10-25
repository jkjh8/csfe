<template>
  <!-- devices table -->
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <div class="backg-dark-g">
        <div class="card-name-align q-px-md">
          <div class="card-name">
            <q-icon name="svguse:icons.svg#office-building" />
            <div>
              <div>
                방송구간설정
              </div>
              <div
                v-if="devicesErrorCount"
                class="caption"
              >
                현재 {{ devicesErrorCount }}개의 방송구간의 점검이 필요합니다
              </div>
            </div>
          </div>
          <!-- <div>
            <q-btn flat round icon="svguse:icons.svg#plus-circle-fill" color="cyan-7" @click="createUpdateDialog=!createUpdateDialog"></q-btn>
          </div> -->
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-none">
      <q-scroll-area
        visible
        style="height: 30rem"
      >
        <q-list>
          <q-item
            v-for="local in devices"
            :key="local.index"
            v-ripple
            class="q-px-lg"
          >
            <q-item-section avatar>
              <q-avatar
                style="border: 1px solid #454545"
                size="2rem"
              >
                {{ local.index }}
                <q-badge
                  v-if="!local.status"
                  color="red"
                  rounded
                  floating
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span class="listname">{{ local.name }}</span>
                <span
                  class="q-ml-sm"
                  style="font-familt: 나눔고딕; font-size: .5rem;"
                >channel: {{ local.channel }}</span>
              </q-item-label>
              <q-item-label
                caption
                class="captionFont"
              >
                <span v-if="local.location_name">Location: {{ local.location_name }}</span>
                <span class="q-ml-md">Device IP: {{ local.ipaddress }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div>
                <q-btn
                  flat
                  round
                  icon="svguse:icons.svg#pencil-fill"
                  size="sm"
                  color="teal-6"
                  @click.prevent.stop="fnUpdateItem(local)"
                />
                <q-btn
                  flat
                  round
                  icon="svguse:icons.svg#trash-fill"
                  size="sm"
                  color="red-6"
                  @click.prevent.stop="fnDeleteItem(local)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>

  <q-dialog
    v-model="updateDialog"
    persistent
  >
    <Update
      :selected="selected"
      @close="close"
    />
  </q-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

import Update from './update'

import updater from '@components/dialog/locations/zoneCreate'
import deleteItemComponent from '@components/dialog/delete'

export default {
  components: { Update },
  setup () {
    const { state, getters, dispatch } = useStore()
    const $q = useQuasar()

    const error = ref('')
    const devices = computed(() => state.devices.devices)
    const devicesErrorCount = computed(() => getters['devices/errorCount'])

    const updateDialog = ref(false)
    const selected = ref({})

    function fnUpdateItem (item) {
      $q.dialog({
        component: updater,
        componentProps: { item: item }
      }).onOk(async () => {
        $q.loading.show()
        await dispatch('devices/updateDevices')
        $q.loading.hide()
      })
    }

    function fnDeleteItem (item) {
      $q.dialog({
        component: deleteItemComponent,
        componentProps: { item: item }
      }).onOk(async () => {
        $q.loading.show()
        try {
          await api.get(`/devices/delete?ipaddress=${item.ipaddress}`)
          await dispatch('devices/updateDevices')
        } catch (err) {
          error.value = err.response.data.message
        }
        $q.loading.hide()
      })      
    }

    function close () {
      selected.value = {}
      updateDialog.value = false
    }
    return {
      devices,
      devicesErrorCount,
      selected,
      updateDialog,
      fnUpdateItem,
      fnDeleteItem,
      close,
    }
  }
}
</script>

<style scoped>
.active-link {
  background: #ffab5d;
  color: black;
}
.captionFont {
  font-family: 나눔고딕;
  font-size: .5rem;
}
:deep(.q-img__image) {
  -webkit-filter: blur(2px);
  filter: blur(2px);
}
</style>
