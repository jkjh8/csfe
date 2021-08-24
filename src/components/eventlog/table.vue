<template>
  <q-table
    :columns="columes"
    :rows="logs.docs"
    :pagination="{ rowsPerPage: 0 }"
    hide-pagination
    flat
  >
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
        unelevated
        color="grey-8"
        active-color="green-10"
        rounded dense direction-links
        :max-pages="$q.screen.gt.md ? 7 : 3"

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
          :options="[5, 10, 15, 20, 25, 30, 40, 50]"
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

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import timeFormat from '../../apis/timeFormat'

const columes = [
  { name: 'date', align: 'center', label: 'Date', field: 'createdAt', sortable: true },
  { name: 'source', align: 'center', label: 'Source', field: 'source', sortable: true },
  { name: 'category', align: 'center', label: 'Category', field: 'category', sortable: true },
  { name: 'priority', align: 'center', label: 'Priority', field: 'priority', sortable: true },
  { name: 'zones', align: 'center', label: 'zones', field: 'zones', sortable: true },
  { name: 'message', align: 'center', label: 'Message', field: 'message', sortable: true }
]

const { proxy } = getCurrentInstance()
const store = useStore()
const $q = useQuasar()

// VUEX
const logs = computed(() => store.state.eventlog.logs)

const rowsPerPage = computed({
  get () { return store.state.eventlog.logs.limit },
  set (value) {
    store.commit('eventlog/updateRowsPerPage', value)
    return proxy.$store.dispatch('eventlog/getLogs')
  }
})
const page = computed({
  get () { return store.state.eventlog.logs.page },
  set (value) { return store.commit('eventlog/updatePage', value) }
})

// Var
const pagination = ref(null)
const gotoPage = ref(null)
const popup = ref(false)

// Function
async function pageChange (value) {
  $q.loading.show({ spinnerColor: 'cyan' })
  await proxy.$store.dispatch('eventlog/getLogs')
  $q.loading.hide()
}

function gotoPageFn () {
  // store.commit('eventlog/updatePage', gotoPage.value)
  // pageChange(gotoPage.value)
  pagination.value.set(gotoPage.value)
}

// Life Time
onMounted(async () => {
  pageChange()
})

</script>
