<template>
  <q-table
    flat
    :columns="tableColumes"
    :rows="tableData"
    :pagination="{ rowsPerPage: 10 }"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="index" :props="props">
          <q-avatar class="shadow-3" size="2rem">
            <q-badge v-if="props.row.alarm" floating rounded color="orange" />
            <q-badge v-if="props.row.status" floating rounded color="red" />
            {{ props.row.index }}
          </q-avatar>
        </q-td>
        <q-td key="index" :props="props">
          <div>{{ props.row.name }}</div>
        </q-td>
        <q-td key="ipaddress" :props="props">
          <div style="font-family: nanumgothicbold">{{ props.row.ipaddress }}</div>
          <div class="text-caption">MAC:{{ props.row.mac }}</div>
        </q-td>
        <q-td key="volume" :props="props">
          <q-circular-progress
            show-value
            font-size=".7rem"
            :value="props.row.volume"
            size="2.5rem"
            :thickness="0.22"
            color="cyan"
            track-color="grey-3"
          >
            {{ props.row.volume }}%
          </q-circular-progress>
        </q-td>
        <q-td key="uptime" :props="props">
          <div>{{ secToDays(props.row.uptime) }}</div>
        </q-td>
        <q-td key="streamurl" :props="props">
          <div style="word-break: break-all;">{{ props.row.streamurl }}</div>
        </q-td>
        <q-td key="createdAt" :props="props">
          <div>{{ timeFormat(props.row.createdAt) }}</div>
        </q-td>
        <q-td key="actions" :props="props">
          <div>
            <q-btn flat round icon="svguse:icons.svg#dot3-h" size="sm" color="grey" @click="openInfo(props.row)" />
            <q-btn flat round icon="svguse:icons.svg#pencil-fill" size="sm" color="teal-6" @click="openDialog" />
            <q-btn flat round icon="svguse:icons.svg#trash-fill" size="sm" color="red-6" />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <q-dialog v-model="dialog">
    <Setup :data="propsData" />
  </q-dialog>
  <q-dialog v-model="infoDalog">
    <q-card style="width: 40rem; border-radius: .5rem;">
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
          <div>{{ info.bitrate }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Buffer</div>
          <div>{{ info.buffer }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Error</div>
          <div>{{ info.error }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Frame Drop</div>
          <div>{{ info.framedrop }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Frame Dup</div>
          <div>{{ info.framedup }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold q-pa-none">Frame Loss</div>
          <div>{{ info.frameloss }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Latency</div>
          <div>{{ info.latency }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Reconnects</div>
          <div>{{ info.reconnects }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Soft Error</div>
          <div>{{ info.softerrorcount }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Stream Number</div>
          <div>{{ info.streamnumber }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Url</div>
          <div>{{ info.streamurl }}</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Volume</div>
          <div>{{ info.volume }}%</div>
        </div>
        <div class="row">
          <div class="col-4 text-bold">Up Time</div>
          <div>{{ secToDays(info.uptime) }}</div>
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
  </q-dialog>
</template>

<script setup>
const tableColumes = [
  { name: 'index', align: 'center', label: 'Index', field: 'index', sortable: true },
  { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
  { name: 'ipaddress', align: 'center', label: '주소', field: 'ipaddress', sortable: true },
  { name: 'volume', align: 'center', label: '음량', field: 'volume' },
  { name: 'uptime', align: 'center', label: '동작시간', field: 'uptime', sortable: true },
  { name: 'streamurl', align: 'center', label: '스트림주소', field: 'streamurl', sortable: true },
  { name: 'createdAt', align: 'center', label: '등록', field: 'createdAt', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions' }
]
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
// import { api } from '../../boot/axios'
import { socket } from '../../boot/socketio'
import timeFormat from '../../apis/timeFormat'
import secToDays from '../../apis/secToDays'
// import chkUptime from '../../apis/chkUptime'
import Setup from '../../components/devices/setupDialog'
const store = useStore()
// vuex
const tableData = computed(() => store.state.barix.deviceList)
// const mode = computed(() => store.state.barix.mode)
// variable
const dialog = ref(false)
const propsData = ref(null)

const infoDalog = ref(false)
const info = ref(null)

function openInfo (data) {
  info.value = data
  infoDalog.value = true
  console.log(info.value)
}

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
    store.dispatch('barix/updateListAsWebsoket', r)
  })
  store.dispatch('barix/updateList')
})
</script>

<style scoped>
.text {
  font-family: nanumgothicbold;
  font-size: 1rem;
  font-weight: bold;
}
.caption {
  font-family: nanumgothic;
  font-size: .5rem;
}
</style>
