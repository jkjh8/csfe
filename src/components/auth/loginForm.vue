<template>
  <q-form
    @submit="onSubmit"
  >
    <q-card
      class="q-pa-sm"
      style="width: 400px;border: .5px solid #AAAAAA; border-radius: 10px;"
      flat
    >
      <q-card-section
        v-if="error"
        class="bg-red-5 text-white q-ma-sm row justify-center"
        style="border-radius: 10px"
      >
        <div>
          {{ error }}
        </div>
      </q-card-section>
      <q-card-section>
        <div>
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
                color="teal-14"
                @click="saveIdToLocal"
              />
            </span>
          </div>
          <div
            class="q-my-sm"
          >
            <q-input
              v-model="userInfo.user_id"
              outlined dense bg-color="white"
              lazy-rules :rules="rules.email"
            ></q-input>
          </div>
          <div class="row justify-between q-mt-lg text-bold">
            비밀번호
          </div>
          <div
            class="q-my-sm"
          >
            <q-input
              class="inputs"
              v-model="userInfo.password"
              outlined
              dense
              bg-color="white"
              lazy-rules
              :rules="rules.password"
              :type="showPassword ? 'text' : 'password'"
              @keyup.enter="onSubmit"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility' : 'visibility_off'"
                  @click="showPassword=!showPassword"
                  size="sm"
                />
              </template>
            </q-input>
          </div>

          <div class="q-mt-lg">
            <q-btn
              class="full-width"
              style="background: #3EB443; color: white; border-radius: 8px; height: 40px"
              type="submit"
              flat
            >
              <div v-if='loading'>
                <q-spinner
                  color="teal"
                  size="24px"
                  :thickness="10"
                ></q-spinner>
              </div>
              <div v-else class="text-bold">
                Login
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

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { api } from '../../boot/axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const error = ref('')
const loading = ref(false)
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
  user_id: '',
  password: '',
  keepLoggedin: false
})

onMounted(() => {
  saveEmail.value = localStorage.getItem('saveId') === 'true'
  if (saveEmail.value) {
    userInfo.user_id = localStorage.getItem('userId')
  }
})

function saveIdToLocal () {
  if (saveEmail.value) {
    localStorage.setItem('saveId', true)
    localStorage.setItem('userId', userInfo.user_id)
  } else {
    localStorage.setItem('saveId', false)
    localStorage.removeItem('userId')
  }
}

function onSubmit () {
  saveIdToLocal()
  loading.value = true
  api.post('/auth/login', userInfo).then((res) => {
    loading.value = false
    if (!res.data.user) {
      error.value = '사용자를 찾을 수 없습니다.'
    }
    store.commit('user/updateUser', res.data.user)
    router.push('/')
  })
}
</script>

<style>
.q-field--error .q-field__bottom {
  color: black !important;
  color: black !important;
}
</style>
