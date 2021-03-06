<template>
  <q-form @submit="onSubmit">
    <q-card class="card-nomal">
      <q-card-section class="q-pa-none">
        <div class="backg-gr-bl">
          <div class="card-name-align">
            <div class="card-name">
              <q-icon
                name="svguse:icons.svg#user-circle-fill"
                color="teal-10"
              />
              <div>
                로그인
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <!-- 에러 메세지 표시창 -->
      <q-card-section v-if="error">
        <div style="position: relative; height: 3rem;">
          <div
            class="bg-red text-white row justify-end"
            style="position: absolute; border-radius: 1.5rem; width:100%; height: 3rem;"
          >
            <q-btn
              style="z-index: 10;"
              round
              flat
              icon="cancel"
              @click="error=null"
            />
          </div>
          <div
            style="position: absolute;
                      width:100%;
                      text-align: center;
                      color: white;
                      line-height: 3rem;"
          >
            {{ error }}
          </div>
        </div>
      </q-card-section>

      <!-- 로그인 정보 시작 -->
      <q-card-section>
        <div class="q-pa-md">
          <div class="row justify-between">
            <span class="text-bold">
              이메일
            </span>
            <span>
              <q-checkbox
                v-model="saveEmail"
                dense
                left-label
                label="이메일 저장"
                color="cyan-6"
                @click="saveIdToLocal"
              />
            </span>
          </div>
          <div
            class="q-my-sm"
          >
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
          <div
            class="q-my-sm"
          >
            <q-input
              v-model="userInfo.password"
              class="inputs"
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
                  :name="showPassword ? 'visibility' : 'visibility_off'"
                  size="sm"
                  @click="showPassword=!showPassword"
                />
              </template>
            </q-input>
          </div>

          <div class="q-mt-lg">
            <q-btn
              class="full-width"
              rounded
              type="submit"
              color="grey-8"
              padding=".6rem"
              no-caps
            >
              <div
                class="name"
                style="font-size: 1rem;"
              >
                로그인
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <div>
          <q-checkbox
            v-model="userInfo.keepLoggedin"
            dense
            left-label
            label="로그인 유지"
            color="teal-14"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const $q = useQuasar()
    const { dispatch } = useStore()
    const router = useRouter()
    const error = ref('')
    const saveEmail = ref(false)
    const showPassword = ref(false)

    const rules = reactive({
      email: [
        value => !!value || '이메일을 입력하세요.',
        v => /.+@.+\..+/.test(v) || '이메일 형식이 아닙니다.'
      ],
      password: [
        value => !!value || '비밀번호를 입력하세요.',
        v => v.length >= 8 || '최소 8자 이상 입력하세요.'
      ]
    })

    const userInfo = reactive({
      userId: '',
      password: '',
      keepLoggedin: false
    })

    onMounted(() => {
      saveEmail.value = localStorage.getItem('saveId') === 'true'
      if (saveEmail.value) {
        userInfo.userId = localStorage.getItem('userId')
      }
    })

    function saveIdToLocal () {
      if (saveEmail.value) {
        localStorage.setItem('saveId', true)
        localStorage.setItem('userId', userInfo.userId)
      } else {
        localStorage.setItem('saveId', false)
        localStorage.removeItem('userId')
      }
    }

    async function onSubmit () {
      saveIdToLocal()
      $q.loading.show({
        message: '로그인 중입니다. 잠시만 기다려주세요.'
      })
      error.value = await dispatch('user/login', userInfo)
      $q.loading.hide()
      if (!error.value) return router.push('/')
    }
    return {
      error,
      saveEmail,
      showPassword,
      rules,
      userInfo,
      saveIdToLocal,
      onSubmit
    }
  }
}

</script>

<style scoped>
.q-field--error .q-field__bottom {
  color: red !important;
  color: red !important;
}
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
