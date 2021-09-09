<template>
  <div
    class="coulmn justify-center items-center q-mx-auto absolute-center"
    style="width: 32rem;"
  >
    <div class="row justify-center q-mt-md">
      <LoginForm />
    </div>

    <div
      class="row justify-center q-mt-xl"
    >
      <q-btn
        style="width: 400px; height: 50px; border-radius: 1rem;"
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
