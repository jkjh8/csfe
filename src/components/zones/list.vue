<template>
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
          @click="clickItem(local.index)"
        >
          <q-item-section avatar>
            <q-avatar style="border: 1px solid #454545" size="2rem">{{local.index}}</q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ local.name }}</q-item-label>
            <q-item-label caption>
              <span>Parent: {{ local.location }}</span>
              <span v-if="local.Barix">  Device IP: {{ local.Barix.ipaddress }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div>
              <q-btn
                flat round icon="svguse:icons.svg#pencil-fill" size="sm" color="teal-6"
                @click.prevent.stop="selectItemFn(local)"
              />
              <q-btn
                flat round icon="svguse:icons.svg#trash-fill" size="sm" color="red-6"
                @click.prevent.stop="deleteLocation(local)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-section></q-card-section>
  </q-card>
  <q-dialog v-model="createUpdateDialog" persistent>
    <CreateUpdate :selectedItem="selectedItem" @close="close" />
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import CreateUpdate from './createUpdate'

const store = useStore()
const zones = computed(() => store.state.zones.zones)

const createUpdateDialog = ref(false)
const selectList = ref(null)
const selectedItem = ref({})

function selectItemFn (item) {
  selectedItem.value = item
  createUpdateDialog.value = true
}

function deleteLocation (item) {
  console.log(item)
}

function clickItem (idx) {
  if (idx === selectList.value) {
    selectList.value = null
  } else {
    selectList.value = idx
  }
}

function close () {
  selectedItem.value = {}
  createUpdateDialog.value = false
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
