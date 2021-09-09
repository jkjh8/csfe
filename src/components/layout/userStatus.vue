<template>
  <div v-if="user" class="q-gutter-sm">
    <q-btn round flat>
      <q-icon name="svguse:icons.svg#chat-alt" size="sm" color="grey-8" />
    </q-btn>
    <q-btn round flat>
      <q-icon name="svguse:icons.svg#user-circle-fill" size="md" color="grey-8" />
      <q-menu class="shadow-15" style="border-radius: 1.5rem;" :offset="[40,10]">
        <q-item>
          <q-item-section
            class="column justify-center items-center q-my-md"
            style="width: 20em"
          >
            <q-avatar
              class="row justify-center items-center q-mt-md"
              size="80px"
              color="grey-10"
            >
              <q-icon
                name="fas fa-user-alt"
                color="white"
                size="40px"
              >
              </q-icon>
              <q-badge
                class="q-pa-sm"
                style="border-radius: 50%"
                color="orange"
                :label="nickname"
                align="bottom"
                floating
                transparent
              />
            </q-avatar>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="colume items-center">
            <q-item-label>{{ user.userName }}</q-item-label>
            <q-item-label>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="row justify-center" style="width: 200px">
            <q-btn
              class="btn q-mx-xl q-my-md"
              to="/userInfo"
              outline
              rounded
              color="grey"
              text-color="black"
            >
              사용자 정보
            </q-btn>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-btn
              class="q-mx-xl q-my-md"
              style="color: #F2F2F2; background: #0B3B24;"
              flat
              rounded
              label="Logout"
              @click="logout"
            ></q-btn>
          </q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </div>
  <div v-else>
    <q-btn flat rounded size="sm" to="/login">로그인</q-btn>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { api } from '../../boot/axios'
export default {
  props: ['user'],
  setup (props) {
    const { getters, commit } = useStore()
    const nickname = computed(() => getters['user/nickname'])
    async function logout () {
      const r = await api.get('/auth/logout')
      if (r) {
        commit('user/updateUser', r.data.user)
      }
    }
    return { nickname, logout }
  }
}
</script>
