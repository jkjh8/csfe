<template>
  <q-card class="q-mx-md q-my-md" style="border-radius: 1rem;">
    <q-card-section class="q-py-sm row justify-between items-center">
      <div class="row items-center">
        <span>
          <q-avatar
            color="green-10"
            text-color="white"
            size="2rem"
            icon="fas fa-list"
          ></q-avatar>
        </span>
        <q-item class="q-py-none">
          <q-item-section>
            <q-item-label class="text-h6 text-bold nanum">
              이벤트 로그
            </q-item-label>
            <q-item-label caption>
              총 {{ logs.totalDocs }}개의 이벤트로그
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="q-mr-sm row items-center">
        <q-input
          rounded outlined dense hide-bottom-space
          placeholder="검색"
          v-model="search"
          input-style="margin-left: 10px;"
          @keyup.enter="getLogWithSearch"
        >
          <template v-slot:append>
            <q-btn
              round flat
              size="xs"
              icon="fas fa-search"
              @click="getLogWithSearch"
            >
            </q-btn>
          </template>
        </q-input>
        <span class="q-ml-sm q-pa-none">
          <q-btn
            round flat
            @click="getLogWithSearch"
          >
            <q-icon name="sync" size="1.5rem" />
          </q-btn>
        </span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <Table />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, computed } from 'vue'
import Table from '../../components/eventlog/table.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const { proxy } = getCurrentInstance()
const logs = computed(() => proxy.$store.state.eventlog.logs)

const search = computed({
  get () { return proxy.$store.state.eventlog.search },
  set (value) { return proxy.$store.commit('eventlog/updateSearch', value) }
})

async function getLogWithSearch () {
  $q.loading.show({ spinnerColor: 'primary' })
  await proxy.$store.dispatch('eventlog/getLogs')
  $q.loading.hide()
}
onBeforeMount(() => {
  proxy.$store.dispatch('user/getUser')
})
</script>

<style scoped>
.nanum {
  font-family: 'nanumgothicbold';
}
</style>
