<template>
  <div style="margin: 5%">
    <div class="column">
      <div class="q-mb-lg row justify-between">
        <div class="q-gutter-sm row items-center">
          <div>
            <q-icon
              name="svguse:icons.svg#view-grid-fill"
              size="sm"
              color="purple"
            />
          </div>
          <div class="name">
            KAKAO TTS
          </div>
          <div class="caption">
            카카오 API 기반의 Text to Speech 테스트 페이지 입니다.
          </div>
        </div>
      </div>
      <div class="q-mt-lg q-gutter-xl row wrap justify-center">
        <div>
          <KakaoTts />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import KakaoTts from '@components/kakaoTts'

export default {
  components: {
    KakaoTts
  },
  setup() {
    const { state, getters, dispatch } = useStore()

    const selected = ref([])
    const user = computed(() => state.user.user)
    const locationCount = computed(() => getters['locations/getCount'])
    const zoneCount = computed(() => getters['devices/getDeviceCount'])

    onMounted(() => {
      dispatch('user/getUser')
      dispatch('devices/updateDevices')
    })

    return {
      selected,
      locationCount,
      zoneCount,
      user
    }
  }
}
</script>
