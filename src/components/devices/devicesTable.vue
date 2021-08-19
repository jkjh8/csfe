<template>
  <q-table
    v-if="mode"
    :columns="columes"
    :rows="tableData"
  >
    <template v-slot:body-cell-uptime="props">
      <q-td :props="props">
        <div>
          {{ secToDays(props.value) }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-updatedAt="props">
      <q-td :props="props">
        <div>
          {{ timeFormat(props.value) }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-createdAt="props">
      <q-td :props="props">
        <div>
          {{ timeFormat(props.value) }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <div>
          <q-btn round flat icon="fas fa-cog" size="sm"></q-btn>
        </div>
      </q-td>
    </template>
  </q-table>

  <q-table
    v-else
    grid
    :columns="columes"
    :rows="tableData"
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3">
        <q-card
          :style="chkUptime(props.row.updatedAt) ? 'background: white;':'background: grey'"

        >
          <q-card-section class="row justify-between items-center q-pa-xs">
            <q-item class="q-py-none">
              <q-item-section avatar>
                <q-icon v-if="props.row.checked" color="teal" name="fas fa-check-circle" />
                <q-icon v-else color="grey" name="fas fa-exclamation-triangle" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ props.row.name ?? '이름 없음' }}</q-item-label>
                <q-item-label caption>{{ props.row.mac }}</q-item-label>
              </q-item-section>
            </q-item>
            <div class="row items-center">
              <span v-if="!props.row.alarm">
                <q-spinner-puff color="blue" size="1.5em" />
              </span>
              <span v-else>
                <q-skeleton class="bg-red-10" type="circle" animation="blink" color="red" size="1.5em" />
              </span>

              <span class="q-ml-xs">
                <q-btn round flat color="grey-8" size="1em" icon="fas fa-cog" @click="openDialog(props.row)" />
              </span>
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="row justify-between q-pa-xs">
            <div class="col-xs-12 col-sm-9 col-md-8 col-lg-10">
              <q-item>
                <q-item-section>
                  <q-item-label>IP Address</q-item-label>
                  <q-item-label caption>
                    <a :href="`http://${props.row.ipaddress}`" target="_blank">
                      {{ props.row.ipaddress }}
                    </a>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Zone</q-item-label>
                  <q-item-label caption>{{ props.row.zone }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section style="word-break: break-all">
                  <q-item-label>Location 1</q-item-label>
                  <q-item-label caption>{{ props.row.location1 }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section style="word-break: break-all">
                  <q-item-label>Location 2</q-item-label>
                  <q-item-label caption>{{ props.row.location2 }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section style="word-break: break-all">
                  <q-item-label>Stream Address</q-item-label>
                  <q-item-label caption>{{ props.row.streamurl }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section style="word-break: break-all">
                  <q-item-label>Update Time</q-item-label>
                  <q-item-label caption>{{ timeFormat(props.row.updatedAt) }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-4 col-lg-2">
              <q-knob
                class="q-ma-sm"
                v-model="props.row.volume"
                show-value
                readonly
                :thickness="0.2"
                size="60px"
                color="primary"
              >
                <q-icon name="volume_up" class="q-mr-xs" />
                {{ props.row.volume }}
              </q-knob>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>

  <q-dialog v-model="dialog">
    <Setup :data="propsData" />
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { api } from '../../boot/axios'
import { socket } from '../../boot/socketio'
import timeFormat from '../../apis/timeFormat'
import secToDays from '../../apis/secToDays'
import chkUptime from '../../apis/chkUptime'
import Setup from '../../components/devices/setupDialog'

const columes = [
  { name: 'index', align: 'center', label: 'Index', field: 'index' },
  { name: 'mac', align: 'center', label: '맥주소', field: 'mac' },
  { name: 'alarm', align: 'center', label: '경고', field: 'alarm' },
  { name: 'buffer', align: 'center', label: '버퍼', field: 'buffer' },
  { name: 'latency', align: 'center', label: '지연', field: 'latency' },
  { name: 'frameloss', align: 'center', label: 'Frame Loss', field: 'frameloss' },
  { name: 'framedup', align: 'center', label: 'Frame Dup', field: 'framedup' },
  { name: 'framedrop', align: 'center', label: 'Frame Drop', field: 'framedrop' },
  { name: 'softerrorcount', align: 'center', label: 'Soft Error', field: 'softerrorcount' },
  { name: 'streamnumber', align: 'center', label: '채널', field: 'streamnumber' },
  { name: 'bitrate', align: 'center', label: '비트', field: 'bitrate' },
  { name: 'reconnects', align: 'center', label: '재연결', field: 'reconnects' },
  { name: 'error', align: 'center', label: '에러', field: 'error' },
  { name: 'volume', align: 'center', label: '음량', field: 'volume' },
  { name: 'uptime', align: 'center', label: '동작시간', field: 'uptime' },
  { name: 'ipaddress', align: 'center', label: '아이피주소', field: 'ipaddress' },
  { name: 'streamurl', align: 'center', label: '스트림주소', field: 'streamurl' },
  { name: 'updatedAt', align: 'center', label: '업데이트', field: 'updatedAt' },
  { name: 'createdAt', align: 'center', label: '등록', field: 'createdAt' },
  { name: 'actions', align: 'center', label: 'Actions' }
]

export default defineComponent({
  components: { Setup },
  setup () {
    const store = useStore()
    // vuex
    const tableData = computed(() => store.state.barix.deviceList)
    const mode = computed(() => store.state.barix.mode)
    // variable
    const dialog = ref(false)
    const propsData = ref(null)

    function openDialog (data) {
      console.log(data)
      propsData.value = data
      dialog.value = true
    }

    // function setBarix (info) {
    //   api.get(`http://${info.ipaddress}/rc.cgi?c=102`).then((res) => {
    //     console.log('res = ', res)
    //   }).catch(err => {
    //     console.log('err = ', err)
    //   })
    // }

    onMounted(async () => {
      socket.on('deviceList', (r) => {
        store.dispatch('barix/updateList', r)
      })
      const r = await api.get('/sensors/get')
      store.dispatch('barix/updateList', r.data.data)
    })

    return { tableData, columes, mode, dialog, propsData, openDialog, chkUptime, timeFormat, secToDays }
  }
})
</script>
