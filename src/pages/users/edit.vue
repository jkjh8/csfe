<template>
  <q-card>
    <q-card-section>
      <q-icon name="svguse:icons.svg#users" size="sm" color="cyan-10" />
    </q-card-section>
    <q-card-section>
      {{ currentUser }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['currentUser'],
  setup (props, { emit }) {
    //
  }
}
</script>
