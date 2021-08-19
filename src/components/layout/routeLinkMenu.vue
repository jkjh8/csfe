<template>
  <q-btn flat round icon="apps">
    <q-menu
      class="shadow-10"
      style="width: 20rem; border-radius: 1rem"
      :offset="[100,10]"
    >
      <div class="q-pa-md">
        <div class="row">
          <router-link class="rout col-4" to="/">
            <q-icon name="domain" size="2rem"/>
            <div>방송구간</div>
          </router-link>
          <router-link class="rout col-4" to="/locations">
            <q-icon name="maps_home_work" size="2rem"/>
            <div>지역설정</div>
          </router-link>
          <router-link class="rout col-4" to="/devices">
            <q-icon name="storage" size="2rem"/>
            <div>디바이스</div>
          </router-link>
        </div>

        <div class="row">
          <router-link class="rout col-4" to="/eventlog">
            <q-icon name="description" size="2rem"/>
            <div>로그</div>
          </router-link>
          <router-link class="rout col-4" to="/eventlog">
            <q-icon name="record_voice_over" size="2rem"/>
            <div>TTS</div>
          </router-link>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()

    const user = computed(() => store.state.user.user)

    return { user }
  }
})
</script>

<style scoped>
.rout {
  text-decoration: none;
  border-radius: .3rem;
  text-align: center;
  padding: 1rem;
  color: #3f3f3f;
}
.rout:hover {
  background: #d8d8d8;
}
</style>
