<template>
  <div
    class="row justify-center items-center"
    style="margin-top: 50px;"
  >
    <q-card
      style="width: 28rem; border-radius: 10px;"
    >
      <q-card-section>
        <div class="row items-center">
          <div class="logo-icon row justify-center items-center">
            <q-icon
              name="fas fa-user"
              size="20px"

            />
          </div>
          <div class="text-h6 text-bold q-ml-sm">
            사용자 정보
          </div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-list class="q-ml-md">
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">사용자 ID</q-item-label>
              <q-item-label>{{ user.userId }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">사용자 이름</q-item-label>
              <q-item-label>{{ user.userName }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">이메일</q-item-label>
              <q-item-label>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">사용자 등급</q-item-label>
              <q-item-label>{{ user.userLevel }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">관리자</q-item-label>
              <q-item-label class="text-uppercase">{{ user.admin }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">TTS 권환</q-item-label>
              <q-item-label class="text-uppercase">{{ user.tts }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">로그인 횟수</q-item-label>
              <q-item-label class="text-uppercase">{{ user.numberOfLogin }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">가입일</q-item-label>
              <q-item-label class="text-uppercase">{{ timeFormat(user.createdAt) }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">마지막 로그인 시간</q-item-label>
              <q-item-label class="text-uppercase">{{ timeFormat(user.loginAt) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator inset />
      <q-card-actions align="right">
        <q-btn
          flat
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
import moment from 'moment'
import getUser from '../apis/users'

export default defineComponent({
  setup () {
    moment.locale('ko')
    const store = useStore()
    const user = computed(() => store.state.user.user)

    onMounted(() => getUser())

    function timeFormat (time) {
      return moment(time).format('YYYY/MM/DD hh:mm:ss a')
    }

    return { user, timeFormat }
  }
})
</script>

<style scoped>
.logo-icon {
  width: 36px;
  height: 36px;
  border: 1px solid;
  border-color: #324b3f;
  border-radius: 50%;
  margin: 5px 5px 5px 5px;
  background:#324b3f;
  color: #e5e7e6;
}

.name-tag {
  width: 100px;
}
</style>
