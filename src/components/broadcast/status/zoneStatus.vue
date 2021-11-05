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
            {{ vol }}dB
            <q-popup-proxy>
              <div
                class="row justify-between items-center q-px-md"
                style="width: 15rem; height: 4rem;"
              >
                <div
                  class="q-mt-lg"
                  style="width: 10rem;"
                >
                  <q-slider
                    v-model="vol"
                    :min="-100"
                    :max="20"
                    :step="1"
                    label
                    :label-value="vol + 'dB'"
                    label-always
                    dense
                  />
                </div>
                <q-btn
                  round
                  flat
                  size="sm"
                  color="green"
                  icon="svguse:icons.svg#check"
                  @click="fnChangeVol"
                />
              </div>
            </q-popup-proxy>
          </span>
        </div>

        <div class="fit row no-wrap justify-between items-center">
          <span class="statustext">Mute</span>
          <span>
            <q-btn
              label="mute"
              size="xs"
              rounded
              unelevated
              :color="mute ? 'red':'cyan'"
              @click="fnChangeMute(!mute)"
            />
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

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
    const mute = ref(false)
    const vol = ref(0)
    
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

    async function fnChangeVol () {
      const r = await api.post('/devices/qsys/changeVol', {
        ipaddress: props.device.ipaddress,
        channel: props.item.channel,
        vol: vol.value
      })
      console.log(r)
    }

    async function fnChangeMute (value) {
      mute.value = value
      const r = await api.post('/devices/qsys/changeMute/', {
        ipaddress: props.device.ipaddress,
        channel: props.item.channel,
        mute: mute.value
      })
      console.log(r)
    }

    onUpdated(() => {
      vol.value = props.device.gain[props.item.channel - 1]
      mute.value = props.device.mute[props.item.channel - 1]
      console.log('updated')
    })

    return {
      fnOpenInfoWindow,
      fnChangeVol,
      fnChangeMute,
      vol,
      mute
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
