<template>
  <q-form @submit="onSubmit">
    <q-card class="card-nomal">
      <q-card-section class="q-pa-none">
        <div class="backg-gr-bl">
          <div class="card-name-align">
            <div class="card-name">
              <q-icon
                name="svguse:icons.svg#user-add"
                color="teal-10"
              />
              <div>회원가입</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <!-- 에러 메세지 표시창 -->
      <q-card-section v-if="error">
        <div style="position: relative; height: 3rem">
          <div
            class="bg-red text-white row justify-end"
            style="
              position: absolute;
              border-radius: 1rem;
              width: 100%;
              height: 3rem;
            "
          >
            <q-btn
              style="z-index: 10"
              round
              flat
              icon="cancel"
              @click="error = null"
            />
          </div>
          <div
            style="
              position: absolute;
              width: 100%;
              text-align: center;
              color: white;
              line-height: 3rem;
            "
          >
            {{ error }}
          </div>
        </div>
      </q-card-section>

      <!-- 가입 정보 시작 -->
      <q-card-section>
        <div class="q-pa-md">
          <div class="text-bold">이름</div>
          <div class="q-my-sm">
            <q-input
              v-model="userInfo.userName"
              outlined
              dense
              bg-color="white"
              lazy-rules
              :rules="rules.name"
            />
          </div>

          <div class="text-bold">이메일</div>
          <div class="q-my-sm">
            <q-input
              v-model="userInfo.userId"
              outlined
              dense
              bg-color="white"
              lazy-rules
              :rules="rules.email"
            />
          </div>

          <div class="row justify-between q-mt-lg text-bold">
            비밀번호
          </div>
          <div class="q-my-sm">
            <q-input
              v-model="userInfo.password"
              outlined
              dense
              bg-color="white"
              lazy-rules
              :rules="rules.password"
              :type="showPassword ? 'text' : 'password'"
              @keyup.enter="onSubmit"
            >
              <template #append>
                <q-icon
                  :name="
                    showPassword ? 'visibility' : 'visibility_off'
                  "
                  size="sm"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>

          <div class="row justify-between q-mt-lg text-bold">
            비밀번호 재확인
          </div>
          <div class="q-my-sm">
            <q-input
              v-model="userInfo.chkPassword"
              outlined
              dense
              bg-color="white"
              lazy-rules
              :rules="rules.chkPassword"
              :type="showChkPassword ? 'text' : 'password'"
              @keyup.enter="onSubmit"
            >
              <template #append>
                <q-icon
                  :name="
                    showChkPassword ? 'visibility' : 'visibility_off'
                  "
                  size="sm"
                  @click="showChkPassword = !showChkPassword"
                />
              </template>
            </q-input>
          </div>

          <!-- submit -->
          <div class="q-mt-lg">
            <q-btn
              class="full-width"
              style="height: 40px"
              type="submit"
              color="cyan-7"
              rounded
              unelevated
            >
              <div v-if="loading">
                <q-spinner color="teal" size="24px" :thickness="10" />
              </div>
              <div v-else class="text-subtitle1 text-bold">
                가입하기
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const { dispatch } = useStore()
    const router = useRouter()
    const $q = useQuasar()
    const error = ref('')
    const loading = ref(false)
    const showPassword = ref(false)
    const showChkPassword = ref(false)

    const userInfo = reactive({
      userId: '',
      password: '',
      chkPassword: '',
      userName: ''
    })

    const rules = reactive({
      name: [value => !!value || '필수 항목 입니다.'],
      email: [
        value => !!value || '필수 항목 입니다.',
        v => /.+@.+\..+/.test(v) || '이메일 형식이 아닙니다.'
      ],
      password: [
        value => !!value || '필수 항목 입니다.',
        v => v.length >= 8 || '최소 8자 이상 입력하세요.'
      ],
      chkPassword: [
        value => !!value || '필수 항목 입니다.',
        v => v.length >= 8 || '최소 8자 이상 입력하세요.',
        v =>
          v === userInfo.password || '비밀번호가 일치하지 않습니다.'
      ]
    })

    async function onSubmit() {
      $q.loading.show({
        message: '회원 가입중입니다. 잠시만 기다려주세요.'
      })
      console.log(userInfo)
      error.value = await dispatch('user/register', userInfo)
      $q.loading.hide()
      if (!error.value) {
        $q.loading.show({
          message: '로그인중입니다. 잠시만 기다려주세요.'
        })
        await dispatch('user/login', userInfo)
        $q.loading.hide()
        router.push('/')
      }
    }

    return {
      error,
      loading,
      showPassword,
      showChkPassword,
      userInfo,
      rules,
      onSubmit
    }
  }
}
</script>
