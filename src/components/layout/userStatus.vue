<template>
  <div v-if="!user">
    <q-btn
      class="bg-grey-9 text-grey-1"
      size="sm"
      rounded
      flat
      to="/login"
    >
      로그인
    </q-btn>
  </div>
  <div v-else>
    <q-btn
      flat
      round
    >
      <q-avatar
        color="grey-6"
        text-color="white"
        size="md"
      >
        {{ nickname }}
      </q-avatar>

      <q-menu
        class="shadow-10"
        style="border-radius: 10px"
        :offset="[0,20]"
      >
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
            <q-item-label>{{ user.user_name }}</q-item-label>
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

        <q-separator />

        <q-item>
          <q-item-section class="row justify-center items-center">
            <strong class="text-overline">Media Server With MC</strong>
          </q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { api } from '../../boot/axios'

export default defineComponent({
  setup () {
    const store = useStore()

    const user = computed(() => store.state.user.user)
    const nickname = computed(() => store.getters['user/nickname'])

    function logout () {
      api.get('/auth/logout').then((res) => {
        store.commit('user/updateUser', null)
      })
    }
    return { user, nickname, logout }
  }
})
</script>
