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
        <div
          class="column justify-center items-center q-my-md"
          style="width: 200px"
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
          <div class="q-mt-md text-subtitle2">
            {{ user.user_name }}
          </div>
          <div class="text-caption">
            {{ user.email }}
          </div>
          <div
            class="q-mt-md"
            style="width: 150px;"
          >
            <q-btn
              class="full-width"
              flat
              rounded
              to="/userInfo"
            >
              사용자 정보
            </q-btn>
          </div>
          <div
            class="q-my-md"
            style="width: 150px;"
          >
            <q-btn
              class="full-width"
              style="color: #F2F2F2; background: #0B3B24;"
              flat
              rounded
              label="Logout"
              @click="logout"
            ></q-btn>
          </div>
        </div>
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
