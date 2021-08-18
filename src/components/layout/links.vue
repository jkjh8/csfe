<template>
  <q-btn v-show="user" flat rounded to="/devices">
    <div :class="campareLink('/brocastZones') ? 'select':'unselect'">
      방송구간
    </div>
  </q-btn>
  <q-btn v-show="user" flat rounded to="/devices">
    <div :class="campareLink('/locations') ? 'select':'unselect'">
      지역설정
    </div>
  </q-btn>
  <q-btn v-show="user" flat rounded to="/devices">
    <div :class="campareLink('/devices') ? 'select':'unselect'">
      디바이스
    </div>
  </q-btn>
  <q-btn v-show="user" flat rounded to="/eventlog">
    <div :class="campareLink('/eventlog') ? 'select':'unselect'">
      이벤트 로그
    </div>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['user', 'currentPath'],
  setup (props) {
    function campareLink (link) {
      return props.currentPath === link
    }

    return { campareLink }
  }
})
</script>

<style scoped>
.select {
  font-weight: bold;
  color: black;
}

.unselect {
  font-weight: nomal;
  color: #464646;
}
</style>
