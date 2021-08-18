<template>
  <q-table
    :columns="columes"
    :rows="logs"
    :loading="loading"
    hide-pagination
    ref="table"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>

    <template v-slot:body="props">
      <q-tr
        :props="props"
        v-if="props.cols[2].value === 'error'"
      >
        <q-td
          class="text-red"
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.value}}
        </q-td>
      </q-tr>
      <q-tr
        :props="props"
        v-else
      >
        <q-td
          class="text-black"
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          <div v-if="col.name === 'date'">
            {{ timeFormat(col.value) }}
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
        :max="maxPage"
        unelevated
        color="grey-8"
        active-color="green-10"
        direction-links

        :max-pages="numOfPage"
        boundary-links

        @update:model-value="pageChange"
      ></q-pagination>
    </span>
    <span class="col-3 row justify-end items-center">
      <div
        class="row items-center"
      >
        <span>
          RowsPerPage :
        </span>
        <q-select
          class="q-mx-sm"
          v-model="rowsPerPage"
          :options="pageOptions"
          dense
          borderless
        >

        </q-select>
        <q-btn
          round flat
          size="sm"
        >
          <q-avatar
            size="sm"
            color="grey-5"
            text-color="white"
          >
            Go
          </q-avatar>
          <q-popup-edit
            v-model="popup"
            :offset="[-20,-20]"
          >
            <q-input
              v-model="gotoPage"
              style="width: 200px;"
              rounded outlined dense
              type="number"
              placeholder="페이지 바로가기"
              @keyup.enter="gotoPageFn"
            >
              <template v-slot:append>
                <q-btn
                  round flat
                  icon="send"
                  size="xs"
                  @click="gotoPageFn"
                />
              </template>
            </q-input>
          </q-popup-edit>
        </q-btn>
      </div>
    </span>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import moment from 'moment'
import getLog from '../../apis/getLog'
import timeFormat from '../../apis/timeFormat'

const columes = [
  { name: 'date', align: 'center', label: 'Date', field: 'createdAt', sortable: true },
  { name: 'Source', align: 'center', label: 'Source', field: 'source', sortable: true },
  { name: 'Category', align: 'center', label: 'Category', field: 'category', sortable: true },
  { name: 'Priority', align: 'center', label: 'Priority', field: 'priority', sortable: true },
  { name: 'Zones', align: 'center', label: 'zones', field: 'zones', sortable: true },
  { name: 'Message', align: 'center', label: 'Message', field: 'message', sortable: true }
]

const pageOptions = [
  5, 10, 15, 20, 25, 30, 40, 50
]

export default defineComponent({
  setup () {
    moment.locale('ko')
    const store = useStore()
    const $q = useQuasar()

    // VUEX
    const logs = computed(() => store.state.eventlog.logs)
    const count = computed(() => store.state.eventlog.count)
    const loading = computed(() => store.state.eventlog.loading)
    const search = computed(() => store.state.eventlog.search)
    const numOfPage = computed(() => {
      if ($q.screen.gt.sm) {
        return 10
      } else {
        return 3
      }
    })
    const maxPage = computed(() => store.getters['eventlog/getMaxPage'])
    const rowsPerPage = computed({
      get () { return store.state.eventlog.rowsPerPage },
      set (value) {
        store.commit('eventlog/updateRowsPerPage', value)
        table.value.setPagination({ rowsPerPage: value })
        return getLog(value, page.value)
      }
    })
    const page = computed({
      get () { return store.state.eventlog.page },
      set (value) { return store.commit('eventlog/updatePage', value) }
    })

    // Var
    const table = ref(null)
    const pagination = ref(null)
    const gotoPage = ref(null)
    const popup = ref(false)

    // Function
    async function pageChange (value) {
      console.log('change page = ', value)
      store.commit('eventlog/updateLoading', true)
      const r = await getLog(rowsPerPage.value, value, search.value)
      store.dispatch('eventlog/updateLogs', r)
      store.commit('eventlog/updateLoading', false)
    }

    function gotoPageFn () {
      // store.commit('eventlog/updatePage', gotoPage.value)
      // pageChange(gotoPage.value)
      pagination.value.set(gotoPage.value)
    }

    // Life Time
    onMounted(async () => {
      store.commit('eventlog/updateLoading', true)
      const r = await getLog(rowsPerPage.value, 1, search.value)
      store.dispatch('eventlog/updateLogs', r)
      table.value.setPagination({ rowsPerPage: rowsPerPage })
      store.commit('eventlog/updateLoading', false)
    })

    return {
      columes,
      pageOptions,
      numOfPage,
      logs,
      count,
      page,
      rowsPerPage,
      maxPage,
      loading,
      table,
      pagination,
      gotoPage,
      popup,
      timeFormat,
      pageChange,
      gotoPageFn
    }
  }
})
</script>
