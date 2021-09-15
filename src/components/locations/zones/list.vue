<template>
  <!-- zones table -->
  <q-card class="shadow-15 location_card">
    <q-card-section class="q-pa-none" style="overflow: hidden;">
      <q-img src="/background/cover_4.jpg" style="height: 6rem;">
        <div class="fit row justify-between items-center">
          <div class="q-mx-sm q-gutter-sm row items-center">
            <q-icon name="svguse:icons.svg#office-building" size="1.5rem" />
            <div>
              <div class="name">방송구간설정</div>
              <div
                v-if="zonesErrorCount"
                class="caption"
              >현재 {{ zonesErrorCount }}개의 방송구간의 점검이 필요합니다</div>
            </div>
          </div>
          <div>
            <q-btn flat round icon="svguse:icons.svg#plus-circle-fill" color="cyan-7" @click="createUpdateDialog=!createUpdateDialog"></q-btn>
          </div>
        </div>
      </q-img>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-none">
      <q-scroll-area
        visible
        style="height: 30rem"
      >
        <q-list>
          <q-item
            class="q-px-lg"
            v-for="local in zones"
            :key="local.index"
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar style="border: 1px solid #454545" size="2rem">
                {{local.index}}
                <q-badge v-if="local.check" color="red" rounded floating/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span class="listname">{{ local.name }}</span>
                <span class="q-ml-sm" style="font-familt: 나눔고딕; font-size: .5rem;">channel: {{ local.channel }}</span>
              </q-item-label>
              <q-item-label caption>
                <span v-if="local.parent && Object.keys(local.parent).length">Parent: {{ local.parent.name }}</span>
                <span v-if="local.device && Object.keys(local.device).length">  Device IP: {{ local.device.ipaddress }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div>
                <q-btn
                  flat round icon="svguse:icons.svg#pencil-fill" size="sm" color="teal-6"
                  @click.prevent.stop="updateItem(local)"
                />
                <q-btn
                  flat round icon="svguse:icons.svg#trash-fill" size="sm" color="red-6"
                  @click.prevent.stop="deleteItem(local)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>

  <q-dialog v-model="createUpdateDialog" persistent>
    <CreateUpdate :selected="selected" @close="close" />
  </q-dialog>
  <q-dialog v-model="deleteDialog" persistent>
    <Delete :selected="selected" @close="deleteDialogClose" />
  </q-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import CreateUpdate from './createUpdate'
import Delete from './delete'

export default {
  components: { CreateUpdate, Delete },
  setup () {
    const { state, getters } = useStore()
    const zones = computed(() => state.locations.zones)
    const zonesErrorCount = computed(() => getters['locations/zonesErrorCount'])

    const createUpdateDialog = ref(false)
    const deleteDialog = ref(false)
    const selected = ref({})

    function updateItem (item) {
      selected.value = item
      createUpdateDialog.value = true
    }

    function deleteItem (item) {
      selected.value = item
      deleteDialog.value = true
    }

    function deleteDialogClose () {
      selected.value = {}
      deleteDialog.value = false
    }

    function close () {
      selected.value = {}
      createUpdateDialog.value = false
    }
    return {
      zones,
      zonesErrorCount,
      selected,
      createUpdateDialog,
      updateItem,
      deleteItem,
      close,
      deleteDialog,
      deleteDialogClose
    }
  }
}
</script>

<style scoped>
.active-link {
  background: #ffab5d;
  color: black;
}
/deep/ .q-img__image {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
