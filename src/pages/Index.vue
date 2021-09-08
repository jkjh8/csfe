<template>
  <q-page>
    <div style="margin-left: 6%">
      <div class="line_top"></div>
      <div class="today">
        <div>
          <q-icon name="svguse:icons.svg#calendar" color="green-10" size="3rem" />
          <span> 오늘은</span>
        </div>
        <div>
          {{ today }}입니다
        </div>
      </div>
      <div class="line_bottom"></div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  setup () {
    const { dispatch } = useStore()
    const today = ref('')
    moment.locale('ko')

    onMounted(() => {
      dispatch('user/getUser')
      today.value = moment().format('MM월 DD일 dddd')
    })
    return {
      today
    }
  }
}
</script>

<style scoped>
.today {
  position: relative;
  font-family: 나눔스퀘어;
  font-weight: 700;
  font-size: 2rem;
  z-index: 5;
}
.line_top {
  position: relative;
  top: 10px;
  left: -10px;
  height: 20px;
  width: 50px;
  background: yellow;
  padding: 10 10 10;
  border-radius: 1rem;
  transform: rotate(-30deg);
}
.line_bottom {
  position: relative;
  top: -20px;
  left: 300px;
  height: 20px;
  width: 50px;
  background: yellow;
  padding: 10 10 10;
  border-radius: 1rem;
  transform: rotate(-30deg);
}
</style>
