<template>
  <div
    class="bg-grey-2"
    style="border-radius: .5rem; padding: .5rem .5rem;"
  >
    <div class="listname">
      선택된 파일은
    </div>

    <div v-if="file">
      <q-item>
        <q-item-section avatar>
          <div v-if="file.type === 'directory'">
            <q-icon
              name="svguse:icons.svg#folder-fill"
              color="yellow"
              size="md"
            />
          </div>
          <div v-else-if="file.type === 'audio'">
            <q-icon
              name="svguse:icons.svg#music-note-fill"
              color="grey"
              size="sm"
            />
          </div>
          <div v-else-if="file.type === 'video'">
            <q-icon
              name="svguse:icons.svg#video-camera-fill"
              color="blue-grey"
              size="sm"
            />
          </div>
        </q-item-section>
        <q-item-section>
          {{ file.name }}
        </q-item-section>
        <q-item-section side>
          <q-btn
            round
            flat
            icon="play_arrow"
            color="green"
            @click="$store.dispatch('broadcast/startPreview',file)"
          />
        </q-item-section>
      </q-item>
    </div>
    <div
      v-else
      class="text-grey text-center"
      style="margin: 1rem 1rem;"
    >
      선택된 파일이 없습니다.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: Object
  }
}
</script>