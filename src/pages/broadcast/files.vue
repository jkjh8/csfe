<template>
  <div
    class="colume"
    style="padding: 5% 8% 0 8%"
  >
    <div
      class="row items-start q-px-md"
      style="height: 5rem;"
    >
      <div class="row items-center q-gutter-sm">
        <q-icon
          name="svguse:icons.svg#server-fill"
          size="sm"
          color="teal"
        />
        <span class="name">파일관리</span>
        <span class="caption">파일 및 플레이 리스트 관리</span>
      </div>
    </div>
    <Files />
  </div>
</template>

<script>
// import { onBeforeMount, computed } from 'vue'
// import { useStore } from 'vuex'

import Files from '@components/files/files'

export default {
  components: { Files },
  setup () {

    return {

     }
  }
}
</script>