<template>
  <q-card v-if="deviceData.info" style="width: 40rem; border-radius: .5rem;">
    <q-card-section>
      <div class="row items-center">
        <div>
          <q-avatar color="blue-2" text-color="white">
            <q-icon name="svguse:icons.svg#server-fill" />
          </q-avatar>
        </div>
        <div class="q-ml-md">
          <div style="font-family: nanumgothicbold; font-size: 1.2rem;">
            {{ deviceData.name ==='' ? 'No Name': deviceData.name }}
          </div>
          <div style="font-family: nanumgothic; font-size: .5rem;">
            MAC: {{ deviceData.mac === '' ? 'no mac address':deviceData.mac }}
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-mx-md q-gutter-sm">
      <BarixInfo v-if="deviceData.type === 'Barix' && deviceData.info" :deviceData="deviceData"></BarixInfo>
      <QsysInfo v-if="deviceData.type === 'QSys' && deviceData.info" :deviceData="deviceData"></QsysInfo>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right" v-close-popup>
      <q-btn class="q-ma-sm" padding=".5rem 2rem" flat label="Close" />
    </q-card-actions>
  </q-card>
  <q-card v-else style="width: 40rem; border-radius: .5rem;">
    <q-card-section>
      <div class="row items-center">
        <div>
          <q-avatar color="blue-2" text-color="white">
            <q-icon name="svguse:icons.svg#server-fill" />
          </q-avatar>
        </div>
        <div class="q-ml-md">
          <div style="font-family: nanumgothicbold; font-weight: bold; font-size: 1.2rem;">
            {{  deviceData.name ==='' ? 'No Name': deviceData.name }}
          </div>
          <div style="font-family: nanumgothic; font-size: .5rem;">
            MAC: {{ deviceData.mac === '' ? 'No MAC address':deviceData.mac }}
          </div>
        </div>
      </div>
    </q-card-section>
     <q-separator />
    <q-card-section class="row justify-center">
      <h2>No Device Data</h2>
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
import BarixInfo from './barix/barixForm'
import QsysInfo from './qsys/qsysForm.vue'
export default {
  props: ['info'],
  components: { BarixInfo, QsysInfo },
  setup (props) {
    const deviceData = ref({})
    onBeforeMount(() => {
      if (Object.keys(props.info).length) {
        deviceData.value = { ...props.info }
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
