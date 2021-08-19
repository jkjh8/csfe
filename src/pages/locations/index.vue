<template>
  <q-card
    class="q-mx-md q-my-md"
    style="border-radius: 1rem;"
  >
    <q-card-section class="q-py-sm row justify-between items-center">
      <div class="row items-center">
        <span>
          <q-avatar
            color="green-10"
            text-color="white"
            size="2rem"
            icon="fas fa-list"
          ></q-avatar>
        </span>
        <q-item class="q-py-none">
          <q-item-section>
            <q-item-label class="text-h6 text-bold">
              지역 설정
            </q-item-label>
            <q-item-label caption>
              총 {{ count }}개의 지역
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-splitter
        v-model="splitterModel"
        style="height: 70vh;"
      >
        <template v-slot:before>
          <Locations />
        </template>

        <template v-slot:after>
          after
        </template>

      </q-splitter>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import getUser from '../../apis/users'
import { getLocations } from '../../apis/locations'

import Locations from '../../components/locations/list.vue'

const store = useStore()
const count = computed(() => store.state.locations.count)
const splitterModel = ref(50)
onBeforeMount(() => {
  getUser()
  getLocations()
})

</script>
