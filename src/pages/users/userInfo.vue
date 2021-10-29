<template>
  <div
    class="row justify-center items-center"
    style="margin-top: 10%;"
  >
    <q-card
      class="card-large"
    >
      <q-card-section class="q-pa-none">
        <div class="backg-gr-bl">
          <div class="card-name-align">
            <div class="card-name">
              <q-icon
                name="svguse:icons.svg#user-circle-fill"
                color="grey-4"
              />
              <div>사용자 정보</div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section v-if="user">
        <q-list class="q-ml-md">
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                사용자 ID
              </q-item-label>
              <q-item-label>{{ user.userId }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                사용자 이름
              </q-item-label>
              <q-item-label>{{ user.userName }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                이메일
              </q-item-label>
              <q-item-label>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                관리자
              </q-item-label>
              <q-item-label class="text-uppercase">
                {{ user.admin }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                사용자 고유 색상
              </q-item-label>
              <q-btn
                class="q-my-sm"
                unelevated
                rounded
                :style="user.color ? `background: ${user.color}`:'background: #eee'"
                @click="fnPickColor(user.color)"
              />
            </q-item-section>
          </q-item>
          <!-- <q-item>
            <q-item-section>
              <q-item-label class="text-bold">TTS 권환</q-item-label>
              <q-item-label class="text-uppercase">{{ user.tts }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                로그인 횟수
              </q-item-label>
              <q-item-label class="text-uppercase">
                {{ user.numberOfLogin }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                가입일
              </q-item-label>
              <q-item-label class="text-uppercase">
                {{ time.timeFormat(user.createdAt) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                마지막 로그인 시간
              </q-item-label>
              <q-item-label class="text-uppercase">
                {{ time.timeFormat(user.loginAt) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="q-ma-sm row justify-end">
          <button @click="fnCancelMembership">
            로그아웃
          </button>
        </div>
        <div class="q-ma-sm row justify-end">
          <button @click="fnCancelMembership">
            탈퇴하기
          </button>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions align="right">
        <q-btn
          class="q-mr-md"
          flat
          rounded
          to="/"
        >
          홈으로
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'
import moment from 'moment'
moment.locale('ko')

import time from '@/apis/time'

import colorPicker from '@components/dialog/colorPicker'
import DefaultDialog from '@components/dialog/default'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const { state, dispatch} = useStore()
    const user = computed(() => state.user.user)

    onMounted(() => dispatch("user/getUser"))

    function fnCancelMembership () {
      $q.dialog({
        component: DefaultDialog,
        componentProps: {
          title: '회원 탈퇴',
          message: '회원 탈퇴합니다. 회원 탈퇴시 다시 복구할 수 없으니 다시 한변 확인 부탁드립니다.'
        }
      }).onOk(async() => {
        console.log(user.value)
        $q.loading.show()
        try {
          await api.get(`/auth/users/delete?id=${user.value._id}`)
          
          
          } catch (err) {
            console.error(err)
        }
        $q.loading.hide()
      })
    }

    function fnPickColor (color) {
      $q.dialog({
        component: colorPicker,
        componentProps: { color: color }
      }).onOk(async (rt) => {
        $q.loading.show()
        try {
          await api.put('/auth/users/color', {
            email: user.value.email,
            color: rt
          })
          await dispatch('user/getUser')
        } catch (err) {
          console.log(err)
        }
        $q.loading.hide()
      })
    }

    return {
      user,
      time,
      fnPickColor,
      fnCancelMembership
    }
  }
})
</script>

<style scoped>
button {
  border: none;
  background: transparent;
  text-decoration: underline;
  cursor: pointer;
}
</style>
