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
import { ref, onBeforeMount, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { api } from '@/boot/axios'

import Hardware from '@components/admin/hardware'

export default {
  components: { Hardware },
  setup() {
    moment.locale("ko");
    const { state, dispatch } = useStore();
    const user = computed(() => state.user.user);

    const currentUser = ref(null);
    const editDialog = ref(false);
    const selectedUser = ref(null);
    const popupAdmin = ref(false);
    const mdDeleteUser = ref(false)

    function editUser(user) {
      currentUser.value = user;
      editDialog.value = true;
    }

    function editAdmin(user) {
      selectedUser.value = user;
      popupAdmin.value = true;
    }

    function startDeleteUser(user) {
      selectedUser.value = user
      mdDeleteUser.value = true
    }

    function close() {
      editDialog.value = false;
      popupAdmin.value = false;
      currentUser.value = null;
      selectedUser.value = null;
    }

    function timeFormat2line(time) {
      return `${moment(time).format("YYYY/MM/DD")} \n ${moment(time).format(
        "hh:mm:ss a"
      )}`;
    }

    async function fnDeleteUser () {
      await api.get(`/auth/users/delete?id=${selectedUser.value._id}`)
      dispatch('user/getUsers')
      mdDeleteUser.value = false
    }
    onBeforeMount(async () => {
      dispatch("user/getUsers");
    });
    return {
      user,
      currentUser,
      editDialog,
      editUser,
      selectedUser,
      popupAdmin,
      editAdmin,
      timeFormat2line,
      close,
      startDeleteUser,
      mdDeleteUser,
      fnDeleteUser
    }
  }
}
</script>
