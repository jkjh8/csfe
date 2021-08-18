<template>
  <q-card style="width: 400px; border-radius: 15px;">
    <q-card-section class="q-py-xs">
      <q-item>
        <q-item-section avatar>
          <q-icon name="fas fa-cog" color="teal"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6">Setup</q-item-label>
          <q-item-label caption>IP:{{ editData.ipaddress }}  MAC:{{ editData.mac }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md" style="border-radius: 10px; background: #EDECE0">
        <div class="q-mx-sm q-my-sm text-bold">디바이스 이름</div>
        <q-input bg-color="white" dense outlined v-model="editData.name" />
        <div class="q-mx-sm q-my-sm text-bold">지역</div>
        <q-input bg-color="white" dense outlined v-model="editData.zone" />
        <div class="q-mx-sm q-my-sm text-bold">로컬 1</div>
        <q-input bg-color="white" dense outlined v-model="editData.location1" />
        <div class="q-mx-sm q-my-sm text-bold">로컬 2</div>
        <q-input bg-color="white" dense outlined v-model="editData.location2" />
      </div>
    </q-card-section>

    <q-card-actions class="q-mx-md" align="right">
      <q-btn class="btn cancel" v-close-popup flat>취소</q-btn>
      <q-btn class="btn confirm" v-close-popup flat>확인</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, reactive, onBeforeMount } from 'vue'

export default defineComponent({
  props: {
    data: Object
  },
  setup (props) {
    const editData = reactive({})

    onBeforeMount(() => {
      editData.ipaddress = props.data.ipaddress
      editData.mac = props.data.mac
      editData.name = props.data.name
      editData.zone = props.data.zone
      editData.location1 = props.data.location1
      editData.location2 = props.data.location2
      console.log(editData)
    })
    return { editData }
  }
})
</script>

<style scoped>
.btn {
  border-radius: 8px;
}
.cancel {
  color: #561616;
}
.confirm {
  background: #298473;
  color: white;
}
</style>
