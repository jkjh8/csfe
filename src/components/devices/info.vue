<template>
  <q-card v-if="noData" style="width: 40rem; border-radius: .5rem;">
    <q-card-section>
      <div class="row items-center">
        <div>
          <q-avatar color="blue-2" text-color="white">
            <q-icon name="svguse:icons.svg#server-fill" />
          </q-avatar>
        </div>
        <div class="q-ml-md">
          <div style="font-family: nanumgothicbold; font-weight: bold; font-size: 1.2rem;">{{ info.name ?? '이름 없음' }}</div>
          <div style="font-family: nanumgothic; font-size: .5rem;">MAC: {{ info.mac }}</div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-mx-md q-gutter-sm">
      <div class="row">
        <div class="col-4 text-bold">Alarm</div>
        <div class="text-uppercase q-pa-none">{{ info.alarm }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Bitrate</div>
        <div>{{ info.info.Bitrate }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Buffer</div>
        <div>{{ info.info.BufferLevel }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Error</div>
        <div>{{ info.info.Error }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Frame Drop</div>
        <div>{{ info.info.FrameDrop }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Frame Dup</div>
        <div>{{ info.info.FrameDup }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold q-pa-none">Frame Loss</div>
        <div>{{ info.info.FrameLoss }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Latency</div>
        <div>{{ info.info.Latency }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Reconnects</div>
        <div>{{ info.info.Reconnects }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Soft Error</div>
        <div>{{ info.info.SoftErrorCount }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Stream Number</div>
        <div>{{ info.info.StreamNumber }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Url</div>
        <div>{{ info.info.URL }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Volume</div>
        <div>{{ info.info.Volume }}%</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Up Time</div>
        <div>{{ secToDays(info.info.UpTime) }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Created At</div>
        <div>{{ timeFormat(info.createdAt) }}</div>
      </div>
      <div class="row">
        <div class="col-4 text-bold">Updated At</div>
        <div>{{ timeFormat(info.updatedAt) }}</div>
      </div>
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
          <div style="font-family: nanumgothicbold; font-weight: bold; font-size: 1.2rem;">{{ info.name ?? '이름 없음' }}</div>
        </div>
      </div>
    </q-card-section>
     <q-separator />
    <q-card-section class="row justify-center">
      <h2>NO DATA</h2>
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
export default {
  props: ['info'],
  setup (props) {
    const data = ref({})
    const noData = ref(false)
    onBeforeMount(() => {
      if (Object.keys(props.info).length) {
        data.value = { ...props.info }
      } else {
        noData.value = true
      }
    })
    return {
      data,
      noData,
      timeFormat,
      secToDays
    }
  }
}
</script>
