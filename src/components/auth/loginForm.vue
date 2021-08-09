<template>
  <q-form
    @submit="onSubmit"
  >
    <q-card
      class="bg-blue-1 q-pa-sm"
      style="width: 400px; border-radius: 10px;"
      flat
    >
      <q-card-section
        v-if="error"
        class="bg-red-5 text-white q-ma-sm"
        style="border-radius: 10px"
      >
        <div>
          에러 메세지
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <div class="row justify-between">
            <span>
              이메일
            </span>
            <span>
              <q-checkbox
                v-model="saveEmail"
                dense
                left-label
                label="이메일 저장"
                color="teal-14"
              />
            </span>
          </div>
          <div
            class="q-my-sm"
          >
            <q-input
              v-model="userInfo.user_id"
              outlined
              dense
              bg-color="white"
              lazy-rules
              :rules="rules.email"
            ></q-input>
          </div>
          <div class="row justify-between q-mt-lg">
            <span>
              패스워드
            </span>
          </div>
          <div
            class="q-my-sm"
          >
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
              label="Login"
              flat
            ></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <div>
          <q-checkbox
            v-model="keepLoggedin"
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
import { defineComponent, getCurrentInstance, ref } from 'vue'

export default defineComponent({
  setup () {
    const api = getCurrentInstance().appContext.config.globalProperties.$api
    const error = ref('')
    const saveEmail = ref(false)
    const keepLoggedin = ref(false)
    const showPassword = ref(false)

    const rules = ref({
      email: [value => !!value || '이메일을 입력하세요.', v => /.+@.+\..+/.test(v) || '이메일 형식이 아닙니다.'],
      password: [v => v.length >= 8 || '최소 8자 이상 입력하세요.']
    })

    const userInfo = ref({
      user_id: '',
      password: ''
    })

    function onSubmit () {
      console.log(userInfo.value)
      console.log(api)
    }

    return {
      error,
      saveEmail,
      keepLoggedin,
      showPassword,
      userInfo,
      rules,
      onSubmit
    }
  }
})
</script>
