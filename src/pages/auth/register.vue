<template>
  <div
    class="colume justify-center items-center"
    style="margin-top: 50px"
  >
    <div class="row justify-center">
      <div>
        <img
          alt="logo"
          src="~assets/logo_long.svg"
          style="width: 150px;"
        >
      </div>
    </div>

    <div class="row justify-center text-h6 q-mt-lg text-bold">
      회원 가입
    </div>

    <div class="row justify-center q-mt-md">
      <RegisterForm />
    </div>

    <div class="row justify-center q-mt-xl">
      <a
        class="row items-center"
        href="/"
        style="text-decoration: none"
      >
        <q-icon name="home" />
        <div class="text-body2">홈으로</div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RegisterForm from '../../components/auth/registerForm.vue'

export default defineComponent({
  components: { RegisterForm },
  setup () {
    //
  }
})
</script>
