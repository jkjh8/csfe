<template>
  <q-card class="q-mr-md" style="border-radius: .5rem;" flat>
    <q-card-section class="row justify-between items-center q-py-xs">
      <div class="row items-center">
        <q-icon name="svguse:icons.svg#map" size="1.5rem" />
        <div class="q-mx-sm">Locations</div>
      </div>
      <div>
        <q-btn flat round icon="svguse:icons.svg#plus-circle-fill" color="cyan-7" @click="createUpdateDialog=!createUpdateDialog"></q-btn>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-xs">
      <q-list>
        <q-item
          class="items-class"
          v-for="local in locations"
          :key="local.index"
          clickable
          v-ripple
          :active="local.index === selectList"
          @click="clickItem(local)"
          active-class="active-link"
        >
          <q-item-section avatar>
            <q-avatar style="border: 1px solid #454545" size="2rem">{{local.index}}</q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span class="name">{{ local.name }}</span>
              <span class="q-ml-sm" :class="local.mode === 'Q-sys'? 'qsys':'barix'">{{ local.mode }}</span>
            </q-item-label>
            <q-item-label caption>{{ local.ip }}:{{ local.port }}</q-item-label>
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
    </q-card-section>

    <q-card-section></q-card-section>
  </q-card>
  <q-dialog v-model="createUpdateDialog" persistent>
    <CreateUpdate :selected="selected" @close="createUpdateDialogClose" />
  </q-dialog>
  <q-dialog v-model="deleteDialog" persistent>
    <Delete :selected="selected" @close="deleteDialogClose" />
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
    const store = useStore()
    const locations = computed(() => store.state.locations.locations)

    const createUpdateDialog = ref(false)
    const deleteDialog = ref(false)
    const selectList = ref(null)
    const selected = ref({})

    function editItem (item) {
      console.log(item)
      selected.value = item
      createUpdateDialog.value = true
    }

    function deleteItem (item) {
      selected.value = item
      deleteDialog.value = true
    }

    function clickItem (item) {
      if (item._id === selectList.value) {
        selectList.value = null
        store.commit('locations/updateSelected', null)
      } else {
        selectList.value = item._id
        store.commit('locations/updateSelected', item)
      }
    }

    function createUpdateDialogClose () {
      selected.value = {}
      createUpdateDialog.value = false
    }

    function deleteDialogClose () {
      selected.value = {}
      deleteDialog.value = false
    }

    return {
      locations,
      createUpdateDialog,
      deleteDialog,
      selectList,
      selected,
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
  background: #22b7d1;
  color: black;
}
.items-class {
  border-radius: 1rem;
}
.name {
  font-family: nanumgothic;
}
.qsys {
  font-family: bebas;
  color: rgb(0, 117, 185);
  font-size: .5rem;
}
.barix {
  font-family: bebas;
  color: black;
  font-size: .5rem;
}
</style>
