<template>
  <q-card class="shadow-15 location_card">
    <q-card-section class="q-pa-none" style="overflow: hidden;">
      <q-img src="/background/cover_1.jpg" style="height: 6rem;">
        <div class="fit row justify-between items-center">
          <div class="q-mx-sm q-gutter-sm row items-center">
            <q-icon name="svguse:icons.svg#map" size="1.5rem" />
            <div>
              <div class="name">지역설정</div>
              <div
                v-if="locationErrorCount"
                class="caption"
              >현재 {{ locationErrorCount }}개의 지역의 점검이 필요합니다</div>
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
            v-for="local in locations"
            :key="local.index"
            clickable
            v-ripple
            :active="local === selected"
            @click="clickItem(local)"
            active-class="active-link"
          >
            <q-item-section avatar>
              <q-avatar style="border: 1px solid #454545" size="2rem">
                {{local.index}}
                <q-badge v-if="!local.status" color="red" rounded floating/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <span class="listname">{{ local.name }}</span>
                <span class="q-ml-sm" :class="local.type === 'Q-Sys'? 'qsys':'barix'">{{ local.type }}</span>
              </q-item-label>
              <q-item-label caption>{{ local.ipaddress }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div>
                <q-btn
                  flat round icon="svguse:icons.svg#pencil-fill" size="sm" color="teal-6"
                  @click.prevent.stop="editItem(local)"
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
    <CreateUpdate :selected="selectItem" @close="createUpdateDialogClose" />
  </q-dialog>
  <q-dialog v-model="deleteDialog" persistent>
    <Delete :selected="selectItem" @close="deleteDialogClose" />
  </q-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import CreateUpdate from './createUpdate'
import Delete from './delete.vue'

export default {
  components: { CreateUpdate, Delete },
  setup () {
    const { state, getters, commit, dispatch } = useStore()
    const locations = computed(() => state.locations.locations)
    const selected = computed(() => state.locations.selected)
    const locationErrorCount = computed(() => getters['locations/locationsErrorCount'])
    const createUpdateDialog = ref(false)
    const deleteDialog = ref(false)
    const selectItem = ref({})

    function editItem (item) {
      selectItem.value = item
      createUpdateDialog.value = true
    }

    function deleteItem (item) {
      selectItem.value = item
      deleteDialog.value = true
    }

    function clickItem (item) {
      if (item === selected.value) {
        commit('locations/updateSelected', null)
        dispatch('zones/updateZones', '')
      } else {
        commit('locations/updateSelected', item)
        dispatch('zones/updateZones', item._id)
      }
    }

    function createUpdateDialogClose () {
      selectItem.value = {}
      createUpdateDialog.value = false
    }

    function deleteDialogClose () {
      selected.value = {}
      deleteDialog.value = false
    }

    return {
      locations,
      locationErrorCount,
      createUpdateDialog,
      deleteDialog,
      selected,
      selectItem,
      editItem,
      deleteItem,
      clickItem,
      createUpdateDialogClose,
      deleteDialogClose
    }
  }
}
</script>

<style scoped>
.active-link {
  background: #eaeaea;
  color: black;
}
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
