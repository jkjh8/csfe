<template>
  <div
    id="today"
    class="col-12"
  >
    <div class="line_top" />
    <div class="today">
      <div>
        <q-icon
          name="svguse:icons.svg#calendar"
          color="green-10"
          size="3rem"
        />
        <span> 오늘은 </span>
        <span>{{ year }}</span>
      </div>
      <div class="q-pl-sm">
        {{ today }}입니다
      </div>
    </div>
    <div class="line_bottom" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import moment from 'moment'
moment.locale('ko')

export default {
  setup () {
    const today = ref('')
    const year = ref('')
    onMounted(() => {
      today.value = moment().format('MM월 DD일 dddd')
      year.value = moment().format('YYYY년')
    })
    return { year, today }
  }
}
</script>

<style scoped>
#today {
  height: 10rem;
}
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
