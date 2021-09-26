<template>
  <div style="padding: 5% 10% 0 10%">
    <div class="row justify-between items-center q-ml-lg q-mb-lg">
      <div class="row items-center q-gutter-sm">
        <q-icon name="svguse:icons.svg#server-fill" size="sm" color="teal" />
        <span class="name">디바이스</span>
        <span class="caption">
          총 {{ count }}개의 디바이스 중 신규 디바이스 {{ newConunt }}개
          점검필요 {{ errorConunt }}개가 존재 합니다</span
        >
      </div>
      <div>
        {{ message }}
      </div>
      <div class="q-mr-md">
        <q-btn
          flat
          round
          icon="svguse:icons.svg#pencil-fill"
          size="sm"
          color="teal-6"
          @click="dialog = !dialog"
        >
          <q-tooltip class="bg-white text-black" :delay="500">
            디바이스 추가
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <Table />
  </div>
  <q-dialog v-model="dialog" persistent>
    <CreateUpdate @close="dialog = false" />
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import Table from "../../components/devices/table.vue";
import CreateUpdate from "../../components/devices/createUpdate.vue";

export default defineComponent({
  components: { Table, CreateUpdate },
  props: {
    user: Object,
  },
  setup() {
    const { state, getters, dispatch } = useStore();

    const count = computed(() => getters["devices/getDeviceCount"]);
    const newConunt = computed(() => getters["devices/newDeviceCount"]);
    const errorConunt = computed(() => getters["devices/errorCount"]);
    const connected = computed(() => state.socket.connect);
    const message = ref("");
    const dialog = ref(false);

    function addDevice() {
      dialog.value = true;
    }

    onBeforeMount(() => {
      dispatch("user/getUser");
    });

    return {
      count,
      connected,
      dialog,
      message,
      newConunt,
      errorConunt,
      addDevice,
    };
  },
});
</script>
