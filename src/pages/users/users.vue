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
              @click="fnEditAdmin(props.row)"
            />
          </div>
          <div v-else>
            <q-btn
              icon="svguse:icons.svg#ban"
              size="sm"
              color="red"
              round
              flat
              @click="fnEditAdmin(props.row)"
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
            icon="svguse:icons.svg#trash-fill"
            size="sm"
            color="red"
            @click="fnDeleteUser(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="editDialog">
    <EditUser :user="currentUser" />
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

import { onBeforeMount, computed } from "vue"
import { useStore } from "vuex"
import { useQuasar } from 'quasar'
import moment from "moment";
moment.locale("ko");
import { api } from '@/boot/axios'

import DefalutDialog from '@components/dialog/default'
import Delete from '@components/dialog/delete'

export default {
  props: {
    user: Object,
  },
  setup() {
    const { state, getters, dispatch } = useStore();
    const $q = useQuasar()
    const users = computed(() => state.user.users);
    const usersCount = computed(() => getters["user/numberOfUsers"]);
    const adminCount = computed(() => getters["user/numberOfAdmin"]);

    function fnEditAdmin(user) {
      let message
      if (user.admin) {
        message = `${user.email}의 관리자 권한을 회수합니다.`
      } else {
        message = `${user.email}에 관리자 권한을 부여합니다.`
      }

      $q.dialog({
        component: DefalutDialog,
        componentProps: {
          title: '사용자 권한 변경',
          message: message,
          item: user
        }
      }).onOk(async (rt) => {
        await api.get(`/auth/users/admin?id=${rt._id}&value=${!rt.admin}`)
        await dispatch('user/getUsers')
      })
    }

    function timeFormat2line(time) {
      return `${moment(time).format("YYYY/MM/DD")} \n ${moment(time).format(
        "hh:mm:ss a"
      )}`;
    }

    async function fnDeleteUser (user) {

      $q.dialog({
        component: Delete,
        componentProps: { item: user }
      }).onOk(async (rt) => {
        console.log(rt)
        $q.loading.show()
        try {
          await api.get(`/auth/users/delete?id=${rt._id}`)
          dispatch('user/getUsers')
          } catch (err) {
            console.error(err)
        }
        $q.loading.hide()
      })
    }

    onBeforeMount(async () => {
      dispatch("user/getUsers")
    })

    return {
      users,
      usersCount,
      adminCount,
      columns,
      fnEditAdmin,
      timeFormat2line,
      close,
      fnDeleteUser
    };
  },
};
</script>

<style scoped>
.backg {
  height: 6rem;
  color: #fff;
  z-index: 1;
  background: linear-gradient(226deg, rgba(255,0,0,.8), rgba(255,0,0,0) 60.71%),
              linear-gradient(127deg, rgba(0,180,0,.8), rgba(0,255,0,0) 90.71%),
              linear-gradient(333deg, rgba(0,0,255,.8), rgba(0,0,255,0) 99%);
}
</style>
