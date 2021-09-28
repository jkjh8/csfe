<template>
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <div class="backg-dark">
        <div class="card-name-align q-px-md">
          <div class="card-name">
            <q-icon name="svguse:icons.svg#map" />
            <div>
              <div>지역설정</div>
              <div
                v-if="locationErrorCount"
                class="caption"
              >
                현재 {{ locationErrorCount }}개의 지역의 점검이 필요합니다
              </div>
            </div>
          </div>
          <div class="q-pa-none q-ma-none">
            <q-btn
              flat
              round
              color="cyan-7"
              icon="svguse:icons.svg#plus-circle-fill"
              @click="createUpdateDialog=!createUpdateDialog"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-none">
      <q-scroll-area
        visible
        style="height: 30rem"
      >
        <q-list>
          <q-item
            v-for="local in locations"
            :key="local.index"
            v-ripple
            class="q-px-lg"
            clickable
            :active="local === selected"
            active-class="active-link"
            @click="clickItem(local)"
          >
            <q-item-section avatar>
              <q-avatar
                style="border: 1px solid #454545"
                size="2rem"
              >
                {{ local.index }}
                <q-badge
                  v-if="!local.status"
                  color="red"
                  rounded
                  floating
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <span class="listname">{{ local.name }}</span>
                <span
                  class="q-ml-sm"
                  :class="local.type === 'Q-Sys'? 'qsys':'barix'"
                >{{ local.type }}</span>
              </q-item-label>
              <q-item-label caption>
                {{ local.ipaddress }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div>
                <q-btn
                  flat
                  round
                  icon="svguse:icons.svg#pencil-fill"
                  size="sm"
                  color="teal-6"
                  @click.prevent.stop="editItem(local)"
                />
                <q-btn
                  flat
                  round
                  icon="svguse:icons.svg#trash-fill"
                  size="sm"
                  color="red-6"
                  @click.prevent.stop="deleteItem(local)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
  <q-dialog
    v-model="createUpdateDialog"
    persistent
  >
    <CreateUpdate
      :id="selForEdit._id"
      @close="mdCuClose"
    />
  </q-dialog>
  <q-dialog
    v-model="deleteDialog"
    persistent
  >
    <Delete
      :selected="selForEdit"
      @close="mdDeleteClose"
    />
  </q-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import CreateUpdate from './cu'
import Delete from './delete.vue'

export default {
  components: { CreateUpdate, Delete },
  setup () {
    const { state, getters, commit, dispatch } = useStore()
    const locations = computed(() => state.locations.locations)
    const selected = computed(() => state.locations.selectedLocation)
    const locationErrorCount = computed(() => getters['locations/errorCount'])
    const createUpdateDialog = ref(false)
    const deleteDialog = ref(false)
    const selForEdit = ref({})

    function editItem (item) {
      selForEdit.value = item
      createUpdateDialog.value = true
    }

    function deleteItem (item) {
      selForEdit.value = item
      deleteDialog.value = true
    }

    function clickItem (item) {
      if (item === selected.value) {
        commit('locations/updateSelectedLocation', null)
        dispatch('devices/updateDevices', '')
      } else {
        commit('locations/updateSelectedLocation', item)
        dispatch('devices/updateDevices', item._id)
      }
    }

    function mdCuClose () {
      selForEdit.value = {}
      createUpdateDialog.value = false
    }

    function mdDeleteClose () {
      selected.value = {}
      deleteDialog.value = false
    }

    return {
      locations,
      locationErrorCount,
      createUpdateDialog,
      deleteDialog,
      selected,
      selForEdit,
      editItem,
      deleteItem,
      clickItem,
      mdCuClose,
      mdDeleteClose
    }
  }
}
</script>

<style scoped>
/* .active-link {
  background: #eaeaea;
  color: black;
}
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
} */
</style>
