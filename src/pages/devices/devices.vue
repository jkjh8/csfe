<template>
  <div style="padding: 5% 10% 0 10%">
    <div class="row justify-between items-center q-ml-lg q-mb-lg">
      <div class="row items-center q-gutter-sm">
        <q-icon
          name="svguse:icons.svg#server-fill"
          size="sm"
          color="teal"
        />
        <span class="name">디바이스</span>
        <span class="caption">
          총 {{ count.zones }}개의 디바이스 중 점검필요 {{ count.error.zones }}개가 존재 합니다</span>
      </div>
      <div>
        {{ message }}
      </div>
      <div class="q-mr-md q-gutter-md row items-center">
        <div>
          <q-btn
            flat
            round
            icon="svguse:icons.svg#pencil-fill"
            size="sm"
            color="teal-6"
            @click="fnCreateUpdateItem"
          >
            <q-tooltip
              class="bg-white text-black"
              :delay="500"
            >
              디바이스 추가
            </q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-input
            v-model="search"
            dense
            outlined
            rounded
            label="Search"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <Table />
  </div>
</template>

<script>
import { defineComponent, ref, computed, onBeforeMount } from "vue"
import { useStore } from "vuex"
import { useQuasar } from 'quasar'
import Table from "../../components/devices/table.vue"

import addEditCompoenet from '@components/dialog/devices/deviceAdd'

export default defineComponent({
  components: { Table },
  setup() {
    const { state, commit, getters, dispatch } = useStore()
    const $q = useQuasar()
    const user = computed(() => state.user.user)

    const count = computed(() => getters["devices/count"])
    const connected = computed(() => state.socket.connect)
    const search = computed({
      get () { return state.devices.search },
      set(v) { return commit('devices/updateSearch', v) }
    })
    const message = ref('');

    function fnCreateUpdateItem () {
      $q.dialog({
        component: addEditCompoenet,
      }).onOk(async () => {
        $q.loading.show()
        await dispatch('devices/updateDevices')
        $q.loading.hide()
      })
    }

    onBeforeMount(() => {
      dispatch("user/getUser");
    });

    return {
      user,
      count,
      connected,
      message,
      search,
      fnCreateUpdateItem
    };
  },
});
</script>
