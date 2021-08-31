<template>
  <div
    class="coulmn justify-center items-center q-mx-auto absolute-center"
    style="width: 32rem;"
  >
    <div class="row justify-center">
      <q-icon name="svguse:icons.svg#user-circle-fill" size="9rem" color="grey-14" ></q-icon>
    </div>

    <div class="row justify-center text-h5 text-bold q-mt-lg" style="font-family: nanumgothicbold;">
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
        to="/register"
      >
        <q-icon
          name="fas fa-user-alt"
          size="12px"
          color="black"
        />
        <div class="text-grey-10 text-bold q-ml-sm">회원가입</div>
      </q-btn>
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
