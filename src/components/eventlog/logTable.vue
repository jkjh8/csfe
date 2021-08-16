<template>
  <q-table
    :columns="columes"
    :rows="logs"
    :loading="loading"
    hide-pagination
    ref="table"
  >
    <template v-slot:body-cell-date="props">
      <q-td :props="props">
        <div>
          {{ timeFormat(props.value) }}
        </div>
      </q-td>
    </template>
  </q-table>
  <div class="q-mt-md row items-center">
    <span class="col-6 offset-3 row justify-center">
      <q-pagination
        v-model="page"
        :max="maxPage"
        unelevated
        color="grey-8"
        active-color="green-10"
        direction-links

        :max-pages="8"
        boundary-links

        @update:model-value="pageChange"
      ></q-pagination>
    </span>
    <span class="col-3 row justify-end">
      페이지수
    </span>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { api } from '../../boot/axios'

const columes = [
  { name: 'date', align: 'center', label: 'Date', field: 'createdAt', sortable: true },
  { name: 'Source', align: 'center', label: 'Source', field: 'source', sortable: true },
  { name: 'Category', align: 'center', label: 'Category', field: 'category', sortable: true },
  { name: 'Priority', align: 'center', label: 'Priority', field: 'priority', sortable: true },
  { name: 'Zones', align: 'center', label: 'zones', field: 'zones', sortable: true },
  { name: 'Message', align: 'center', label: 'Message', field: 'message', sortable: true }
]

export default defineComponent({
  setup () {
    moment.locale('ko')
    const store = useStore()

    const logs = computed(() => store.state.eventlog.logs)
    const count = computed(() => store.state.eventlog.count)
    const rowsPerPage = computed(() => store.state.eventlog.rowsPerPage)
    const maxPage = computed(() => store.getters['eventlog/getMaxPage'])
    const page = computed({
      get () { return store.state.eventlog.page },
      set (value) { return store.commit('eventlog/updatePage', value) }
    })

    const loading = ref(false)
    const table = ref(null)

    function timeFormat (time) {
      return moment(time).format('YYYY/MM/DD hh:mm:ss a')
    }

    async function getLog (limit, page) {
      loading.value = true
      try {
        const r = await api.get(`/eventlog?limit=${limit}&page=${page}`)
        store.dispatch('eventlog/updateLogs', r.data)
      } catch (err) {
        console.error(err)
      }
      loading.value = false
    }

    function pageChange (value) {
      console.log(value, store.state.eventlog.page)
    }
    onMounted(() => {
      getLog(10, 1)
      console.log(maxPage)
      table.value.setPagination({ rowsPerPage: rowsPerPage })
    })
    return {
      columes,
      logs,
      count,
      page,
      rowsPerPage,
      maxPage,
      loading,
      table,
      timeFormat,
      pageChange
    }
  }
})
</script>
