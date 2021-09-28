<template>
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <div class="backg-re-gr">
        <div class="card-name-align">
          <div class="card-name q-ml-md">
            <q-avatar
              style="border: solid 2px #ddd; overflow: hidden;"
              size="2.4rem"
            >
              <q-icon
                name="svguse:icons.svg#server-fill"
                size="3rem"
              />
            </q-avatar>
            <div class="q-ml-md">
              <div class="name">
                {{ info.name }}
              </div>
              <div class="caption">
                IP Address: {{ info.ipaddress }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-mx-md q-gutter-sm">
      <BarixInfo
        v-if="info.type === 'Barix' && Object.keys(info).length"
        :info="info"
      />
      <QsysInfo
        v-if="info.type === 'QSys' && Object.keys(info).length"
        :info="info"
      />
    </q-card-section>

    <q-separator />

    <q-card-actions
      v-close-popup
      align="right"
    >
      <q-btn
        class="q-ma-sm"
        padding=".5rem 2rem"
        flat
        label="Close"
      />
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
  components: { BarixInfo, QsysInfo },
  props: {
    info: Object
  },
  setup() {
    return {
      timeFormat,
      secToDays
    }
  }
}
</script>
