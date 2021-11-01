<template>
  <div
    class="fit column wrap"
    style="padding: 5% 10%"
  >
    <Today />
    <div class="row justify-center q-pt-lg">
      <NeedLogin v-if="!user" />
    </div>
    <div
      v-if="user"
      class="q-gutter-lg row"
    >
      <InfoHardware />
      <InfoLocations />
      <InfoLastLogMessage />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import Today from '../components/widgets/today.vue'
import NeedLogin from '../components/widgets/needLogin.vue'

import InfoLocations from '@components/widgets/locations'
import InfoHardware from '@components/widgets/hardware'
import InfoLastLogMessage from '@components/widgets/lastLogMessage'

export default {
  components: {
    Today,
    NeedLogin,
    InfoLocations,
    InfoHardware,
    InfoLastLogMessage,
  },
  setup() {
    const { state, dispatch } = useStore()
    const user = computed(() => state.user.user)

    onMounted(async () => {
      await dispatch('user/getUser')
    })
    return {
      user
    }
  }
}
</script>
<style scoped>
.login {
  position: relative;
  width: 400px;
  height: 20vh;
  font-weight: 700;
  border-radius: 2rem;
  font-family: 나눔고딕;
  font-size: 1rem;
  word-break: break-all;
}
</style>
