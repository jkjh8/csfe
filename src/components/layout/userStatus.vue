<template>
  <div
    v-if="user"
    class="q-gutter-sm"
  >
    <q-btn
      round
      flat
    >
      <q-icon
        name="svguse:icons.svg#chat-alt"
        size="sm"
        color="grey-8"
      />
    </q-btn>
    <q-btn
      round
      flat
    >
      <q-avatar
        :text-color="user.color ? colorApi.checkColor(user.color):'#000'"
        size="md"
        :style="user.color ? `background: ${user.color}`:'background: #333'"
      >
        <div class="absolute-center">
          {{ nickname }}
        </div>
      </q-avatar>
      <!-- <q-icon name="svguse:icons.svg#user-circle-fill" size="md" color="grey-8" /> -->
      <q-menu
        class="shadow-15"
        style="border-radius: 1.5rem"
        :offset="[40, 10]"
      >
        <q-item>
          <q-item-section
            class="column justify-center items-center q-my-md"
            style="width: 20em"
          >
            <q-avatar
              class="row justify-center items-center q-mt-md"
              size="100px"
              :text-color="colorApi.checkColor(user.color ? user.color:'grey')"
              :style="user.color ? `background: ${user.color}`:'background: #333'"
            >
              <div class="absolute-center">
                {{ nickname }}
              </div>
              <q-badge
                v-if="user.admin"
                class="q-pa-sm"
                color="orange"
                label="관리자"
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
          <q-item-section
            class="row justify-center"
            style="width: 200px"
          >
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
              color="grey-8"
              unelevated
              rounded
              label="Logout"
              @click="logout"
            />
          </q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </div>
  <div v-else>
    <q-btn
      flat
      rounded
      size="sm"
      to="/login"
    >
      로그인
    </q-btn>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { api } from '../../boot/axios'
import colorApi from '@/apis/color'

export default {
  props: {
    user: Object
  },
  setup() {
    const { getters, commit } = useStore()
    const $router = useRouter()
    const nickname = computed(() => getters['user/nickname'])
    async function logout() {
      const r = await api.get('/auth/logout')
      if (r) {
        commit('user/updateUser', null)
        $router.push('/')
      }
    }
    return { nickname, logout, colorApi }
  }
}
</script>
