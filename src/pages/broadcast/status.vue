<template>
  <div style="margin: 5% 10% 0 10%">
    <div class="q-gutter-sm q-mb-md">
      <span>
        <q-icon
          name="svguse:icons.svg#view-grid-fill"
          size="sm"
          color="green"
        />
      </span>
      <span class="name">Status</span>
      <span
        class="caption"
      >{{ locationErrorCount }} 지역 {{ zoneErrorCount }}방송구간이 점검이
        필요합니다</span>
    </div>
    <div
      class="shadow-15 q-pa-md status"
      style="border-radius: 2rem"
    >
      <q-list>
        <div
          v-for="device in devices.list"
          :key="device.index"
        >
          <q-expansion-item
            class="overflow-hidden exp-style"
            expand-separator
            default-opened
          >
            <!--  헤더  -->
            <template #header>
              <q-item-section avatar>
                <q-avatar
                  style="border: 1px solid #454545"
                  size="2rem"
                >
                  <q-icon name="svguse:icons.svg#map" />
                  <q-badge
                    v-if="!device.status"
                    rounded
                    floating
                    color="red"
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="name fit row items-center">
                  {{ device.name }}
                </q-item-label>
              </q-item-section>

              <!-- 셋업 버튼 -->
              <q-item-section side>
                <q-btn
                  round
                  flat
                  @click.stop.prevent="fnSetupLocation(device)"
                >
                  <q-icon name="svguse:icons.svg#cog" />
                </q-btn>
              </q-item-section>
            </template>

            <!-- 지역표시 -->
            <div
              class="fit row wrap q-gutter-md"
              style="padding: 1rem 2rem"
            >
              <div
                v-for="item in device.childrens"
                :key="item.channel"
              >
                <ZoneStatus
                  :device="device"
                  :item="item"
                />
              </div>
            </div>
          </q-expansion-item>
        </div>
      </q-list>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

import { socket } from '@/boot/socketio'

import ZoneStatus from '../../components/broadcast/status/zoneStatus.vue'
import SetupLocate from '@components/dialog/setLocation'

export default {
  components: { ZoneStatus },
  setup() {
    const { state, getters, dispatch } = useStore()
    const $q = useQuasar()
    const socketId = computed(() => state.user.socketId)
    const locationErrorCount = computed(() => getters['locations/errorCount'])
    const zoneErrorCount = computed(() => getters['devices/errorCount'])
    const devices = computed(() => getters['devices/mastersDetails'])

    const timer = ref(null)

    function fnSetupLocation(locate) {
      console.log(locate)
      $q.dialog({
        component: SetupLocate,
        componentProps: { item: locate }
      }).onOk(async (rt) => {
        console.log(rt)
      })
    }

    function getLocationInfoFromIO () {
      socket.emit('getLocations')
    }

    onBeforeMount(async () => {
      dispatch('user/getUser')
      if (!socketId.value) {
        socket.connect()
      }
      timer.value = setInterval(getLocationInfoFromIO, 5000)
      // dispatch('locations/updateLocations')
      await dispatch('devices/updateDevices')
    })

    onBeforeUnmount(() => {
      clearInterval(timer.value)
      socket.disconnect()
    })

    return {
      devices,
      locationErrorCount,
      zoneErrorCount,
      fnSetupLocation,
    }
  }
}
</script>

<style scoped>
.statustext {
  font-family: 나눔고딕;
  font-weight: 700;
}
.status {
  background: #fafafa;
}
.exp-style {
  border: dashed 1px #fafafa;
  border-radius: 1rem;
}
</style>
