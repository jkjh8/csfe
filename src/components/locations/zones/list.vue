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
                v-if="errorCount"
                class="caption"
              >
                현재 {{ errorCount }}개의 방송구간의 점검이 필요합니다
              </div>
            </div>
          </div>
          <div>
            <q-btn
              flat
              round
              icon="svguse:icons.svg#plus-circle-fill"
              color="cyan-7"
              @click="fnCreateItem"
            />
          </div>
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
            v-for="device in slaves"
            :key="device._id"
            v-ripple
            class="q-px-lg"
          >
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="svguse:iconsColor.svg#pc" />
                <q-badge
                  v-if="!device.status"
                  color="red"
                  rounded
                  floating
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span class="listname">{{ device.name }}</span>
                <span
                  class="q-ml-sm"
                  style="font-familt: 나눔고딕; font-size: .5rem;"
                >channel: {{ device.channel }}</span>
              </q-item-label>
              <q-item-label
                caption
                class="captionFont"
              >
                <span>Device IP: {{ device.ipaddress }}</span>
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
                  @click.prevent.stop="fnUpdateItem(device)"
                />
                <q-btn
                  flat
                  round
                  icon="svguse:icons.svg#trash-fill"
                  size="sm"
                  color="red-6"
                  @click.prevent.stop="fnDeleteItem(device)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

import updater from '@components/dialog/devices/deviceAdd'
import deleteItemComponent from '@components/dialog/delete'

export default {
  setup () {
    const { getters, dispatch } = useStore()
    const $q = useQuasar()

    const error = ref('')
    const slaves = computed(()=> getters['devices/getSlave'])
    const errorCount = computed(() => {
      const list = []
      slaves.value.forEach(device => {
        if (!device.status) {
          list.push(device)
        }
      })
      return list.length
    })

    function fnCreateItem () {
      $q.dialog({
        component: updater,
        componentProps: {
          item: {
            devicetype: 'Barix',
            mode: 'Slave'
          }
        }
      }).onOk(async () => {
        $q.loading.show()
        await dispatch('devices/updateDevices')
        $q.loading.hide()
      })
    }

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
      }).onOk(async (rt) => {
        $q.loading.show()
        try {
          await api.get(`/devices/delete?ipaddress=${rt.ipaddress}`)
          await dispatch('devices/updateDevices')
        } catch (err) {
          error.value = err.response.data.message
        }
        $q.loading.hide()
      })      
    }

    return {
      slaves,
      errorCount,
      fnCreateItem,
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
