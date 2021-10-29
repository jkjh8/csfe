<template>
  <q-table
    class="shadow-15 q-pa-sm"
    style="border-radius: 1rem;"
    :columns="tableColumes"
    :rows="tableData"
    :filter="search"
    :pagination="{ rowsPerPage: 10 }"
  >
    <template #body="props">
      <q-tr :props="props">
        <q-td
          key="index"
          :props="props"
        >
          <q-avatar
            class="shadow-3"
            size="2rem"
          >
            <q-badge
              v-if="props.row.alarm"
              floating
              rounded
              color="orange"
            />
            <!-- <q-badge
              v-if="!props.row.checked"
              floating
              rounded
              color="yellow"
            /> -->
            <q-badge
              v-if="!props.row.status"
              floating
              rounded
              color="red"
            />
            {{ props.row.index }}
          </q-avatar>
        </q-td>
        <q-td
          key="index"
          :props="props"
        >
          <div class="listname">
            {{ props.row.name ?? 'No Name' }}
          </div>
        </q-td>
        <q-td
          key="ipaddress"
          :props="props"
        >
          <a
            :href="`http://${props.row.ipaddress}`"
            target="_blank"
          >{{ props.row.ipaddress }}</a>
        </q-td>
        <q-td
          key="type"
          :props="props"
        >
          {{ props.row.devicetype }}
        </q-td>
        <q-td
          key="mode"
          :props="props"
        >
          <div>{{ (props.row.mode) }}</div>
        </q-td>
        <q-td
          key="createdAt"
          :props="props"
        >
          <div>{{ time.timeFormat(props.row.createdAt) }}</div>
        </q-td>
        <q-td
          key="actions"
          :props="props"
        >
          <div>
            <q-btn
              flat
              round
              icon="svguse:icons.svg#dot3-h"
              size="sm"
              color="grey-8"
              @click="fnOpenInfoWindow(props.row)"
            />
            <!-- <q-btn
              flat
              round
              icon="svguse:icons.svg#check"
              size="sm"
              color="blue-grey-6"
              @click="checkItem(props.row)"
            /> -->
            <q-btn
              flat
              round
              icon="svguse:icons.svg#pencil-fill"
              size="sm"
              color="teal-6"
              @click="fnCreateUpdateItem(props.row)"
            />
            <q-btn
              flat
              round
              icon="svguse:icons.svg#trash-fill"
              size="sm"
              color="red-6"
              @click="fnDelete(props.row)"
            />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
const tableColumes = [
  { name: 'index', align: 'center', label: 'Index', field: 'index', sortable: true },
  { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
  { name: 'ipaddress', align: 'center', label: '주소', field: 'ipaddress', sortable: true },
  { name: 'type', align: 'center', label: 'Type', field: 'devicetype', sortable: true },
  { name: 'mode', align: 'center', label: 'Mode', field: 'mode', sortable: true },
  { name: 'createdAt', align: 'center', label: '등록', field: 'createdAt', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions' }
]
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

import { api } from '@/boot/axios'
import { socket } from '@/boot/socketio'
import time from '@/apis/time'

import addEditCompoenet from '@components/dialog/devices/deviceAdd'
import infoWindow from '@components/dialog/devices/info'
import deleteItemComponent from '@components/dialog/delete'

export default {
  setup () {
    const { state, dispatch } = useStore()
    const $q = useQuasar()
    // vuex
    const tableData = computed(() => state.devices.devices)
    // variable
    const error = ref('')
    const selected = ref(null)
    const search = computed(() => state.devices.search)

    function fnOpenInfoWindow (item) {
      $q.dialog({
        component: infoWindow,
        componentProps: { item: item }
      }).onOk(() => {
        console.log('close info window')
      })
    }

    function fnCreateUpdateItem (item) {
      $q.dialog({
        component: addEditCompoenet,
        componentProps: { item: item }
      }).onOk(async () => {
        $q.loading.show()
        await dispatch('devices/updateDevices')
        $q.loading.hide()
      })
    }

    function fnDelete (item) {
      $q.dialog({
        component: deleteItemComponent,
        componentProps: { item: item }
      }).onOk(async (rt) => {
        $q.loading.show()
        try {
          await api.get(`/devices/delete?ipaddress=${rt.ipaddress} `)
          await dispatch('devices/updateDevices')
        } catch (err) {
          error.value = err.response.data.message
        }
        $q.loading.hide()
      })
    }

    async function checkItem (item) {
      await api.get(`/devices/checked?_id=${item._id}`)
      dispatch('devices/updateDevices')
    }

    onMounted(() => {
      socket.on('deviceList', (r) => {
        dispatch('devices/updateListAsWebsoket', r)
      })
      dispatch('devices/updateDevices')
      dispatch('locations/updateLocations')
    })
    return {
      tableColumes,
      time,
      search,
      tableData,
      fnCreateUpdateItem,
      fnOpenInfoWindow,
      selected,
      checkItem,
      fnDelete
    }
  }
}

</script>

<style scoped>
.text {
  font-family: 나눔고딕;
  font-size: 1rem;
  font-weight: 700;
}
.caption {
  font-family: 나눔고딕;
  font-size: .5rem;
}
</style>
