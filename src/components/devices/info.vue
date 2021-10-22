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
      <div v-if="info.type === 'Barix' && info.detail">
        <BarixInfo :info="info" />
      </div>
      <div v-else-if="info.type === 'QSys' && info.detail">
        <QsysInfo :info="info" />
      </div>
      <div
        v-else
        class="text-h6 text-center q-py-xl"
      >
        정보를 확인 할 수 없습니다
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions
      v-close-popup
      align="right"
    >
      <q-btn
        style="width: 6rem; height: 2rem; margin: .5rem 1rem;"
        flat
        rounded
        label="Close"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import time from '@/apis/time'
import { useQuasar } from 'quasar'
import { ref, onBeforeMount } from 'vue'
import { api } from '../../boot/axios'
import BarixInfo from './barix/barixForm'
import QsysInfo from './qsys/qsysForm.vue'

export default {
  components: { BarixInfo, QsysInfo },
  props: {
    id: String
  },
  setup(props) {
    const $q = useQuasar()
    const info = ref({
      name: '',
      ipaddress: '',
      type: '',
      detail: null
    })
    onBeforeMount(async () => {
      $q.loading.show()
      const r = await api.get(`/devices/info?id=${props.id}`)
      info.value = r.data
      $q.loading.hide()
    })

    return {
      info,
      time
    }
  }
}
</script>
