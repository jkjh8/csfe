<template>
  <q-card class="card-full">
    <q-card-section>
      <q-table flat :columns="columns" />
    </q-card-section>
  </q-card>
</template>

<script>
const columns = [
  { name: 'start', label: '시작시간', field: 'start', sortable: true },
  { name: 'name', label: '예약명', field: 'name', sortable: true },
  { name: 'mode', label: '모드', field: 'mode', sortable: true },
  { name: 'file', label: '재생파일', field: 'file' },
  { name: 'description', label: '상세설명', field: 'description' }
]
export default {
  setup() {
    return { columns }
  }
}
</script>
