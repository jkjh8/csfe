<template>
  <q-btn flat round icon="svguse:icons.svg#chat-alt">
    <q-menu
      class="shadow-10"
      style="width:400px; border-radius: 1rem;"
      :offset="[50,10]"
    >
      <q-list class="q-my-md q-mx-sm">
        <q-item-label
          class="text-bold q-mb-sm q-ml-sm"
          style="font-size: 20px"
        >
          알림
        </q-item-label>

        <q-separator />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()

    const user = computed(() => store.state.user.user)

    return { user }
  }
})
</script>
