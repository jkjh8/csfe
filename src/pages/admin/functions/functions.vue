<template>
  <div style="margin: 10% 10% 0 10%">
    <!-- Name Tag -->
    <div class="q-gutter-sm q-mb-md row items-center">
      <span>
        <q-icon
          name="svguse:icons.svg#server"
          size="sm"
          color="blue-grey"
        />
      </span>
      <span class="name">서버 관리</span>
      <span
        class="caption self-end q-gutter-sm"
        style="margin-bottom: 2px"
      >
        하드웨어 관리
      </span>
    </div>
    <div class="q-mt-xl">
      <div>
        <Hardware />
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";

import Hardware from '@components/admin/hardware'

export default {
  components: { Hardware },
  setup() {
    moment.locale("ko");
    const { state, dispatch } = useStore();
    const user = computed(() => state.user.user);

    onBeforeMount(async () => {
      dispatch("user/getUsers");
    });
    return {
      user,
      close
    }
  }
}
</script>
