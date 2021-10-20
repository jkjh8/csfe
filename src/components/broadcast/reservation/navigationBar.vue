30 lines (30 sloc)  576 Bytes
   
<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      {{ $props.selectedDate }}
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('prev')"
      >
        &lt; Prev
      </q-btn>
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('today')"
      >
        Today
      </q-btn>
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('next')"
      >
        Next &gt;
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: { selectedDate: String },
  emits: ['prev', 'next', 'today'],
}
</script>
