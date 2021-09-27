<template>
  <div
    class="row justify-center items-center"
    style="margin-top: 10%;"
  >
    <q-card
      class="shadow-15 location_card"
    >
      <q-card-section
        class="q-pa-none"
        style="overflow: hidden;"
      >
        <q-img
          src="/background/cover_1.jpg"
          style="height: 6rem;"
        >
          <div class="fit row items-center">
            <q-icon
              class="q-ml-md"
              name="svguse:icons.svg#user-circle-fill"
              size="lg"
            />
            <span class="q-ml-md name">사용자 정보</span>
          </div>
        </q-img>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
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
                사용자 등급
              </q-item-label>
              <q-item-label>{{ user.userLevel }}</q-item-label>
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
                {{ timeFormat(user.createdAt) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">
                마지막 로그인 시간
              </q-item-label>
              <q-item-label class="text-uppercase">
                {{ timeFormat(user.loginAt) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
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
import moment from 'moment'
import getUser from '../../apis/users'

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
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
