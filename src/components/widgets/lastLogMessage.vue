<template>
  <q-card
    class="card-small"
    style="height: 16rem;"
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
        <div v-if="logs && logs.docs.length">
          <div>
            시간: {{ logs.docs[0].createdAt }}
          </div>
          <div>
            지역: {{ logs.docs[0].zones.join(',') }}
          </div>
          <div>
            내용: {{ logs.docs[0].message }}
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
          to="/locations"
        >
          <span>방송구간설정 바로가기</span>
          <q-icon name="arrow_forward" />
        </router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from  'vuex'

export default {
  setup() {
    const { state } = useStore()
    const logs = computed(() => state.eventlog.logs)

    onBeforeMount(() => {
      //
    })

    return {
      logs
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>