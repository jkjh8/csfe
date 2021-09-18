<template>
  <q-card class="shadow-15 location_card" style="width: 24rem;">
    <q-card-section class="q-pa-none">
      <q-img src="/background/cover_1.jpg" style="height: 6rem">
        <div class="fit row items-center justify-between">
          <div class="q-ml-sm row items-center">
            <q-icon name="svguse:icons.svg#view-grid-add" size="1.5rem"></q-icon>
            <div class="q-ml-sm">
              <div class="name">방송구간선택</div>
              <div class="caption">방송구간을 선택하거나 프리셋을 불러오세요</div>
            </div>
          </div>
          <q-btn rounded>
            Preset
          </q-btn>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section>
      <q-scroll-area style="height: 24rem;">
        <q-tree
          :nodes="locations"
          tick-strategy="leaf"
          node-key="_id"
          v-model:ticked="selected"
          @update:ticked="update"
        >
          <template v-slot:default-header="props">
            <div>
              {{ props.node.name }}
            </div>
          </template>
        </q-tree>
      </q-scroll-area>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <div class="q-px-md q-gutter-md row items-center" style="height: 4rem;">
        <q-btn
          style="width: 6rem; height: 2rem;"
          flat rounded
          @click="clear"
        >
          초기화
        </q-btn>
        <q-btn
          style="width: 6rem; height: 2rem;"
          unelevated rounded color="grey-8"
          @click="add = !add"
        >
          프리셋등록
        </q-btn>
        <!-- <q-btn style="width: 6rem; height: 2rem;" rounded>확인</q-btn> -->
      </div>
    </q-card-actions>
  </q-card>
  <q-dialog v-model="add">
    <PresetAdd :group="group" />
  </q-dialog>
</template>

<script>
import { ref, computed, toRefs } from 'vue'
import { useStore } from 'vuex'

import PresetAdd from '@components/broadcast/presetAddPopup'

export default {
  components: { PresetAdd },
  props: ['locations'],
  setup (props) {
    const { locations } = toRefs(props)
    const { state, getters, commit } = useStore()
    const selected = computed({
      get () { return state.locations.selectedId },
      set (value) { commit('locations/updateSelectedId', value) }
    })
    const group = computed(() => getters['locations/selectedGroup'])
    const add = ref(false)

    function clear () {
      commit('locations/updateSelectedId', [])
    }

    function update () {
      const r = {
        locations: [],
        zones: []
      }
      selected.value.forEach(id => {
        locations.value.forEach(location => {
          if (id === location._id) {
            r.locations.push(location)
          }
          location.children.forEach(e => {
            if (id === e._id) {
              r.zones.push(e)
            }
          })
        })
      })
      commit('locations/updateBroadcast', r)
      return r
    }

    return {
      selected,
      group,
      clear,
      add,
      update
    }
  }
}
</script>

<style scoped>
.backg {
  background: linear-gradient(160deg, #aaa, #222)
}
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
