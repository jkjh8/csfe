<template>
  <q-card style="width: 26rem; border-radius: 2rem;">
    <q-card-section class="q-pa-none">
      <q-img src="/background/cover_27.jpg" style="height: 6rem;">
        <div class="fit row items-center">
          <q-avatar style="border: solid 1px #ddd;" size="2.3rem">
            <q-icon name="svguse:icons.svg#server-fill" size="3rem" />
          </q-avatar>
          <div class="q-ml-md">
            <div class="name">{{ info.name }}</div>
            <div class="caption">IP Address: {{ info.ipaddress }}</div>
          </div>
        </div>
      </q-img>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-mx-md q-gutter-sm">
      <BarixInfo v-if="info.type === 'Barix' && Object.keys(info).length" :info="info"></BarixInfo>
      <QsysInfo v-if="info.type === 'QSys'  && Object.keys(info).length" :info="info"></QsysInfo>
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
// import { ref, onBeforeMount } from 'vue'
// import { api } from '../../boot/axios'
import BarixInfo from './barix/barixForm'
import QsysInfo from './qsys/qsysForm.vue'
export default {
  props: ['info'],
  components: { BarixInfo, QsysInfo },
  setup (props) {
    return {
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
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
