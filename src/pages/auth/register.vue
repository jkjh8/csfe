<template>
  <div
    class="coulmn justify-center items-center q-mx-auto absolute-center"
    style="width: 32rem;"
  >
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
