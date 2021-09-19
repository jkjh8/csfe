<template>
  <div>
    {{ preset }}
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { api } from '@/boot/axios'
export default {
  setup () {
    const { state } = useStore()
    const user = computed(() => state.user.user)

    const preset = ref({})

    onMounted(async () => {
      const r = await api.get(`/broadcast/preset?user_id=${user.value.email}`)
      preset.value = r.data
    })

    return {
      preset
    }
  }
}
</script>
