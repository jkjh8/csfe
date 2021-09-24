<template>
  <q-list>
    <q-item
      v-for="preset in presets" :key="preset._id"
      style="border-radius: 2rem;"
      active-class="bg-grey-3 text-grey-10"
      clickable v-ripple :active="preset._id === selected"
      @click="selected = preset._id"
    >
      <q-item-section avatar>
        <q-avatar
          v-if="preset._id === selected"
          icon="svguse:icons.svg#check"
          color="yellow" size="md"
        />
        <q-avatar v-else size="md" color="grey-2">
          {{ preset.type.charAt(0).toUpperCase() }}
        </q-avatar>
      </q-item-section>
      <q-item-section class="q-px-md">
        <q-item-label>{{preset.name}}</q-item-label>
        <q-item-label caption class="text-uppercase">{{preset.type}}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn
          round flat size="sm" color="red"
          icon="svguse:icons.svg#trash-fill"
          @click.prevent.stop="deleteItem = preset; deleteDialog = true"
        />
      </q-item-section>
    </q-item>
  </q-list>

  <!-- 프리셋 삭제 -->
  <q-dialog v-model="deleteDialog">
    <q-card style="border-radius: 2rem; width: 20rem;">
      <q-card-section class="q-pa-none">
        <q-img src="/background/cover_27.jpg" style="height: 6rem;">
          <div class="fit row items-center">
            <q-icon name="svguse:icons.svg#exclamation" color="red" size="md" />
            <div class="q-ml-md name">프리셋 삭제</div>
          </div>
        </q-img>
      </q-card-section>

      <q-card-section style="height: 12rem;">
        <div class="q-mt-md q-px-md">
          <span class="text">
            프리셋 이름 : <strong>{{ deleteItem.name }}</strong>
          </span>
          <br>
          <span class="text">
            프리셋 타입 : <strong>{{ deleteItem.type.toUpperCase() }}</strong>
          </span>
          <br>
          <span
            class="text"
            v-if="deleteItem.type.toLowerCase() === 'private'"
          >
            생성자 : <strong>{{ deleteItem.user_id }}</strong>
            <br>
          </span>
          <br>
          <div class="text">이 프리셋을 삭제 하시겠습니까?</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          class="q-mx-sm text"
          padding=".3rem 2rem"
          flat rounded
          v-close-popup
          label="취소"
        />
        <q-btn
          class="q-mx-sm"
          padding=".3rem 2rem"
          rounded unelevated color="red"
          label="삭제"
          v-close-popup
          @click="deletePreset"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

export default {
  setup () {
    const { state, commit, dispatch } = useStore()
    const $q = useQuasar()
    const user = computed(() => state.user.user)
    const selected = computed({
      get () { return state.locations.selectedZonePreset },
      set (value) {
        commit('locations/updateSelectedZonePreset', value)
        presets.value.forEach(e => {
          if (e._id === value) {
            commit('locations/updateSelectedId', e.zones_id)
          }
        })
      }
    })
    const presets = computed(() => state.locations.zonePresets)

    const deleteDialog = ref(false)
    const deleteItem = ref(null)

    async function deletePreset () {
      $q.loading.show()
      await api.get(`/broadcast/preset/delete?id=${deleteItem.value._id}`)
      await dispatch('locations/getZonePreset', user.value.email)
      $q.loading.hide()
    }

    onMounted(async () => {
      await dispatch('locations/getZonePreset', user.value.email)
    })

    return {
      presets,
      selected,
      deleteDialog,
      deleteItem,
      deletePreset
    }
  }
}
</script>

<style scoped>
.text {
  font-family: 나눔고딕;
  font-size: .9rem;
  font-weight: 400;
  color: #333;
}
strong {
  color: black;
}
:deep(.q-img__image) {
  -webkit-filter: blur(2px);
  filter: blur(2px);
}
</style>
