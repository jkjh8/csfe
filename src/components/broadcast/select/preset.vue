<template>
  <q-list>
    <q-item
      v-for="preset in presets" :key="preset._id"
      active-class="bg-grey-3 text-grey-10"
      clickable v-ripple :active="preset._id === selected"
      @click="selected = preset._id"
    >
      <q-item-section>
        <q-item-label>{{preset.name}}</q-item-label>
        <q-item-label caption class="text-uppercase">{{preset.type}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { api } from '@/boot/axios'
export default {
  setup () {
    const { state } = useStore()
    const user = computed(() => state.user.user)
    const selected = ref('')
    const presets = ref({})

    onMounted(async () => {
      const r = await api.get(`/broadcast/preset?user_id=${user.value.email}`)
      presets.value = r.data
      console.log(presets.value)
    })

    return {
      presets,
      selected
    }
  }
}
</script>
