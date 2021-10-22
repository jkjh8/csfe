<template>
  <q-table
    class="shadow-10 q-pa-sm"
    :columns="columes"
    :rows="logs.docs"
    :pagination="{ rowsPerPage: 0 }"
    hide-pagination
    style="border-radius: 1rem"
  >
    <template #body="props">
      <q-tr
        v-if="props.cols[2].value === 'error'"
        :props="props"
      >
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          class="text-red"
          :props="props"
        >
          {{ col.value }}
        </q-td>
      </q-tr>
      <q-tr
        v-else
        :props="props"
      >
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          class="text-black"
          :props="props"
        >
          <div v-if="col.name === 'date'">
            {{ time.timeFormat(col.value) }}
          </div>
          <div v-else-if="col.name === 'zones'">
            {{ col.value.join(',') }}
          </div>
          <div v-else>
            {{ col.value }}
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <div class="q-mt-md row items-center">
    <span class="col-6 offset-3 row justify-center">
      <q-pagination
        ref="pagination"
        v-model="page"
        :max="logs.totalPages"
        input
        direction-links
        color="grey-8"
        text-color="grey-10"
        active-color="primary"
        :max-pages="$q.screen.gt.md ? 7 : 3"
        @update:model-value="pageChange"
      />
    </span>
    <span class="col-3 row justify-end items-center">
      <div class="row items-center">
        <span> RowsPerPage : </span>
        <q-select
          v-model="rowsPerPage"
          class="q-mx-sm"
          :options="[5, 10, 15, 20, 25, 30, 40, 50]"
          dense
          borderless
        />
      </div>
    </span>
  </div>
</template>

<script>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import time from '@/apis/time'

const columes = [
  {
    name: 'date',
    align: 'center',
    label: 'Date',
    field: 'createdAt',
    sortable: true
  },
  {
    name: 'source',
    align: 'center',
    label: 'Source',
    field: 'source',
    sortable: true
  },
  {
    name: 'category',
    align: 'center',
    label: 'Category',
    field: 'category',
    sortable: true
  },
  {
    name: 'priority',
    align: 'center',
    label: 'Priority',
    field: 'priority',
    sortable: true
  },
  {
    name: 'zones',
    align: 'center',
    label: 'zones',
    field: 'zones',
    sortable: true
  },
  {
    name: 'message',
    align: 'center',
    label: 'Message',
    field: 'message',
    sortable: true
  }
]
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const { state, commit, dispatch } = useStore()
    const $q = useQuasar()
    // VUEX
    const logs = computed(() => state.eventlog.logs)
    const rowsPerPage = computed({
      get() {
        return state.eventlog.logs.limit
      },
      set(value) {
        commit('eventlog/updateRowsPerPage', value)
        return dispatch('eventlog/getLogs')
      }
    })
    const page = computed({
      get() {
        return state.eventlog.logs.page
      },
      set(value) {
        return commit('eventlog/updatePage', value)
      }
    })
    // Var
    const pagination = ref(null)
    // Function
    async function pageChange() {
      $q.loading.show({ spinnerColor: 'cyan' })
      await proxy.$store.dispatch('eventlog/getLogs')
      $q.loading.hide()
    }
    // Life Time
    onMounted(async () => {
      pageChange()
    })
    return {
      columes,
      time,
      logs,
      rowsPerPage,
      page,
      pagination,
      pageChange
    }
  }
}
</script>
