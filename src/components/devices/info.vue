<template>
  <q-card style="width: 40rem; border-radius: .5rem;">
    <q-card-section>
      <div class="row items-center">
        <div>
          <q-avatar color="blue-2" text-color="white">
            <q-icon name="svguse:icons.svg#server-fill" />
          </q-avatar>
        </div>
        <div class="q-ml-md">
          <div style="font-family: 나눔고딕; font-size: 1.2rem;">
            {{ info.name ==='' ? 'No Name': info.name }}
          </div>
          <div style="font-family: 나눔고딕; font-size: .5rem;">
            IP Address: {{ info.ipaddress === '' ? 'No ip address':info.ipaddress }}
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-mx-md q-gutter-sm">
      <BarixInfo v-if="info.type === 'Barix' && Object.keys(deviceData).length" :deviceData="deviceData"></BarixInfo>
      <QsysInfo v-if="info.type === 'QSys'  && Object.keys(deviceData).length" :deviceData="deviceData"></QsysInfo>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right" v-close-popup>
      <q-btn class="q-ma-sm" padding=".5rem 2rem" flat label="Close" />
    </q-card-actions>
  </q-card>
</template>

<script>
import timeFormat from '../../apis/timeFormat'
import secToDays from '../../apis/secToDays'
import { ref, onBeforeMount } from 'vue'
import { api } from '../../boot/axios'
import BarixInfo from './barix/barixForm'
import QsysInfo from './qsys/qsysForm.vue'
export default {
  props: ['info'],
  components: { BarixInfo, QsysInfo },
  setup (props) {
    const deviceData = ref({})
    onBeforeMount(async () => {
      if (props.info.type === 'QSys') {
        const r = await api.get(`/devices/qsys?ipaddress=${props.info.ipaddress}`)
        deviceData.value = r.data.data
      } else if (props.info.type === 'Barix') {
        const r = await api.get(`/devices/barix?ipaddress=${props.info.ipaddress}`)
        deviceData.value = r.data.data
      }
    })
    return {
      deviceData,
      timeFormat,
      secToDays
    }
  }
}
</script>

<style scoped>
h2 {
  font-family: bebas;
}
</style>
