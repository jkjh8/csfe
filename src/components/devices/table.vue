<template>
  <q-table
    class="shadow-15"
    style="border-radius: 2rem;"
    :columns="tableColumes"
    :rows="tableData"
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
            <q-badge
              v-if="!props.row.checked"
              floating
              rounded
              color="yellow"
            />
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
          {{ props.row.type }}
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
          <div>{{ timeFormat(props.row.createdAt) }}</div>
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
              @click="openInfo(props.row)"
            />
            <q-btn
              flat
              round
              icon="svguse:icons.svg#check"
              size="sm"
              color="blue-grey-6"
              @click="checkItem(props.row)"
            />
            <q-btn
              flat
              round
              icon="svguse:icons.svg#pencil-fill"
              size="sm"
              color="teal-6"
              @click="createUpdateItem(props.row)"
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

  <q-dialog v-model="mdInfo">
    <Info :id="selected._id" />
  </q-dialog>

  <q-dialog
    v-model="mdCu"
    persistent
  >
    <CreateUpdate
      :id="selected._id"
      @close="mdCu = false"
    />
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
import { useQuasar } from 'quasar'

import { api } from '../../boot/axios'
import { socket } from '../../boot/socketio'
import timeFormat from '../../apis/timeFormat'
import secToDays from '../../apis/secToDays'
import CreateUpdate from './cu.vue'

import deleteItemComponent from '@components/dialog/delete'
import Info from './info.vue'

export default {
  components: { CreateUpdate, Info },
  setup () {
    const { state, dispatch } = useStore()
    const $q = useQuasar()
    // vuex
    const tableData = computed(() => state.devices.devices)
    // variable
    const error = ref('')
    const mdCu = ref(false)
    const mdInfo = ref(false)
    const selected = ref(null)
    const info = ref(null)

    function openInfo (data) {
      selected.value = data
      mdInfo.value = true
    }

    function createUpdateItem (item) {
      selected.value = item
      mdCu.value = true
    }

    function fnDelete (item) {
      $q.dialog({
        component: deleteItemComponent,
        componentProps: { item: item }
      }).onOk(async () => {
        $q.loading.show()
        try {
          await api.get(`/devices/delete?ipaddress=${selected.value.ipaddress} `)
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
    })
    return {
      tableColumes,
      timeFormat,
      secToDays,
      tableData,
      mdCu,
      mdInfo,
      info,
      openInfo,
      createUpdateItem,
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
