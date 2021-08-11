<template>
  <q-page class="flex flex-center">
    <img
      alt="logo"
      src="~assets/logo_long.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent, onMounted, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const { proxy } = getCurrentInstance()

    onMounted(() => {
      proxy.$api.get('/auth/getUser').then((res) => {
        console.log(res)
      })
    })
  }
})
</script>
