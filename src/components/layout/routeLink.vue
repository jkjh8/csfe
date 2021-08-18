<template>
  <div v-show="user" class="q-gutter-md row nowrap items-center">
    <router-link to="/devices">
      방송구간
    </router-link>
    <router-link to="/devices">
      지역설정
    </router-link>
    <router-link to="/devices">
      디바이스
    </router-link>
    <router-link to="/eventlog">
      이벤트 로그
    </router-link>
    <q-btn round flat icon="apps"></q-btn>
  </div>
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
a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
  color: black;
}
</style>
