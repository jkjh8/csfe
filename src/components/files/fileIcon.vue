<template>
  <div v-if="file.type === 'directory'">
    <q-icon
      name="svguse:icons.svg#folder-fill"
      color="yellow-8"
      size="1.2rem"
    />
  </div>
  <div v-if="file.type === 'audio'">
    <q-icon
      name="svguse:icons.svg#music-note-fill"
      color="cyan-8"
      size="1rem"
    />
  </div>
  <div v-if="file.type === 'video'">
    <q-icon
      name="svguse:icons.svg#video-camera-fill"
      color="blue-grey-8"
      size="1rem"
    />
  </div>
  <div v-if="file.type === 'etc'">
    <q-icon
      name="svguse:icons.svg#file"
      color="blue-grey-8"
      size="1rem"
    />
  </div>
</template>

<script>
export default {
  props: {
    file: Object
  }
}
</script>