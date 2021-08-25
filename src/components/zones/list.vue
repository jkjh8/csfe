<template>
  <!-- zones table -->
  <q-card class="q-ml-md" style="border-radius: .5rem;" flat>
    <q-card-section class="row justify-between items-center q-py-xs">
      <div class="row items-center">
        <q-icon name="svguse:icons.svg#office-building" size="1.5rem" />
        <div class="q-mx-sm">Zones</div>
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
          v-for="local in zones"
          :key="local.index"
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar style="border: 1px solid #454545" size="2rem">{{local.index}}</q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span>{{ local.name }}</span>
              <span class="q-ml-sm" style="font-familt: nanumgothic; font-size: .5rem;">channel: {{ local.channel }}</span>
            </q-item-label>
            <q-item-label caption>
              <span>Parent: {{ local.location }}</span>
              <span v-if="local.Barix && local.Barix.length">  Device IP: {{ local.Barix[0].info.IP_address }}</span>
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
    </q-card-section>

    <q-card-section></q-card-section>
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
    const { state } = useStore()
    const zones = computed(() => state.zones.zones)

    const createUpdateDialog = ref(false)
    const deleteDialog = ref(false)
    const selected = ref({})

    function updateItem (item) {
      selected.value = item
      console.log('item', selected.value)
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
.items-class {
  border-radius: 1rem;
}
</style>
