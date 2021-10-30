<template>
  <q-card
    flat
    style="width: 11rem; border: solid 1px #eee; border-radius: 1rem"
  >
    <q-card-section
      class="q-pa-xs"
      :class="device.active[item.channel - 1] ? 'bg-yellow' : 'bg-blue-grey-1'"
    >
      <div class="q-py-sm fit row justify-between">
        <div class="q-pl-sm row no-wrap q-gutter-md q-pr-sm items-center">
          <q-avatar
            class="avatar"
            size="1.5rem"
          >
            <q-icon
              name="svguse:icons.svg#server"
              size="md"
            />
            <q-badge
              v-if="!item.status"
              floating
              rounded
              color="red"
            />
          </q-avatar>
          <div class="statusName">
            {{ item.label }}
          </div>
        </div>
        <div>
          <q-btn
            round
            size="sm"
            flat
            @click="fnOpenInfoWindow"
          >
            <q-icon
              name="svguse:icons.svg#info"
              size="sm"
            />
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-gutter-sm">
        <div class="row no-wrap justify-between">
          <span>동작상태</span>
          <span>{{ device.active[item.channel - 1] ? '방송중' : '대기중' }}</span>
        </div>

        <div class="row no-wrap justify-between">
          <span class="statustext">방송채널</span>
          <span>{{ item.channel }}</span>
        </div>
        
        <div class="fit row no-wrap justify-between items-center">
          <span class="statustext">Volume</span>
          <span v-if="device && device.gain">
            {{ device.gain[item.channel - 1] }}dB
          </span>
        </div>

        <div class="fit row no-wrap justify-between items-center">
          <span class="statustext">Mute</span>
          <span>
            <q-btn
              v-if="device && device.mute"
              label="mute"
              size="xs"
              rounded
              unelevated
              :color="device.mute[item.channel - 1]? 'red':'cyan'"
            />
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

import infoWindow from '@components/dialog/devices/info'

export default {
  props: {
    device: Object,
    item: Object
  },
  setup(props) {
    const { state } = useStore()
    const $q = useQuasar()
    const devices = computed(() => state.devices.devices)
    
    function fnOpenInfoWindow () {
      let item
      for (let i = 0; i < devices.value.length; i++) {
        if (devices.value[i].ipaddress === props.item.ipaddress) {
          item = devices.value[i]
          break
        }
      }

      $q.dialog({
        component: infoWindow,
        componentProps: { item: item }
      }).onOk(() => {
        console.log('close info window')
      })
    }
    onMounted(() => {
      // if (props.location && props.location.length) {
      //   active.value = location.value.active
      // } else {
      //   active.value = null
      // }
    })

    // function getActive(id) {
    //   try {
    //     if (props.location && props.location.length) {
    //       console.log(props.location)
    //       return location.value.active[id - 1]
    //     } else {
    //       return false
    //     }
    //   } catch {
    //     return false
    //   }
    // }
    return {
      fnOpenInfoWindow
    }
  }
}
</script>

<style scoped>
.avatar {
  border: solid 1px #aaa;
}
.statusName {
  font-family: 나눔고딕;
  font-weight: 700;
}
</style>
