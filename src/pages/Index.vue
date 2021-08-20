<template>
  <q-page class="row justify-end">
    <q-img
      alt="logo"
      src="~assets/img_5.jpg"
      fit="scover"
    >
      <div class="absolute-full text-subtitle2 flex flex-center column q-gutter-md">
        <div style="font-size: 3rem;">Media Server</div>
        <div>사용을 위해서 먼저 로그인 해주세요!</div>
        <div><q-btn class="loginBtn" flat label="로그인 " to="/login"></q-btn></div>
        <div><q-btn flat label="회원 가입" to="/register" /></div>
      </div>
    </q-img>
  </q-page>
</template>

<script setup>
import { onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

onMounted(() => {
  proxy.$store.dispatch('user/getUser')
})
</script>

<style scoped>
.loginBtn {
  border: 1px solid #ffffff;
  border-radius: .5rem;
}
</style>
