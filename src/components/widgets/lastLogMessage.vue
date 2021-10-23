<template>
  <q-card
    class="card-small"
    style="height: 22rem;"
  >
    <q-card-section>
      <div
        class="fit row justify-start items-center"
      >
        <q-icon
          name="svguse:iconsColor.svg#list"
          size="md"
        />
        <div
          class="listname q-ml-sm"
          style="font-size: 1rem;"
        >
          로그 메시지
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-grey-8 q-px-md q-mb-md">
        <div>
          마지막 로그메시지는
        </div>
        <br>
        <div v-if="logs && logs.docs.length">
          <div>
            <b>시간</b>: {{ time.timeFormat(logs.docs[0].createdAt) }}
          </div>
          <div>
            <b>Category</b>: {{ logs.docs[0].category }}
          </div>
          <div>
            <b>지역</b>: {{ logs.docs[0].zones.join(',') }}
          </div>
          <div class="hiddenText">
            <b>내용</b>: {{ logs.docs[0].message }}
            <q-popup-proxy>
              <q-card style="max-width: 20rem;">
                <q-card-section class="bg-yellow-1 q-pa-md">
                  {{ logs.docs[0].message }}
                </q-card-section>
              </q-card>
            </q-popup-proxy>
          </div>
        </div>
        <div
          v-else
          class="q-my-md q-ml-lg"
        >
          <q-icon
            name="svguse:icons.svg#exclamation"
            color="red"
            size="xs"
          />
          확인할 수 없습니다.
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="fit row q-px-md q-pb-md">
        <q-space />
        <router-link
          class="link row items-center"
          to="/eventlog"
        >
          <span>이벤트로그 바로가기</span>
          <q-icon name="arrow_forward" />
        </router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from  'vuex'

import time from '@/apis/time'

export default {
  setup() {
    const { state } = useStore()
    const logs = computed(() => state.eventlog.logs)

    onBeforeMount(() => {
      //
    })

    return {
      logs,
      time
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
.hiddenText {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2rem;
  max-height: 4rem;
  height: 6rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>