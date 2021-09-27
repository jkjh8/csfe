<template>
  <div
    id="clock"
  >
    <div class="line_top" />
    <div class="clock">
      <div>
        <q-icon
          name="svguse:icons.svg#calendar"
          color="green-10"
          size="3rem"
        />
        <span class="q-ml-sm">오늘은</span>
      </div>
      <div class="q-ml-md">
        {{ date }} 입니다.
      </div>
      <div class="q-mt-xl">
        <q-icon
          name="svguse:icons.svg#clock"
          color="yellow-10"
          size="3rem"
        />
        <span class="q-ml-sm">현재 시간은</span>
      </div>
      <div class="q-ml-md">
        {{ clock }} 입니다.
      </div>
    </div>
    <div class="line_bottom" />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'

export default {
  setup () {
    moment.locale('ko')
    const date = ref(moment().format('MM월 DD일 dddd'))
    const clock = ref(moment().format('hh시 mm분 ss초 a'))
    const clockid = ref(null)

    onMounted(() => {
      clockid.value = setInterval(() => {
        clock.value = moment().format('a hh시 mm분 ss초')
      }, 1000);
    })

    onBeforeUnmount(() => {
      clearInterval(clockid.value)
      console.log('before unmount')
    })

    return {
      date,
      clock
    }
  }  
}
</script>

<style scoped>
#clock {
  position: relative;
  width: 30rem;
  padding: 2rem 2rem;
  color: #eee;
}
.clock {
  position: relative;
  vertical-align: middle;
  font-family: 나눔스퀘어;
  font-weight: 700;
  font-size: 2rem;
  z-index: 999;
}
.line_top {
  position: relative;
  top: 2rem;
  left: -1rem;
  height: 4rem;
  width: 2rem;
  background: rgba(255, 255, 0, 0.5);
  transform: rotate(45deg);
  border-radius: 1rem;
}
.line_bottom {
  position: relative;
  top: -2.5rem;
  left: 24rem;
  height: 4rem;
  width: 2rem;
  background: rgba(255, 255, 0, 0.5);;
  transform: rotate(45deg);
  border-radius: 1rem;
}
</style>