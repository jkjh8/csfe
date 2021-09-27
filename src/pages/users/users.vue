<template>
  <div style="margin: 10% 10% 0 10%">
    <div class="q-gutter-sm q-mb-md row items-center">
      <span>
        <q-icon
          name="svguse:icons.svg#user-group-fill"
          size="sm"
          color="blue-grey"
        />
      </span>
      <span class="name">사용자 관리</span>
      <span
        class="caption self-end q-gutter-sm"
        style="margin-bottom: 2px"
      >
        <span>
          총 <strong>{{ usersCount }}</strong>명의 사용자가 있습니다
        </span>
        <span>
          그중 <strong>{{ adminCount }}</strong>명의 관리자가 있습니다
        </span>
      </span>
    </div>
    <q-table
      class="shadow-15 q-mt-xl q-pa-sm"
      style="border-radius: 2rem"
      :columns="columns"
      :rows="users"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-family: 나눔고딕; font-weight: 800"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template #body-cell-admin="props">
        <q-td :props="props">
          <div v-if="props.value === true">
            <q-btn
              icon="svguse:icons.svg#check-circle"
              size="sm"
              color="green-8"
              round
              flat
              @click="editAdmin(props.row)"
            />
          </div>
          <div v-else>
            <q-btn
              icon="svguse:icons.svg#ban"
              size="sm"
              color="red"
              round
              flat
              @click="editAdmin(props.row)"
            />
          </div>
        </q-td>
      </template>
      <template #body-cell-createdAt="props">
        <q-td :props="props">
          <div style="white-space: pre; text-align: center">
            {{ timeFormat2line(props.value) }}
          </div>
        </q-td>
      </template>
      <template #body-cell-updatedAt="props">
        <q-td :props="props">
          <div style="white-space: pre; text-align: center">
            {{ timeFormat2line(props.value) }}
          </div>
        </q-td>
      </template>
      <template #body-cell-loginAt="props">
        <q-td :props="props">
          <div style="white-space: pre; text-align: center">
            {{ timeFormat2line(props.value) }}
          </div>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            size="sm"
            color="cyan-8"
            icon="svguse:icons.svg#pencil-fill"
            @click="editUser(props.row)"
          />
          <q-btn
            flat
            round
            icon="svguse:icons.svg#trash-fill"
            size="sm"
            color="red"
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="editDialog">
    <EditUser :user="currentUser" />
  </q-dialog>
  <q-dialog v-model="popupAdmin">
    <PopupAdmin
      :user="selectedUser"
      @close="close"
    />
  </q-dialog>
</template>

<script>
const columns = [
  { name: "email", align: "center", label: "이메일", field: "email" },
  { name: "name", align: "center", label: "사용자이름", field: "userName" },
  { name: "admin", align: "center", label: "관리자", field: "admin" },
  // { name: 'tts', align: 'center', label: 'TTS권한', field: 'tts' },
  { name: "auth", align: "center", label: " 지역권한", field: "auth" },
  // { name: 'level', align: 'center', label: 'Level', field: 'userLevel' },
  {
    name: "nomberOfLogin",
    align: "center",
    label: "로그인횟수",
    field: "numberOfLogin",
  },
  { name: "createdAt", align: "center", label: "가입일", field: "createdAt" },
  { name: "updatedAt", align: "center", label: "수정일", field: "updatedAt" },
  { name: "loginAt", align: "center", label: "최종로그인", field: "loginAt" },
  { name: "actions", align: "center", label: "Actions", field: "actions" },
];

import { ref, onBeforeMount, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";

import EditUser from "./edit";
import PopupAdmin from "./popupAdmin.vue";

export default {
  components: { EditUser, PopupAdmin },
  props: {
    user: Object,
  },
  setup() {
    moment.locale("ko");
    const { state, getters, dispatch } = useStore();
    const users = computed(() => state.user.users);
    const usersCount = computed(() => getters["user/numberOfUsers"]);
    const adminCount = computed(() => getters["user/numberOfAdmin"]);
    const currentUser = ref(null);
    const editDialog = ref(false);
    const selectedUser = ref(null);
    const popupAdmin = ref(false);

    function editUser(user) {
      currentUser.value = user;
      editDialog.value = true;
    }

    function editAdmin(user) {
      selectedUser.value = user;
      popupAdmin.value = true;
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
    onBeforeMount(async () => {
      dispatch("user/getUsers");
    });
    return {
      users,
      usersCount,
      adminCount,
      currentUser,
      columns,
      editDialog,
      editUser,
      selectedUser,
      popupAdmin,
      editAdmin,
      timeFormat2line,
      close,
    };
  },
};
</script>
