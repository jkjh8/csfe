<template>
  <div
    class="colume justify-center items-center"
    style="margin-top: 50px"
  >
    <div class="row justify-center">
      <div
        class="row justify-center items-center"
        style="width: 100px; height: 100px; background: #2e2e2e; border-radius: 50%;"
      >
        <q-icon
          name="fas fa-user-alt"
          size="50px"
          color="grey-1"
        ></q-icon>
      </div>
    </div>

    <div class="row justify-center text-h6 q-mt-lg">
      로그인
    </div>

    <div class="row justify-center q-mt-md">
      <LoginForm />
    </div>

    <div
      class="row justify-center q-mt-xl"
    >
      <q-btn
        style="width: 400px; height: 50px; border-radius: 8px;"
        outline
        color="grey"
      >
        <div class="text-grey-10 text-bold">회원가입</div>
      </q-btn>
    </div>

    <div class="row justify-center q-mt-xl">
      <a href="/" style="text-decoration: none">
        <div class="text-body2">홈으로</div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LoginForm from '../../components/auth/loginForm.vue'

export default defineComponent({
  components: { LoginForm },
  setup () {
    // const error = ref('')
    // const saveEmail = ref(false)
    // const keepLoggedin = ref(false)

    // return { error, saveEmail, keepLoggedin }
  }
})
</script>
