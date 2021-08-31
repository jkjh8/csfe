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
            <q-badge v-if="!props.row.checked" floating rounded color="yellow" />
            <q-badge v-if="!props.row.status" floating rounded color="red" />
            {{ props.row.index }}
          </q-avatar>
        </q-td>
        <q-td key="index" :props="props">
          <div>{{ props.row.name ?? 'No Name' }}</div>
        </q-td>
        <q-td key="ipaddress" :props="props">
          <div style="font-family: nanumgothicbold">{{ props.row.ipaddress }}</div>
          <div class="text-caption">MAC:{{ props.row.mac }}</div>
        </q-td>
        <q-td key="type" :props="props">
          {{ props.row.type }}
        </q-td>
        <q-td key="mode" :props="props">
          <div>{{ (props.row.mode) }}</div>
        </q-td>
        <q-td key="createdAt" :props="props">
          <div>{{ timeFormat(props.row.createdAt) }}</div>
        </q-td>
        <q-td key="actions" :props="props">
          <div>
            <q-btn flat round icon="svguse:icons.svg#dot3-h" size="sm" color="grey" @click="openInfo(props.row)" />
            <q-btn flat round icon="svguse:icons.svg#pencil-fill" size="sm" color="teal-6" @click="createUpdateItem(props.row)" />
            <q-btn flat round icon="svguse:icons.svg#trash-fill" size="sm" color="red-6" @click="deleteItem(props.row)" />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <q-dialog v-model="infoDalog">
    <Info :info="info" />
  </q-dialog>

  <q-dialog v-model="createUpdateDialog">
    <CreateUpdate :selected="selected" @close="createUpdateDialog = false"/>
  </q-dialog>

  <q-dialog v-model="deleteDialog" persistent>
    <Delete :selected="selected" @close="deleteDialogClose" />
  </q-dialog>
</template>

<script>
const tableColumes = [
  { name: 'index', align: 'center', label: 'Index', field: 'index', sortable: true },
  { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
  { name: 'ipaddress', align: 'center', label: '주소', field: 'ipaddress', sortable: true },
  { name: 'type', align: 'center', label: 'Type', field: 'type', sortable: true },
  { name: 'mode', align: 'center', label: 'Mode', field: 'mode', sortable: true },
  { name: 'createdAt', align: 'center', label: '등록', field: 'createdAt', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions' }
]
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { socket } from '../../boot/socketio'
import timeFormat from '../../apis/timeFormat'
import secToDays from '../../apis/secToDays'
import CreateUpdate from './createUpdate.vue'
import Delete from './delete.vue'

import Info from './info.vue'

export default {
  components: { CreateUpdate, Delete, Info },
  setup () {
    const store = useStore()
    // vuex
    const tableData = computed(() => store.state.devices.deviceList)
    // variable
    const createUpdateDialog = ref(false)
    const selected = ref(null)

    const infoDalog = ref(false)
    const info = ref(null)

    const deleteDialog = ref(false)

    function openInfo (data) {
      info.value = data
      infoDalog.value = true
      console.log(info.value)
    }

    function createUpdateItem (item) {
      selected.value = item
      createUpdateDialog.value = true
    }

    function deleteDialogClose () {
      selected.value = {}
      deleteDialog.value = false
    }

    function deleteItem (item) {
      selected.value = item
      deleteDialog.value = true
    }

    onMounted(async () => {
      socket.on('deviceList', (r) => {
        store.dispatch('devices/updateListAsWebsoket', r)
      })
      store.dispatch('devices/updateDevices')
    })
    return {
      tableColumes,
      timeFormat,
      secToDays,
      tableData,
      createUpdateDialog,
      infoDalog,
      info,
      openInfo,
      createUpdateItem,
      selected,
      deleteDialog,
      deleteDialogClose,
      deleteItem
    }
  }
}

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
